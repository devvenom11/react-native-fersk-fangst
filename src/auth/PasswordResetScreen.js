/** @module src/auth/PasswordResetScreen */

import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import Toast from '@remobile/react-native-toast';

import { headerDefault } from '../common/styles';
import { timeout, platform } from '../common/helpers';
import Button from '../common/Button';
import EmailField from '../common/EmailField';
import authService from './authService';
import styles from './PasswordResetScreen.styles';

/**
 * Component for Login and Registraion screens.
 * @extends Component
 */
class PasswordResetScreen extends Component {
  static navigationOptions = {
    title: 'Passordgjenoppretting',
    ...headerDefault
  }

  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      isSubmitting: false,
      email: ''
    };

    this.submitRequest = authService.resetPassword();
  }

  componentWillUnmount() {
    this.submitRequest.abort();
  }

  onEmailFieldChange = (field, value) => {
    this.setState({ email: value, isFormValid: value.length > 0 });
  };

  submitForm = async () => {
    this.setState({ isSubmitting: true });

    try {
      await this.submitRequest.body({ email: this.state.email }).run();

      Toast.show('Nytt passord er sendt', 2000);
      timeout(() => { this.props.navigation.navigate('LoginReg'); }, 2500);
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  render() {
    const { email, isFormValid, isSubmitting } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View>
            <Text style={styles.infoText}>
              Skriv inn din epost som vil motta et brev med nytt generert passord. Du kan endre det senere i
              Innstillinger.
            </Text>
            <EmailField
              name="email"
              value={email}
              onChangeText={this.onEmailFieldChange}
              style={styles.emailField}
            />
            {isSubmitting ? (
              <ActivityIndicator animating size="large" style={styles.activityIndicator} />
            ) : (
              <Button onPress={this.submitForm} disabled={!isFormValid} buttonStyle={styles.submitButton}>
                <Text style={styles.buttonText}>{platform.ios ? 'Send' : 'SEND'}</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default PasswordResetScreen;
