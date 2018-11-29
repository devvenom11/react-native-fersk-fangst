/** @module src/settings/ChangePasswordScreen */

import React, { Component }  from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import Toast from '@remobile/react-native-toast';

import { headerDefault } from '../common/styles';
import Button from '../common/Button';
import PasswordField from '../common/PasswordField';
import profileService from '../profile/profileService';
import styles from './ChangePasswordScreen.styles';

/**
 * Screen component for password changing.
 * @extends Component
 */
class ChangePasswordScreen extends Component {
  static navigationOptions = {
    title: 'Bytt passord',
    ...headerDefault
  }

  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false,
      isNewPasswordValid: true,
      isSubmiting: false,
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    };

    this.submitRequest = profileService.changePassword();
  }

  componentWillUnmount() {
    this.submitRequest.abort();
  }

  onFieldChange = (field, value) => {
    const state = { ...this.state };

    state[field] = value;

    const { currentPassword, newPassword, newPasswordConfirm } = state;

    state.isNewPasswordValid = !(
      (field === 'newPassword' && newPasswordConfirm.length > 0 && value !== newPasswordConfirm) ||
      (field === 'newPasswordConfirm' && newPassword.length > 0 && value !== newPassword)
    );
    state.isFormValid = (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      newPasswordConfirm.length > 0 &&
      state.isNewPasswordValid
    );


    this.setState(state);
  };

  submitForm = async () => {
    this.setState({ isSubmiting: true });

    try {
      await this.submitRequest.body({ old: this.state.currentPassword, new: this.state.newPassword }).run();

      this.props.navigation.goBack();
      Toast.show('Passordet er vellykket endret', 2000);
    } catch (e) {
      Toast.show('Gammelt passord er feil', 2000);
    } finally {
      this.setState({ isSubmiting: false });
    }
  };

  render() {
    const {
      currentPassword,
      newPassword,
      newPasswordConfirm,
      isSubmiting,
      isFormValid,
      isNewPasswordValid
    } = this.state;
    const errorText = isNewPasswordValid ? '' : 'Passord er ikke det samme';

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.fields}>
            <PasswordField
              name="currentPassword"
              label="Gammelt passord"
              value={currentPassword}
              onChangeText={this.onFieldChange}
            />
            <PasswordField
              name="newPassword"
              label="Nytt passord"
              value={newPassword}
              error={errorText}
              onChangeText={this.onFieldChange}
            />
            <PasswordField
              name="newPasswordConfirm"
              label="Nytt passord re-entry"
              value={newPasswordConfirm}
              error={errorText}
              onChangeText={this.onFieldChange}
            />
          </View>
          <View style={styles.controls}>
            {isSubmiting ? (
              <ActivityIndicator size="large" style={styles.activityIndicator} />
            ) : (
              <Button
                disabled={!isFormValid}
                buttonStyle={styles.submitButton}
                onPress={this.submitForm}
              >
                <Text style={styles.buttonText}>BYTT PASSORD</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ChangePasswordScreen;
