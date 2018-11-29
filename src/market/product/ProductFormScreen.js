/** @module src/product/ProductFormScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Toast from '@remobile/react-native-toast';

import { markRouteAsActive } from '../../AppNavigator';
import { getStateParam, getImageTypeFromURI, isString, isNumber } from '../../common/helpers';
import Button from '../../common/Button';
import PhoneField from '../../common/PhoneField';
import authService from '../../auth/authService';
import categoryStore from '../category/categoryStore';
import subcategoryStore from '../subcategory/subcategoryStore';
import groupStore from '../group/groupStore';
import productService from './productService';
import ProductDeleteConfirm from './ProductDeleteConfirm';
import DebioLicenseAccept from './DebioLicenseAccept';
import ProductFormScreenHeader from './ProductFormScreenHeader';
import ProductFormScreenImages from './ProductFormScreenImages';
import ProductFormScreenFields from './ProductFormScreenFields';
import styles from './ProductFormScreen.styles';

/**
 * Component for product form screen.
 * @extends React.Component
 */
class ProductFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <ProductFormScreenHeader navigation={navigation} />
  })

  static mapStoreItemToPickerItem = item => ({
    label: item.title,
    value: item.id
  })

  static getSubcategories = categoryId => subcategoryStore
    .filter(subcategory => subcategory.categoryId === categoryId)
    .map(ProductFormScreen.mapStoreItemToPickerItem)

  static getGroups = subcategoryId => groupStore
    .filterBySubcategory(subcategoryId)
    .map(ProductFormScreen.mapStoreItemToPickerItem)

  static validateForm = fields => (
    fields.title.length > 0 &&
    fields.price > 0 &&
    (isNumber(fields.lat) && isNumber(fields.lon))
  )

  constructor(props) {
    super(props);

    const user = authService.getUser();

    const fields = getStateParam(props.navigation, 'product', {
      subcategoryId: getStateParam(props.navigation, 'subcategoryId', 1),
      groupId: getStateParam(props.navigation, 'groupId'),
      images: [],
      title: '',
      price: 0,
      inStock: true,
      debOne: false,
      debTwo: false,
      description: '',
      unit: 0,
      address: user.address,
      phone: isString(user.phone) ? user.phone : '',
      commType: 0,
      lat: user.lat,
      lon: user.lon
    });

    this.state = {
      images: fields.images.slice(),
      data: {
        categories: [],
        categoryId: getStateParam(
          props.navigation,
          'categoryId',
          subcategoryStore.find(subcategory => subcategory.id === fields.subcategoryId).categoryId
        ),
        subcategories: [],
        groups: []
      },
      fields,
      isDebioLicenseVisible: false,
      debioLicenseFor: 'debOne',
      isFormValid: ProductFormScreen.validateForm(fields),
      isSubmiting: false
    };

    this.submitRequest = getStateParam(props.navigation, 'isEditMode', false) ?
      productService.update(fields.id) :
      productService.add();
  }

  componentWillMount() {
    this.setDefaultValues();
  }

  componentWillUnmount() {
    this.submitRequest.abort();
    this.setDrawerActiveRoute();
  }

  setDefaultValues() {
    const data = { ...this.state.data };
    const fields = { ...this.state.fields };

    data.categories = categoryStore.all().map(ProductFormScreen.mapStoreItemToPickerItem);

    if (!data.categoryId && data.categories[0]) data.categoryId = data.categories[0].value;

    data.subcategories = ProductFormScreen.getSubcategories(data.categoryId);

    if (!fields.subcategoryId && data.subcategories[0]) fields.subcategoryId = data.subcategories[0].value;

    data.groups = ProductFormScreen.getGroups(fields.subcategoryId);

    if (data.groups.length > 0 && fields.groupId == null && data.groups[0]) fields.groupId = data.groups[0].value;

    this.setState({ data, fields });
  }

  onFieldChange = (field, value) => {
    const fields = { ...this.state.fields };
    const data = { ...this.state.data };
    const state = { fields, data };

    switch (field) {
      case 'price':
        fields.price = parseFloat(value.replace(',', ''));
        state.priceIsValid = fields.price > 0;

        break;
      case 'categoryId':
        data.categoryId = value;

        /**Update sub category field */
        data.subcategories = ProductFormScreen.getSubcategories(value);
        fields.subcategoryId = data.subcategories[0] ? data.subcategories[0].value : null;

        /**Update group field */
        data.groups = ProductFormScreen.getGroups(fields.subcategoryId);
        fields.groupId = data.groups.length > 0 && data.groups[0] ? data.groups[0].value : null;

        break;
      case 'subcategoryId':
        fields.subcategoryId = value;
        data.groups = ProductFormScreen.getGroups(value);
        fields.groupId = data.groups.length > 0 && data.groups[0] ? data.groups[0].value : null;

        break;
      case 'debOne':
      case 'debTwo':
        if (value) state.isDebioLicenseVisible = true;

        state.debioLicenseFor = field;
        fields[field] = value;

        break;
      case 'address':
        fields.lat = value.lat;
        fields.lon = value.lon;
        fields.address = value.address;

        break;
      default:
        fields[field] = value;

        break;
    }

    state.isFormValid = ProductFormScreen.validateForm(fields);

    this.setState(state);
  };

  onImagesChange = (images) => {
    this.setState({ images });
  };

  onProductDelete = () => {
    const { navigation } = this.props;

    navigation.goBack(getStateParam(navigation, 'goBackFrom'));
    getStateParam(navigation, 'onGoBack', () => { })();
  };

  setDrawerActiveRoute = () => {
    const prevActiveRoute = getStateParam(this.props.navigation, 'prevActiveRoute', '');

    markRouteAsActive(prevActiveRoute === 'NewProduct' ? 'Market' : prevActiveRoute);
  };

  acceptDebioLicense = () => {
    this.setState({ isDebioLicenseVisible: false });
  };

  declineDebioLicense = () => {
    const state = { isDebioLicenseVisible: false, fields: { ...this.state.fields } };

    state.fields[this.state.debioLicenseFor] = false;

    this.setState(state);
  };

  cancelForm = () => {
    this.props.navigation.goBack();
  };

  submitForm = async () => {
    this.setState({ isSubmiting: true });

    const requestBody = new FormData();
    const { images } = this.state;
    const fields = {
      ...this.state.fields,
      images: this.state.fields.images.filter(image => images.indexOf(image) >= 0)
    };

    requestBody.append('json', JSON.stringify(fields));

    images
      .filter(image => fields.images.indexOf(image) < 0)
      .forEach((image) => {
        requestBody.append('file', {
          uri: image,
          name: image,
          type: getImageTypeFromURI(image)
        });
      });
    try {
      const productId = await this.submitRequest.body(requestBody).run();
      const { navigation } = this.props;

      this.setDrawerActiveRoute();

      navigation.navigate('Product', {
        id: typeof productId === 'number' ? productId : fields.id,
        goBackFrom: getStateParam(navigation, 'goBackFrom', navigation.state.key),
        onGoBack: getStateParam(navigation, 'onGoBack', () => { })
      });
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isSubmiting: false });
    }
  };

  render() {
    const { fields, images, data, isSubmiting, isFormValid, isDebioLicenseVisible } = this.state;
    const { navigation } = this.props;

    return Platform.OS == "ios" ? (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ProductFormScreenImages
            images={images}
            max={6}
            navigation={navigation}
            onChange={this.onImagesChange}
          />
          <ProductFormScreenFields
            fields={fields}
            data={data}
            navigation={navigation}
            onChange={this.onFieldChange}
          />
          {isSubmiting ? <ActivityIndicator animate size="large" style={styles.activityIndicator} /> : (
            <View>
              {/* (
              <Button buttonStyle={styles.cancelButton} onPress={this.cancelForm}>
                <Text style={styles.cancelButtonText}>Forhåndsvisning</Text>
              </Button>
              ) */}
              <Button disabled={!isFormValid} buttonStyle={styles.submitButton} onPress={this.submitForm}>
                <Text style={styles.submitButtonText}>UTGIVELSE</Text>
              </Button>
            </View>
          )}
        </ScrollView>
        <DebioLicenseAccept
          visible={isDebioLicenseVisible}
          onAccept={this.acceptDebioLicense}
          onDecline={this.declineDebioLicense}
        />
        <ProductDeleteConfirm
          id={fields.id}
          visible={getStateParam(navigation, 'isProductDeleteConfirmVisible', false)}
          onDelete={this.onProductDelete}
        />
      </KeyboardAvoidingView>
    ) : (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <ProductFormScreenImages
            images={images}
            max={6}
            navigation={navigation}
            onChange={this.onImagesChange}
          />
          <ProductFormScreenFields
            fields={fields}
            data={data}
            navigation={navigation}
            onChange={this.onFieldChange}
          />
          {isSubmiting ? <ActivityIndicator animate size="large" style={styles.activityIndicator} /> : (
            <View>
              {/* (
              <Button buttonStyle={styles.cancelButton} onPress={this.cancelForm}>
                <Text style={styles.cancelButtonText}>Forhåndsvisning</Text>
              </Button>
              ) */}
              <Button disabled={!isFormValid} buttonStyle={styles.submitButton} onPress={this.submitForm}>
                <Text style={styles.submitButtonText}>UTGIVELSE</Text>
              </Button>
            </View>
          )}
        </ScrollView>
        <DebioLicenseAccept
          visible={isDebioLicenseVisible}
          onAccept={this.acceptDebioLicense}
          onDecline={this.declineDebioLicense}
        />
        <ProductDeleteConfirm
          id={fields.id}
          visible={getStateParam(navigation, 'isProductDeleteConfirmVisible', false)}
          onDelete={this.onProductDelete}
        />
      </View>
    )
  }
}

export default ProductFormScreen;
