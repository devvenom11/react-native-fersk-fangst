/** @module src/auth/SuccessRegScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text
} from 'react-native';

import { getStateParam } from '../common/helpers';
import Button from '../common/Button';
import styles from './SuccessRegScreen.styles';

/**
 * Info screen about successfull registration.
 * @extends Component
 */
class SuccessRegScreen extends Component {
  navigateToLogin = () => {
    const { navigation } = this.props;

    navigation.navigate('Auth', {
      email: getStateParam(navigation, 'email', 'test@mail.com'),
      redirectTo: getStateParam(navigation, 'redirectTo', 'ProfileDetail')
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.text}>Takk for din registrering!</Text>
            <Text style={styles.text}>
              Følg linken som er sendt til din e-post adresse.
              Deretter kan du logge inn med e-post adressen og passordet du oppgav.
              Kos deg med Fersk Fangst!
            </Text>
            <Button onPress={this.navigateToLogin}>
              <Text style={styles.buttonText}>Logg inn</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SuccessRegScreen;
