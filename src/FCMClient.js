/** @module src/FCMClient */

import React, { Component } from 'react';
import { AppState } from 'react-native'
import { NavigationActions } from 'react-navigation';
import FCM, { FCMEvent } from 'react-native-fcm';
import { isString } from './common/helpers';
import authService from './auth/authService';
import chatService from './chat/chatService';
import navigationDispatcher from './navigationDispatcher';

const listeners = new Set();
let handleInitialNotification = true;

/**
 * Component Firebase Cloud Messaging client.
 * @extends Component
 */
class FCMClient extends Component {

  static clearNotification = FCM.removeAllDeliveredNotifications;
  static cancelNotification = FCM.cancelAllLocalNotifications;

  constructor(props) {
    super(props);

    this.state = {
      notification: null
    }
  }

  componentDidMount() {
    authService.onUserChange.add(this.onUserChange);
  }

  componentWillUnmount() {
    authService.onUserChange.delete(this.onUserChange);
  }

  onUserChange = async (isLogged) => {
    await this.requestPermissions();

    if (isLogged) {
      if (handleInitialNotification) this.getInitialNotification();

      if (listeners.size === 0) {
        listeners.add(FCM.on(FCMEvent.RefreshToken, this.onToken));
        listeners.add(FCM.on(FCMEvent.Notification, this.onNotification));
      }

      const fcmToken = await this.getFCMToken();
      if (AppState.currentState == ('background' || 'inactive')) {
        chatService.close();
      } else if (isString(fcmToken, true)) chatService.connect(authService.getToken(), fcmToken);
    } else {
      FCMClient.clearNotification();
      FCMClient.cancelNotification();

      listeners.forEach(listener => listener.remove());
      listeners.clear();

      chatService.clear();

      this.deleteFCMInstance();
    }
  };

  onToken = (fcmToken) => {
    chatService.close();
    chatService.connect(authService.getToken(), fcmToken);
  };

  onNotification = (notification) => {
    const { opened_from_tray: isOpenedFromTray = false, finish } = notification;
    var appData;
    try {
      appData = JSON.parse(notification.app);
    } catch (error) {
      console.log(error);
    }
    if (typeof finish === 'function') finish();

    if (isOpenedFromTray) {
      handleInitialNotification = false;
      this.tapOnNotificationView(appData.uid, appData.name);

    } else {
      this.setState({
        notification: notification
      }, () => {
        setTimeout(() => {
          this.setState({ notification: null });
        }, 2000);
      });
    }
  };

  getFCMToken = async () => {
    try {
      return await FCM.getFCMToken();
    } catch (e) {
      return '';
    }
  };

  getInitialNotification = async () => {
    const notification = await FCM.getInitialNotification();
    const { id, opened_from_tray: isOpenedFromTray = false } = notification;

    if (isOpenedFromTray && id != null) {
      this.onNotification(notification);
    }
  };

  deleteFCMInstance = async () => {
    try {
      await FCM.deleteInstanceId();

      return true;
    } catch (e) {
      return false;
    }
  };

  requestPermissions = async () => {
    try {
      await FCM.requestPermissions();

      return true;
    } catch (e) {
      return false;
    }
  };

  tapOnNotificationView = (uid, name) => {

    this.setState({ notification: null }, () => {
      navigationDispatcher.dispatch(NavigationActions.navigate({
        routeName: 'Messenger',
        action: NavigationActions.navigate({
          routeName: 'Chat',
          params: {
            uid: uid,
            name: name,
            openedFromNotification: true,
            markAsRead: true
          }
        })
      }));
    });
  };

  render() {
    return null;
  }
}


export default FCMClient;
