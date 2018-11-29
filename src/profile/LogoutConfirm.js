/** @module src/product/LogoutConfirm */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Toast from '@remobile/react-native-toast';

import Modal from '../common/Modal';
import authService from '../auth/authService';

/**
 * Modal window confirmation form logout.
 * @extends Component
 */
class LogoutConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: props.visible };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  dismiss = () => {
    this.setState({ visible: false }, this.props.onClose);
  };

  logout = async () => {
    try {
      await authService.logout();

      this.props.onLogout();
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.dismiss();
    }
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        content={<Text style={Modal.styles.text}>Ønsker du å logge deg ut?</Text>}
        controls={(
          <View style={Modal.styles.controls}>
            <Modal.DeclineButton onPress={this.dismiss} />
            <View style={{ flex: 1 }}></View>
            <Modal.AcceptButton onPress={this.logout} />
          </View>
        )}
      />
    );
  }
}

LogoutConfirm.defaultProps = {
  visible: false,
  onLogout() { },
  onClose() { }
};

export default LogoutConfirm;
