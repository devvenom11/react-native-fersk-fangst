/** @module src/product/SettingsScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  BackHandler
} from 'react-native';

import Appsee from 'react-native-appsee';

import { markRouteAsActive } from '../AppNavigator';
import { headerDefault } from '../common/styles';
import { bindComponentMethod } from '../common/helpers';
import DrawerOpener from '../common/DrawerOpener';
import Touchable from '../common/Touchable';
import authService from '../auth/authService';
import styles from './SettingsScreen.styles';

/**
 * Component for settings screen.
 * @extends Component
 */
class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    ...headerDefault,
    headerTitle: 'Innstillinger',
    headerLeft: <DrawerOpener navigate={navigation.navigate} />
  })

  constructor(props) {
    super(props);

    this.state = {
      sections: [
        { label: 'Rediger profil', route: 'ProfileSettings' },
        { label: 'Bytt passord', route: 'ChangePassword' },
        { label: 'Endre e-post', route: 'ChangeEmail' },
        { label: 'Slett profil', route: 'ProfileDelete' }
      ]
    };

    this.OAuthUserSections = /ProfileSettings|ProfileDelete/;
  }

  componentWillMount() {
    if (authService.getUser().email == null) {
      this.setState({
        sections: this.state.sections.filter(section => this.OAuthUserSections.test(section.route))
      });
    }
  }

  componentDidMount() {
    Appsee.addEvent('Reached SettingsScreen');
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Market');

      markRouteAsActive('Market');

      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress');
  }

  navToSettingsSection = (section) => {
    this.props.navigation.navigate(section);
  };

  renderSections = section => (
    <Touchable
      key={section.route}
      onPress={bindComponentMethod.call(this, this.navToSettingsSection, section.route)}
    >
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{section.label}</Text>
      </View>
    </Touchable>
  );

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>{this.state.sections.map(this.renderSections)}</ScrollView>
      </View>
    );
  }
}

export default SettingsScreen;
