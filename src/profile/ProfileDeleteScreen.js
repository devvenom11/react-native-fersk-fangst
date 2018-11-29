/** @module src/settings/ProfileDeleteScreen */

import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from '@remobile/react-native-toast';

import { markRouteAsActive } from '../AppNavigator';
import { palette, headerDefault } from '../common/styles';
import Button from '../common/Button';
import authService from '../auth/authService';
import profileService from '../profile/profileService';
import styles from './ProfileDeleteScreen.styles';

/**
 * Screen component for profile deleting.
 * @extends Component
 */
class ProfileDeleteScreen extends Component {
  static navigationOptions = {
    title: 'Slett profil',
    ...headerDefault
  }

  constructor(props) {
    super(props);

    this.state = { isProcessing: false };

    this.request = profileService.delete(authService.getUser().userId);
  }

  componentWillUnmount() {
    this.request.abort();
  }

  deleteProfile = async () => {
    this.setState({ isProcessing: true });

    try {
      await this.request.run();
      await authService.logout();

      markRouteAsActive('');

      this.props.navigation.navigate('Auth');
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isProcessing: false });
    }
  };

  render() {
    const { isProcessing } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.info}>
            <Icon name="info-outline" size={32} color={palette[6]} />
            <Text style={styles.infoText}>
              Er du sikker på at du vil slette din konto?
              {'\n\n'}
              Slette kontoen din er permanent og fjerner alt innhold, inkludert annonsen,
              avatarer og profilinnstillinger.
            </Text>
          </View>
          <View style={styles.controls}>
            {isProcessing ? (
              <ActivityIndicator animate size="large" style={styles.activityIndicator} />
            ) : (
              <Button buttonStyle={styles.deleteButton} onPress={this.deleteProfile}>
                <Text style={styles.buttonText}>SLETT PROFIL</Text>
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ProfileDeleteScreen;
