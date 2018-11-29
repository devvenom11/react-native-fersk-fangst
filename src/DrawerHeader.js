import React, { Component } from 'react';
import {
  View,
  Text,
  findNodeHandle,
  ImageBackground
} from 'react-native';
import { NavigationActions } from 'react-navigation';

import ProfileImage from './profile/ProfileImage';
import Touchable from './common/Touchable';
import DrawerRoute from './DrawerRoute';
import styles from './DrawerHeader.styles';
import { palette } from './common/styles';

/**
 * Header component for DrawerNavigator for Android.
 * @extends React.PureComponent
 */
class DrawerHeader extends Component {
  constructor(props) {
    super(props);

    // Needed for react-native-blur
    this.state = { profileBGImg: null };
  }

  onProfileBGImgLoad = () => {
    this.setState({ profileBGImg: findNodeHandle(this.profileBGImg) });
  }

  openProfile = () => {
    this.props.onRouteSelect('MyProfile', { isOwnProfile: true });
  }

  login = () => {
    this.props.onRouteSelect('Auth');
  }

  newProduct = () => {
    this.props.onRouteSelect('NewProduct', {
      redirectTo: NavigationActions.navigate({ redirectTo: 'ProductForm' })
    });
  }

  render() {
    const { user } = this.props;

    return (
      <View style={styles.container}>
        {
          this.props.userIsLogged ? (
            <Touchable onPress={this.openProfile}>
              <ImageBackground style={styles.profile} blurRadius={20} source={{ uri: user.photo != null && user.photo.length > 0 ? user.photo : "" }}>
                <ProfileImage image={user.photo} imageStyle={styles.profileImg} />
                <Text style={[styles.profileName, { color: user.photo != null && user.photo.length > 0 ? palette[0] : palette[3] }]} numberOfLines={1}>{user.name}</Text>
              </ImageBackground>
            </Touchable>
          ) : (
              <View>
                <Touchable onPress={this.login}>
                  <View style={styles.profile}>
                    <ProfileImage imageStyle={styles.profileImg} />
                    <Text style={styles.profileLogin}>LOGG INN</Text>
                  </View>
                </Touchable>
                <DrawerRoute
                  routeName="ProductForm"
                  label="Ny Annonse"
                  iconName="add-circle"
                  onRouteSelect={this.newProduct}
                />
              </View>
            )
        }
      </View>
    );
  }
}

DrawerHeader.defaultProps = {
  userIsLogged: false,
  user: { name: '', photo: null },
  onRouteSelect() { }
};

export default DrawerHeader;
