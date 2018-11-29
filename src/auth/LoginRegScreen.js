/** @module src/auth/LoginRegScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  BackHandler,
  Keyboard
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';
import Toast from '@remobile/react-native-toast';

import { markRouteAsActive } from '../AppNavigator';
import { palette } from '../common/styles';
import {
  platform,
  getStateParam,
  bindComponentMethod,
  bindComponentRef,
  forceLayoutUpdate
} from '../common/helpers';
import Button from '../common/Button';
import TextField from '../common/TextField';
import EmailField from '../common/EmailField';
import PasswordField from '../common/PasswordField';
import Link from '../common/Link';
import Modal from '../common/Modal';
import { PrivacyPolicy, TermsAndConditions } from '../common/legalTexts';
import authService from './authService';
import styles from './LoginRegScreen.styles';

/**
 * Component for Login and Registraion screens.
 * @extends Component
 */
class LoginRegScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginState: props.navigation.state.routeName === 'Login',
      isSubmitting: false,
      isNewPasswordValid: true,
      isFormValid: false,
      redirectTo: getStateParam(props.navigation, 'redirectTo', NavigationActions.navigate({
        routeName: 'MyProfile',
        params: { isOwnProfile: true }
      })),
      name: '',
      email: getStateParam(props.navigation, 'email', authService.getLastLogin()),
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
      legalText: ''
    };

    this.loginRequest = authService.login();
    this.registerRequest = authService.register();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      markRouteAsActive('Market');

      return false;
    });

    // Hack to enable TextInput touch events inside ViewPageriOS.
    // https://github.com/facebook/react-native/issues/9958
    // https://github.com/react-navigation/react-navigation/issues/3521
    // https://github.com/react-navigation/react-navigation/issues/1992
    forceLayoutUpdate(this.refsCache.get('scroll'), { width: 0 }, { width: '100%' });
  }

  componentWillUnmount() {
    this.loginRequest.abort();
    this.registerRequest.abort();

    BackHandler.removeEventListener('hardwareBackPress');
  }

  onFieldChange = (field, value) => {
    const state = { ...this.state };

    state[field] = value;

    const { isLoginState, email, name, password, newPassword, newPasswordConfirm } = state;

    state.isNewPasswordValid = !(
      (field === 'newPassword' && newPasswordConfirm.length > 0 && value !== newPasswordConfirm) ||
      (field === 'newPasswordConfirm' && newPassword.length > 0 && value !== newPassword)
    );
    state.isFormValid = (
      email.length > 0 &&
      (isLoginState ? password.length > 0 : (name.length > 0 && state.isNewPasswordValid))
    );

    this.setState(state);
  };

  navToPasswordReset = () => {
    this.props.navigation.navigate('PasswordReset');
  };

  navToOAuth = (service) => {
    this.props.navigation.navigate('OAuth', { service });
  };

  submit = async () => {
    Keyboard.dismiss();
    try {
      this.setState({ isSubmitting: true });

      if (this.state.isLoginState) {
        await this.login();
      } else {
        await this.register();
      }
    } catch (e) {
      Toast.show(e.toString(), 2000);
      this.setState({ isError: true });
    } finally {
      this.setState({ isSubmitting: false });
    }
  };

  showLegalText = (legalText) => {
    this.setState({ legalText });
  };

  hideLegalText = () => {
    this.setState({ legalText: '' });
  };

  login = async () => {
    try {
      const { email, password, redirectTo } = this.state;
      const user = await this.loginRequest.body({ email, password }).run();

      await authService.setToken(user.token);

      delete user.token;
      user.email = email;

      await authService.setUser(user);
      await authService.setLastLogin(email);

      this.props.navigation.dispatch(redirectTo);
    } catch (e) {
      throw e;
    }
  };

  register = async () => {
    try {
      const { name, email, newPassword: password, redirectTo } = this.state;

      await this.registerRequest.body({ name, email, password }).run();

      this.props.navigation.navigate('SuccessReg', { redirectTo, email });
    } catch (e) {
      throw e;
    }
  };

  render() {
    const {
      isSubmitting,
      isFormValid,
      isNewPasswordValid,
      isError,
      isLoginState,
      email,
      name,
      password,
      newPassword,
      newPasswordConfirm,
      legalText
    } = this.state;

    const defaultErrorText = isError ? ' ' : '';
    const passwordComfirmErrorText = isNewPasswordValid ? '' : 'Passord er ikke det samme';

    let mainActionText = this.state.isLoginState ? 'LOGG INN' : 'REGISTRERING';

    if (platform.ios) mainActionText = mainActionText.toUpperCase();

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          ref={bindComponentRef.call(this, 'scroll')}
        >
          <View style={styles.form}>
            <View style={styles.fields}>
              {!isLoginState && (
                <TextField
                  name="name"
                  label="Navn"
                  value={name}
                  error={defaultErrorText}
                  onChangeText={this.onFieldChange}
                />
              )}
              <EmailField
                name="email"
                value={email}
                error={defaultErrorText}
                onChangeText={this.onFieldChange}
              />
              {isLoginState ? (
                <PasswordField
                  name="password"
                  value={password}
                  error={defaultErrorText}
                  onChangeText={this.onFieldChange}
                />
              ) : (
                  <View>
                    <PasswordField
                      name="newPassword"
                      label="Nytt passord"
                      value={newPassword}
                      error={passwordComfirmErrorText || defaultErrorText}
                      onChangeText={this.onFieldChange}
                    />
                    <PasswordField
                      name="newPasswordConfirm"
                      label="Gjenta nytt passord"
                      value={newPasswordConfirm}
                      error={passwordComfirmErrorText || defaultErrorText}
                      onChangeText={this.onFieldChange}
                    />
                  </View>
                )}
            </View>
            {isLoginState && <Link onPress={this.navToPasswordReset}>Glemt passordet?</Link>}
            <View style={styles.actions}>
              {isSubmitting && <ActivityIndicator animating size="large" style={styles.activityIndicator} />}
              <View style={styles.actionsRow}>
                <Button onPress={this.submit} disabled={!isFormValid} buttonStyle={[styles.actionMain, { backgroundColor: isFormValid ? palette[2] : palette[3] }]}>
                  <Text style={styles.actionText}>{mainActionText}</Text>
                </Button>
              </View>
              <View style={styles.actionsRow}>
                <Text>eller</Text>
              </View>
              <View style={styles.actionsRow}>
                <Button
                  buttonStyle={styles.actionFB}
                  onPress={bindComponentMethod.call(this, this.navToOAuth, 'fb')}
                >
                  <Icon name="sc-facebook" size={24} color={palette[0]} />
                </Button>
                <Button
                  buttonStyle={styles.actionGoogle}
                  onPress={bindComponentMethod.call(this, this.navToOAuth, 'google')}
                >
                  <Icon name="sc-google-plus" size={24} color={palette[0]} />
                </Button>
              </View>
            </View>
            <View style={styles.info}>
              <Text>Ved å logge inn, godtar du vilkårene våre i&nbsp;</Text>
              <Link onPress={bindComponentMethod.call(this, this.showLegalText, 'terms')}>Vilkår og Betingelser</Link>
              <Text>&nbsp;og vår&nbsp;</Text>
              <Link onPress={bindComponentMethod.call(this, this.showLegalText, 'privacy')}>
                Retningslinjer for personvern
              </Link>
            </View>
          </View>
        </ScrollView>
        <Modal
          visible={legalText === 'terms'}
          content={(
            <ScrollView>
              <TermsAndConditions style={Modal.styles.text} />
            </ScrollView>
          )}
          onRequestClose={this.hideLegalText}
        />
        <Modal
          visible={legalText === 'privacy'}
          content={(
            <ScrollView>
              <PrivacyPolicy style={Modal.styles.text} />
            </ScrollView>
          )}
          onRequestClose={this.hideLegalText}
        />
      </View>
    );
  }
}

export default LoginRegScreen;
