import React, { Component } from 'react';
import { View, Text, Linking, TouchableHighlight } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import navigationDispatcher from '../navigationDispatcher';
import Touchable from '../common/Touchable';
import { palette } from '../common/styles';
import authService from '../auth/authService';
import styles from './ProfieComActions.styles';

/*
 * Component for profile communication actions.
 * @extends Component
 */
class ProfileComActions extends Component {
  chat = () => {
    const { uid, product, name, navigation } = this.props;
    const chatNavParams = {
      uid,
      name,
      toSend: (product.length > 0 ? `Hei, jeg vil gjerne kjøpe ${product} fra deg` : ''),
      goBack: true
    };

    if (authService.getUser() != null) {
      navigation.navigate('Chat', chatNavParams);
    } else {
      chatNavParams.goBack = false;

      navigation.navigate('Auth', {
        redirectTo: NavigationActions.navigate({
          routeName: 'Messenger',
          action: NavigationActions.navigate({
            routeName: 'Chat',
            params: chatNavParams
          })
        })
      });
    }
  };

  call = () => {
    Linking.openURL(`tel:${this.props.phone}`);
  };

  render() {
    const { commType } = this.props;

    return (
      <View style={styles.container}>
        {(commType === 0 || commType === 2) && (
          <TouchableHighlight style={styles.action} onPress={this.chat}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="message" size={24} color={palette[0]} />
              <Text style={styles.actionTitle}>BESKJED</Text>
            </View>
          </TouchableHighlight>
        )}
        {commType === 2 && (
          <View style={styles.delimiter} />
        )}
        {(commType === 1 || commType === 2) && (
          <TouchableHighlight style={styles.action} onPress={this.call}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="phone" size={24} color={palette[0]} />
              <Text style={styles.actionTitle}>RINGE</Text>
            </View>
          </TouchableHighlight>
        )}
      </View>
    );
  }
}

ProfileComActions.defaultProps = {
  commType: 0,
  phone: '',
  product: '',
  name: '',
  uid: null
};

export default ProfileComActions;
