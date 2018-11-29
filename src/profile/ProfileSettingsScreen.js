/** @module src/product/ProfileSettingsScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from '@remobile/react-native-toast';
import PhoneInput from 'react-native-phone-input'

import { headerDefault } from '../common/styles';
import { getStateParam, getImageTypeFromURI } from '../common/helpers';
import Button from '../common/Button';
import TextField from '../common/TextField';
import PhoneField from '../common/PhoneField';
import LocationPicker from '../map/LocationPicker';
import authService from '../auth/authService';
import profileService from './profileService';
import ProfileImage from './ProfileImage';
import styles from './ProfileSettingsScreen.styles';

/**
 * Component for profile setting screen.
 * @extends Component
 */
class ProfileSettingsScreen extends Component {
  static navigationOptions = {
    ...headerDefault,
    headerTitle: 'Min Profil'
  }

  constructor(props) {
    super(props);

    const fields = { ...authService.getUser() };
    const { email } = fields;

    delete fields.email;

    this.state = {
      photo: fields.photo,
      email,
      fields,
      isFormValid: false,
      isSubmitting: false,
      onSubmit: getStateParam(props.navigation, 'onSubmit', () => {})
    };

    this.submitRequest = profileService.update(fields.userId);
  }

  componentWillUnmount() {
    this.submitRequest.abort();
  }

  onFieldChange = (field, value) => {
    let fields = { ...this.state.fields };
    if (field === 'address') {
      fields = { ...fields, ...value };
    } else {
      fields[field] = value;
    }

    this.setState({ fields, isFormValid: this.validateForm(fields) });
  };

  validateForm = fields => fields.name.length > 0;

  addPhoto = (images) => {
    if (images.length > 0) {
      this.setState({ photo: images[0] });
    }
  };

  deletePhoto = () => {
    this.setState({ photo: null, fields: { ...this.state.fields, photo: '' } });
  };

  openCameraRoll = () => {
    this.props.navigation.navigate('Camera', { selectedMaxNum: 1, onImageSelect: this.addPhoto });
  };

  cancelForm = () => {
    this.props.navigation.goBack();
  };

  submitForm = async () => {
    this.setState({ isSubmiting: true });

    const requestBody = new FormData();
    const { photo, email, fields } = this.state;

    if (photo != null && photo !== fields.photo) {
      requestBody.append('file', { uri: photo, name: photo, type: getImageTypeFromURI(photo) });
    }

    requestBody.append('json', JSON.stringify(fields));

    try {
      await authService.setUser({
        ...fields,
        ...(await this.submitRequest.body(requestBody).run()),
        email
      });

      if (getStateParam(this.props.navigation, 'redirectToProfile', false)) {
        this.props.navigation.navigate('ProfileDetail', { isOwnProfile: true });
      } else {
        this.props.navigation.goBack();
        Toast.show('Profil oppdatert', 2000);
      }
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isSubmiting: false });
    }
  };

  render() {
    const { fields } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.fields}>
            <View style={styles.photoEdit}>
              <ProfileImage image={this.state.photo} imageStyle={styles.photo} />
              <Button buttonStyle={styles.uploadPhotoButton} onPress={this.openCameraRoll}>
                <Text style={styles.buttonText}>LASTE OPP</Text>
              </Button>
              <Button buttonStyle={styles.deletePhotoButton} onPress={this.deletePhoto}>
                <Icon name="delete" size={22} />
              </Button>
            </View>
            <TextField
              name="name"
              label="Navn*"
              value={fields.name}
              autoCapitalize="words"
              containerStyle={styles.field}
              onChangeText={this.onFieldChange}
            />
            <LocationPicker
              name="address"
              lat={fields.lat}
              lon={fields.lon}
              address={fields.address}
              containerStyle={styles.field}
              navigation={this.props.navigation}
              onSelect={this.onFieldChange}
            />
            <View>

            </View>
            <Text style={styles.phoneNumText}>Telefon</Text>
            <PhoneField
              containerStyle={styles.phoneNumContainer}
              name="phone"
              value={fields.phone}
              onChangeText={this.onFieldChange}
            />
          </View>
          <View style={styles.controls}>
            {this.state.isSubmiting ? (
              <ActivityIndicator size="large" style={styles.activityIndicator} />
            ) : (
              <Button
                disabled={!this.state.isFormValid}
                buttonStyle={styles.submitButton}
                onPress={this.submitForm}
              >
                <Text style={styles.buttonText}>LAGRE</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ProfileSettingsScreen;
