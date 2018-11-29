/** @module src/market/product/ProductScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  RefreshControl,
  Dimensions,
  BackHandler
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import Moment from 'moment';
import Appsee from 'react-native-appsee';

import { header, placeholders } from '../../common/styles';
import { getStateParam, productUnit } from '../../common/helpers';
import MapStatic from '../../map/MapStatic';
import authService from '../../auth/authService';
import ProfileInfo from '../../profile/ProfileInfo';
import ProfileComActions from '../../profile/ProfileComActions';
import productService from './productService';
import ProductCards from './ProductCards';
import ProductScreenHeader from './ProductScreenHeader';
import styles from './ProductScreen.styles';
import ProductScreenImage from './ProductScreenImage';

/*
 * Screen component for product info.
 * @extends React.Component
 */
class ProductScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <ProductScreenHeader navigation={navigation} />
  });

  constructor(props) {
    super(props);

    this.state = {
      product: { images: [], date: Moment.utc().local() },
      imageWidth: Dimensions.get('screen').width,
      isLoading: true,
      isRefreshing: false,
      productLoaded: false,
      isOwnProduct: false,
      advertsReqParams: {
        limit: 10,
        offset: null,
        author: null
      }
    };

    this.productRequest = productService.get(getStateParam(this.props.navigation, 'id', 1));
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentDidMount() {
    Appsee.addEvent('Reached ProductScreen');
    this.loadProduct();
  }

  componentWillUnmount() {
    this.productRequest.abort();

    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { navigation } = this.props;

    navigation.goBack(getStateParam(navigation, 'goBackFrom', ''));
    getStateParam(navigation, 'onGoBack', () => { })();

    return true;
  };

  onLayoutChange = ({ nativeEvent }) => {
    const { width } = nativeEvent.layout;

    if (width !== this.state.imageWidth) {
      this.setState({ imageWidth: width });
    }
  };

  getProduct = async () => {
    try {
      const product = await this.productRequest.run();

      product.date = Moment.utc(product.date).local();

      return product;
    } catch (e) {
      throw e;
    }
  };

  loadProduct = async () => {
    this.setState({ isLoading: true });  

    try {
      const product = await this.getProduct();

      this.setState({
        product,
        productLoaded: true,
        isOwnProduct: authService.isLogged() && authService.getUser().userId === product.author.userId,
        advertsReqParams: { ...this.state.advertsReqParams, author: product.author.userId }
      }, () => {
        this.props.navigation.setParams({
          isEditable: this.state.isOwnProduct,
          productLoaded: true,
          goBack: this.onBackPress,
          product
        });
      });
    } catch (e) {
      Toast.show('Kunne ikke få postinfo', 2000);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  refreshProduct = async () => {
    this.setState({ isRefreshing: true });

    try {
      this.setState({ product: await this.getProduct() });
    } catch (e) {
      Toast.show('Kunne ikke få postinfo', 2000);
    } finally {
      this.setState({ isRefreshing: false });
    }
  };

  filterAdverts = (adverts) => {
    for (let i = 0; i < adverts.data.length; i++) {
      if (adverts.data[i].id === this.state.product.id) {
        adverts.data.splice(i, 1);
        adverts.total -= 1;
        break;
      }
    }

    return adverts;
  };

  navToAuthorsProfile = () => {
    const { navigation } = this.props;
    const { author } = this.state.product;

    navigation.navigate('ProfileDetail', {
      id: author.userId,
      onGoBack: this.getProduct,
      isOwnProfile: this.state.isOwnProduct
    });
  };

  navToAdvert = (product) => {
    const { navigation } = this.props;

    navigation.navigate('Product', { id: product.id });
  };

  navToImageViewer = (index) => {
    this.props.navigation.navigate('ImageViewer', { index, images: this.state.product.images });
  };

  showAddressOnMap = () => {
    const { lat: latitude, lon: longitude, address } = this.state.product;

    this.props.navigation.navigate('ShowOnMap', { latitude, longitude, address });
  };

  renderImage = (image, index) => (
    <ProductScreenImage
      key={image}
      image={image}
      index={index}
      width={this.state.imageWidth}
      onPress={this.navToImageViewer}
    />
  );

  render() {
    const { product, productLoaded, advertsReqParams, isLoading, isRefreshing } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {productLoaded ? (
          <ScrollView
            style={styles.container}
            stickyHeaderIndices={[1]}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.refreshProduct} />}
          >
            <View style={styles.images}>
              <ScrollView horizontal onLayout={this.onLayoutChange}>
                {product.images.length > 0 ? product.images.map(this.renderImage) : this.renderImage(null, 0)}
              </ScrollView>
            </View>
            <View style={styles.stickyHeader}>
              <View style={header.sticky}>
                <Text style={styles.stickyHeaderText} numberOfLines={1}>{product.title}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.infoRow}>
                <Text selectable style={styles.title}>{product.title}</Text>
                <View style={styles.debio}>
                  {product.debOne && (
                    <Image source={require('./img/debio-one.png')} style={styles.debioIcon} />
                  )}
                  {product.debTwo && (
                    <Image source={require('./img/debio-two.png')} style={styles.debioIcon} />
                  )}
                </View>
              </View>
              <View style={styles.infoRow}>
                <View style={styles.price}>
                  <Text style={styles.priceValue}>
                    {Math.round(product.price * 100) / 100}&nbsp;NOK&nbsp;
                  </Text>
                  <Text>/&nbsp;{productUnit(product.unit)}</Text>
                </View>
                <Text style={styles.date}>{`${product.date.fromNow()}, ${product.date.format('LT')}`}</Text>
              </View>
              <Text style={styles.status}>{product.inStock ? 'TILGJENGELIG' : 'KOMMER'}</Text>
              <Text selectable style={styles.description}>{product.description}</Text>
            </View>
            <View style={styles.author}>
              <ProfileInfo
                profile={product.author}
                onPress={this.navToAuthorsProfile}
              />
            </View>
            <View style={styles.map}>
              <MapStatic
                lat={product.lat}
                lon={product.lon}
                address={product.address}
                showMarker
                onPress={this.showAddressOnMap}
                onMarkerPress={this.showAddressOnMap}
              />
            </View>
            <View style={styles.adverts}>
              <Text style={styles.advertsTitle}>Annonser forfatter</Text>
              <ProductCards
                horizontal
                showScrollBar={false}
                params={advertsReqParams}
                onCardPress={this.navToAdvert}
                onResponse={this.filterAdverts}
              />
            </View>
          </ScrollView>
        ) : (
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={this.loadProduct} />}>
              {!isLoading && <Text style={placeholders.emptyComponentText}>Trekk for å oppdatere</Text>}
            </ScrollView>
          )}
        {productLoaded && !this.state.isOwnProduct && (
          <ProfileComActions
            commType={product.commType}
            phone={product.phone}
            product={product.title}
            name={product.author}
            uid={product.author}
            navigation={navigation}
          />
        )}
      </View>
    );
  }
}

export default ProductScreen;
