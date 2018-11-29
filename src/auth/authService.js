/** @module src/auth/authService */

import { AppState, AppStateIOS } from 'react-native';

import AsyncStorage from '../common/AsyncStorage';
import Request from '../common/Request';
import chatService from '../chat/chatService';

const keys = {
  token: '@FerskFangst:token',
  user: '@FerskFangst:loggedUser',
  lastLogin: '@FerskFangst:lastLogin'
};
const values = { token: '', user: null, lastLogin: '' };

const onUserChange = new Set();

async function checkUser() {
    try {
    values.token = await AsyncStorage.getItem(keys.token);
    values.user = await AsyncStorage.getItem(keys.user);
    values.lastLogin = await AsyncStorage.getItem(keys.lastLogin);

    onUserChange.forEach(listener => listener(true, values.user));
  } catch (e) {
    values.token = '';
    values.user = null;
    values.lastLogin = '';
    onUserChange.forEach(listener => listener(false, values.user));
  }
}

async function onAppStateChange(state) {
  // if (state === 'active')
    checkUser();
}

class AuthService {
  constructor() {
    AppState.addEventListener('change', onAppStateChange);
    onAppStateChange();
  }

  onUserChange = onUserChange;

  isLogged = () => values.token.length > 0 && values.user !== null;

  setToken = async (token) => {
    try {
      await AsyncStorage.setItem(keys.token, token);

      values.token = token;
    } catch (e) {
      throw e;
    }
  };

  getToken = () => values.token;

  setUser = async (user) => {
    try {
      await AsyncStorage.setItem(keys.user, user);

      values.user = user;

      onUserChange.forEach(listener => listener(true, user));
    } catch (e) {
      throw e;
    }
  };

  getUser = () => values.user;

  checkUser = checkUser;

  setLastLogin = async (email) => {
    try {
      await AsyncStorage.setItem(keys.lastLogin, email);

      values.lastLogin = email;
    } catch (e) {
      throw e;
    }
  };

  getLastLogin = () => values.lastLogin;

  login = () => new Request().post('login');

  logout = async () => {
    try {
      await AsyncStorage.removeItem(keys.token);
      await AsyncStorage.removeItem(keys.user);

      values.token = '';
      values.user = null;

      chatService.close();

      onUserChange.forEach(listener => listener(false, null));
    } catch (e) {
      throw e;
    }
  };

  OAuthLink = service => new Request().get(`authLink/${service}`);

  OAuthUser = service => new Request().get(`auth/${service}`);

  register = () => new Request().post('register');

  resetPassword = () => new Request().post('reset');
}

export default new AuthService();
