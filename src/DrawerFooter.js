/** @module src/DrawerFooter */

import React, { Component } from 'react';
import { View, ScrollView, Linking } from 'react-native';

import Modal from './common/Modal';
import { AdvertisingLicense, TermsAndConditions } from './common/legalTexts';
import LogoutConfirm from './profile/LogoutConfirm';
import DrawerRoute from './DrawerRoute';

/**
 * Footer component for Drawer
 * @extends Component
 */
class DrawerFooter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: ['Help', 'Contacts', 'AdvLicense', 'Terms'],
      modal: null
    };
  }

  onRouteSelect = (route) => {
    this.props.navigation.navigate('DrawerClose');

    switch (route) {
      case 'Help':
      case 'Contacts':
        Linking.openURL(this.links[route]);
        break;
      case 'AdvLicense':
      case 'Terms':
      case 'Exit':
        this.setState({ modal: this.modals[route].render });
        break;
      default:
        break;
    }
  };

  onModalClose = () => {
    this.setState({ modal: null });
  };

  labels = {
    Help: 'Hjelp',
    Contacts: 'Kontakt oss & Om appen',
    AdvLicense: 'Reklame / betalt plassering',
    Terms: 'Vilkår og betingelser',
    Exit: 'Logg ut'
  };

  links = { Help: 'https://www.ferskfangst.no/hjelp', Contacts: 'https://www.ferskfangst.no/kontakt/' };

  modals = {
    AdvLicense: {
      render: () => (
        <Modal
          visible
          content={<AdvertisingLicense style={Modal.styles.text} />}
          onRequestClose={this.onModalClose}
        />
      )
    },
    Terms: {
      render: () => (
        <Modal
          visible
          content={(
            <ScrollView>
              <TermsAndConditions style={Modal.styles.text} />
            </ScrollView>
          )}
          onRequestClose={this.onModalClose}
        />
      )
    },
    Exit: {
      render: () => <LogoutConfirm visible onLogout={this.modals.Exit.onLogout} onClose={this.onModalClose} />,
      onLogout: this.props.navigation.navigate.bind(this, 'Auth')
    }
  };

  renderRoute = route => (
    <DrawerRoute
      key={route}
      routeName={route}
      label={this.labels[route]}
      onRouteSelect={this.onRouteSelect}
    />
  );

  render() {
    const { routes, modal } = this.state;

    return (
      <View>
        {routes.map(this.renderRoute)}
        {this.props.userIsLogged && this.renderRoute('Exit')}
        {typeof modal === 'function' && modal()}
      </View>
    );
  }
}

DrawerFooter.defaultProps = {
  userIsLogged: false
};

export default DrawerFooter;
