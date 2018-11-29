/** @module src/settings/ChangeEmailScreen */

import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from '@remobile/react-native-toast';

import { palette, headerDefault } from '../common/styles';
import Button from '../common/Button';
import EmailField from '../common/EmailField';
import authService from '../auth/authService';
import profileService from '../profile/profileService';
import styles from './ChangeEmailScreen.styles';

/**
 * Screen component for email changing.
 * @extends Component
 */
class ChangeEmailScreen extends Component {
  static navigationOptions = {
    title: 'Endre e-post',
    ...headerDefault
  }

  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      isSubmiting: false,
      isSubmitted: false,
      email: '',
      user: authService.getUser()
    };

    this.submitRequest = profileService.update(this.state.user.userId);
  }

  componentWillUnmount() {
    this.submitRequest.abort();
  }

  onEmailFieldChange = (field, value) => {
    this.setState({ email: value, isFormValid: value.length > 0 });
  };

  submitForm = async () => {
    this.setState({ isSubmiting: true });

    const body = new FormData();

    body.append('json', JSON.stringify({ ...this.state.user, email: this.state.email }));

    try {
      await this.submitRequest.body(body).run();

      this.setState({ isSubmitted: true });
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isSubmiting: false });
    }
  };

  render() {
    const { email, isSubmiting, isSubmitted, isFormValid } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.fields}>
            <EmailField
              name="email"
              label="Ny e-post"
              value={email}
              onChangeText={this.onEmailFieldChange}
            />
            {!isSubmitted ? (
              <View style={styles.info}>
                <Icon name="info-outline" size={32} color={palette[5]} />
                <Text style={styles.infoText}>
                  Etter vellykket e-post endring bør du aktivere ny e-post ved å følge lenken som vil bli sendt til
                  spesifisert e-postadresse.
                </Text>
              </View>
            ) : (
              <View style={styles.info}>
                <Icon name="check" size={32} color={palette[2]} />
                <Text style={styles.infoText}>E-post ble endret.</Text>
                <Text style={styles.infoText}>
                  Nå kan du aktivere ny e-post ved å følge linken som ble sendt til spesifisert adresse og
                  påloggingsinformasjon etter aktivering.
                </Text>
              </View>
            )}
          </View>
          {!isSubmitted && (
            <View style={styles.controls}>
              {isSubmiting ? (
                <ActivityIndicator size="large" style={styles.activityIndicator} />
              ) : (
                <Button
                  disabled={!isFormValid}
                  buttonStyle={styles.submitButton}
                  onPress={this.submitForm}
                >
                  <Text style={styles.buttonText}>ENDRE E-POST</Text>
                </Button>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default ChangeEmailScreen;
