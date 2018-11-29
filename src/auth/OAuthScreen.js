/** @module src/auth/OAuthScreen */

import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation';
import CookieManager from 'react-native-cookies';
import Toast from '@remobile/react-native-toast';

import { getStateParam } from '../common/helpers';
import Request from '../common/Request';
import authService from './authService';
import styles from './OAuthScreen.styles';

const userAgent = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3497.100 Safari/537.36';

/**
 * RN WebView wrapper for OAuth integration
 * @extends Component
 */
class OAuthScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    let title = 'Logg inn med ';

    switch (getStateParam(navigation, 'service')) {
      case 'fb':
        title = `${title}Facebook`;
        break;
      case 'google':
        title = `${title}Google`;
        break;
      default:
        break;
    }

    return { headerTitle: title };
  }

  constructor(props) {
    super(props);

    this.state = {
      OAuthLink: '',
      isLoading: false,
      redirectTo: getStateParam(props.navigation, 'redirectTo', NavigationActions.navigate({
        routeName: 'MyProfile',
        params: { isOwnProfile: true }
      }))
    };

    this.OAuthLinkRequest = authService.OAuthLink(getStateParam(props.navigation, 'service', 'google'));
    this.OAuthUserRequest = authService.OAuthUser();

    this.endpointAPIRexp = new RegExp(`^${Request.baseUrl}auth\\/(\\w+)\\?code=(.*)`);
  }

  async componentWillMount() {
    await CookieManager.clearAll();
  }

  componentDidMount() {
    this.getOAuthLink();
  }

  componentWillUnmount() {
    this.OAuthLinkRequest.abort();
    this.OAuthUserRequest.abort();
  }

  onLoadStart = ({ nativeEvent }) => {
    this.setState({ isLoading: true });

    const { url } = nativeEvent;

    if (this.endpointAPIRexp.test(url)) {
      this.webViewRef.stopLoading();

      const [, service, code] = url.match(this.endpointAPIRexp);

      this.getOAuthUser(service, code);
    }
  };

  onLoadEnd = ({ nativeEvent }) => {
    const { url } = nativeEvent;

    this.setState({ isLoading: url === 'about:blank' || this.endpointAPIRexp.test(url) });
  };

  getOAuthLink = async () => {
    try {
      const { link: OAuthLink } = await this.OAuthLinkRequest.run();
      const popupLink = OAuthLink + '&display=popup';

      this.setState({ OAuthLink: popupLink });
    } catch (e) {
      Toast.show(e.toString(), 2000);
    }
  };

  getOAuthUser = async (service, code) => {
    this.setState({ isLoading: true });

    this.OAuthUserRequest = authService.OAuthUser(service).params({ code });

    try {
      await this.login(await this.OAuthUserRequest.run());
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  login = async (user) => {
    try {
      await authService.setToken(user.token);

      delete user.token;
      await authService.setUser(user);
      await authService.setLastLogin(' ');

      this.props.navigation.dispatch(this.state.redirectTo);
    } catch (e) {
      throw e;
    }
  };

  webViewRef = WebView;

  bindWebViewRef = (ref) => {
    this.webViewRef = ref;
  };

  render() {
    const { OAuthLink: uri, isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && <ActivityIndicator animate size="large" style={styles.activityIndicator} />}
        <WebView
          ref={this.bindWebViewRef}
          source={{ uri }}
          userAgent={userAgent}
          onLoadStart={this.onLoadStart}
          onLoadEnd={this.onLoadEnd}
        />
      </View>
    );
  }
}

export default OAuthScreen;
