/** @module src/market/map/MapScreen */

import React, { Component } from 'react';
import { View } from 'react-native';
import Toast from '@remobile/react-native-toast';
import Appsee from 'react-native-appsee';

import { getStateParam, bindComponentRef } from '../../common/helpers';
import Picker from '../../common/Picker';
import Map from '../../map/Map';
import MapHeader from '../../map/MapHeader';
import categoryStore from '../category/categoryStore';
import subcategoryStore from '../subcategory/subcategoryStore';
import productService from '../product/productService';
import ProductMarker from './ProductMarker';
import ProductMarkerInfo from './ProductMarkerInfo';
import styles from './MapScreen.styles';

/**
 * Component for map screen to show catalog product posts.
 * @extends React.Component
 */
class MapScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <MapHeader navigation={navigation} />
  })

  static earthRadius = 6371e3
  static toRadians = degree => (degree * Math.PI) / 180

  constructor(props) {
    super(props);

    this.state = {
      region: null,
      products: [],
      activeProduct: null,
      activeCategory: getStateParam(props.navigation, 'category'),
      mapLayout: { height: 0, width: 0 }
    };

    this.categories = [{ value: null, label: 'Alle produkter' }].concat(categoryStore
      .all()
      .map(category => ({
        label: category.title,
        value: category.id
      }))
    );

    this.markers = categoryStore.all().reduce((markers, category) => {
      markers[category.id] = { default: category.marker, active: category.markerActive };

      return markers;
    }, {});

    this.productsRequest = productService.all();
    this.productsReqParams = { coordinates: null, area: null, category: null };
  }

  componentDidMount() {
    Appsee.addEvent('Reached MapScreen');
    this.props.navigation.setParams({ showMyLocation: this.refsCache.get('mapRef').showMyLocation });
  }

  componentWillUnmount() {
    this.productsRequest.abort();
  }

  onMapLayout = ({ nativeEvent }) => {
    const { height, width } = nativeEvent.layout;

    this.setState(
      { mapLayout: { height, width } },
      this.state.activeProduct != null ? this.animateToProductMarker : () => { }
    );
  };

  onRegionChange = (region) => {
    this.setState({ region }, this.state.activeProduct == null ? this.getProducts : () => { });
  };

  onCategoryChange = (field, value) => {
    this.setState({ activeProduct: null, activeCategory: value }, this.getProducts);
  };

  getProducts = async () => {
    this.productsRequest.abort();

    try {
      const { activeCategory, region } = this.state;
      const { latitude: lat, longitude: lon, longitudeDelta: area } = region;

      this.productsReqParams.coordinates = `${lat},${lon}`;
      this.productsReqParams.area = area/2;
      this.productsReqParams.category = activeCategory;

      const response = await this.productsRequest.params(this.productsReqParams).run();

      this.setState({ products: response.data.map(this.mapProducts) });
    } catch (e) {
      Toast.show(e.toString(), 2000);
    }
  };

  mapProducts = (product) => {
    product.coords = { latitude: product.lat, longitude: product.lon };
    product.markers = this.markers[
      subcategoryStore.find(subcat => subcat.id === product.subcategoryId).categoryId
    ];

    return product;
  };

  /*
  calculateViewableDistance = (latDeg, latDelta, lonDelta) => {
    const latRad1 = MapScreen.toRadians(latDeg - (latDelta / 2));
    const latRad2 = MapScreen.toRadians(latDeg + (latDelta / 2));

    const distance = Math.acos(
      (Math.sin(latRad1) * Math.sin(latRad2)) +
      (Math.cos(latRad1) * Math.cos(latRad2) * Math.cos(MapScreen.toRadians(lonDelta)))
    ) * MapScreen.earthRadius;
  };
  */

  showProductInfo = (product) => {
    const { activeProduct } = this.state;

    if (activeProduct == null || activeProduct.id !== product.id) {

      this.setState({
        activeProduct: product
      }, this.animateToProductMarker);
    }
  };

  hideProductInfo = () => {
    if (this.state.activeProduct != null) {
      this.setState({ activeProduct: null });
    }
  };

  animateToProductMarker = () => {
    const { region, activeProduct, mapLayout } = this.state;

    if (activeProduct == null) return;

    let { latitude, longitude } = activeProduct.coords;

    if (mapLayout.height > mapLayout.width) {
      latitude -= region.latitudeDelta * 0.12;
    } else {
      longitude += region.longitudeDelta * 0.1;
    }

    this.refsCache.get('mapRef').animateToCoordinate({ latitude, longitude });
  };

  navToProductScreen = (product) => {
    this.props.navigation.navigate('Product', {
      id: product.id,
      onGoBack: this.getProducts
    });
    this.hideProductInfo();
  };

  renderProductMarker = (product) => {
    const { activeProduct } = this.state;

    return (
      <ProductMarker
        key={product.id}
        product={product}
        active={activeProduct != null && activeProduct.id === product.id}
        onPress={this.showProductInfo}
      />
    );
  };

  render() {
    const { activeProduct, activeCategory, mapLayout } = this.state;
    const horizontal = mapLayout.height < mapLayout.width;

    return (
      <View style={styles.container}>
        <View style={(activeProduct != null && horizontal) ? styles.categoriesSided : styles.categoriesCentered}>
          <Picker
            name="category"
            items={this.categories}
            selectedValue={activeCategory}
            style={styles.categoryPicker}
            onValueChange={this.onCategoryChange}
            dropdownPosition={1}
          />
        </View>
        <Map
          ref={bindComponentRef.call(this, 'mapRef')}
          region={this.state.region}
          moveOnMarkerPress={false}
          showMyLocation
          onRegionChangeComplete={this.onRegionChange}
          onPress={this.hideProductInfo}
          onPanDrag={this.hideProductInfo}
          onLayout={this.onMapLayout}
          style={styles.map}
        >
          {this.state.products.map(this.renderProductMarker)}
        </Map>
        {activeProduct != null && (
          <ProductMarkerInfo
            product={activeProduct}
            centered={!horizontal}
            onPress={this.navToProductScreen}
            onClose={this.hideProductInfo}
          />
        )}
      </View>
    );
  }
}

export default MapScreen;
