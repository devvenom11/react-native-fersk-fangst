/** @module src/appRoutes */

import MarketNavigator from './market/MarketNavigator';
import ProfileNavigator from './profile/ProfileNavigator';
import AuthNavigator from './auth/AuthNavigator';
import CameraNavigator from './camera/CameraNavigator';
import SettingsNavigator from './settings/SettingsNavigator';
import ChatNavigator from './chat/ChatNavigator';

/**
 * Routes config for the app.
 * @type NavigationRouteConfigMap
 */
const appRoutes = {
  Market: { screen: MarketNavigator },
  Messenger: { screen: ChatNavigator },
  MyProfile: { screen: ProfileNavigator },
  Auth: { screen: AuthNavigator },
  Favorites: { screen: MarketNavigator },
  Camera: { screen: CameraNavigator },
  Settings: { screen: SettingsNavigator }
};

export default appRoutes;
