/** @module src/profile/ProfileScreen */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  RefreshControl,
  StyleSheet,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Toast from '@remobile/react-native-toast';
import Appsee from 'react-native-appsee';


import { markRouteAsActive } from '../AppNavigator';
import { palette, header, placeholders } from '../common/styles';
import { getStateParam, bindComponentMethod, bindComponentRef } from '../common/helpers';
import Touchable from '../common/Touchable';
import ActionButton from '../common/ActionButton';
import MapStatic from '../map/MapStatic';
import authService from '../auth/authService';
import ProductCards from '../market/product/ProductCards';
import profileService from './profileService';
import ProfileInfo from './ProfileInfo';
import ProfileComActions from './ProfileComActions';
import ProfileScreenHeader from './ProfileScreenHeader';
import LogoutConfirm from './LogoutConfirm';
import styles from './ProfileScreen.styles';
import ChatModal from '../ChatModal';

/**
 * Profile screen component.
 * @extends Component
 */
class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <ProfileScreenHeader navigation={navigation} />
  });

  constructor(props) {
    super(props);

    const stickyHeaderStyles = StyleSheet.flatten(header.sticky);

    this.state = {
      stickyHeaderHeight: 0,
      stickyHeaderTopMargin: -(stickyHeaderStyles.minHeight + stickyHeaderStyles.paddingTop),
      infoContainerHeight: 0,
      isLoading: true,
      isOwnProfile: getStateParam(props.navigation, 'isOwnProfile', false),
      profileLoaded: false,
      activeTab: 'inStock',
      productsReqParams: { offset: null, limit: 20, inStock: true, author: 1 },
      profile: {},
      showTitle: false
    };

    this.profileRequest = profileService.get(this.state.isOwnProfile ?
      authService.getUser().userId :
      getStateParam(props.navigation, 'id', 0)
    );
  }

  componentDidMount() {
    this.loadProfile();
    Appsee.addEvent('Reached ProfileScreen');
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.isOwnProfile) {
        this.props.navigation.navigate('Market');

        markRouteAsActive('Market');

        return true;
      }

      return false;
    });
  }

  componentWillUnmount() {
    this.profileRequest.abort();

    BackHandler.removeEventListener('hardwareBackPress');
  }

  onScroll = ({ nativeEvent }) => {

    const { y: yOffset } = nativeEvent.contentOffset;
    const { stickyHeaderHeight, stickyHeaderTopMargin, infoContainerHeight } = this.state;
    const targetYOffset = infoContainerHeight - 30;

    if (yOffset >= targetYOffset) {
      this.setState({ stickyHeaderTopMargin: 0, showTitle: true });
    } else if (yOffset < targetYOffset && stickyHeaderTopMargin === 0) {
      this.setState({ stickyHeaderTopMargin: 0, showTitle: false });
    }
  };

  onInfoContainerLayoutChange = ({ nativeEvent }) => {
    this.setState({ infoContainerHeight: nativeEvent.layout.height });
  };

  onStickyHeaderLayoutChange = ({ nativeEvent }) => {
    if (this.state.stickyHeaderHeight === 0) {
      const { height } = nativeEvent.layout;

      this.setState({ stickyHeaderHeight: height, stickyHeaderTopMargin: -height });
    }
  };

  onTabPress = (type) => {
    const inStock = type === 'inStock';

    this.setState({
      activeTab: inStock ? 'inStock' : 'inOrder',
      productsReqParams: { ...this.state.productsReqParams, inStock }
    });
  };

  onLogout = () => {
    this.props.navigation.navigate('Auth');
  };

  onClose = () => {
    this.props.navigation.setParams({ showLogoutConfirm: false });
  }

  getProfile = async () => {
    try {
      return await this.profileRequest.run();
    } catch (e) {
      throw e;
    }
  };

  loadProfile = async () => {
    this.setState({ isLoading: true });

    try {
      const profile = await this.getProfile();

      this.setState({
        profile,
        profileLoaded: true,
        productsReqParams: { ...this.state.productsReqParams, author: profile.userId }
      }, () => {
        this.props.navigation.setParams({
          profileLoaded: true,
          isOwnProfile: this.state.isOwnProfile
        });
      });
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  refreshProfile = async () => {
    try {
      this.setState({ profile: await this.getProfile() });
    } catch (e) {
      Toast.show(e.toString(), 2000);
    }
  };

  navToProductScreen = (product) => {
    const { navigation } = this.props;

    navigation.navigate('Product', {
      id: product.id,
      onGoBack: this.refsCache.get('products').refreshProducts
    });
  }

  navToProductForm = () => {
    this.props.navigation.navigate('ProductForm', {
      onGoBack: this.refsCache.get('products').refreshProducts
    });

    markRouteAsActive('NewProduct');
  };

  showAddressOnMap = () => {
    const { lat: latitude, lon: longitude, address } = this.state.profile;

    this.props.navigation.navigate('ShowOnMap', { latitude, longitude, address });
  };

  mapPlaceholderGradient = [`${palette[3]}60`, `${palette[3]}70`, palette[3]];

  mapStyle = [{ stylers: [{ saturation: -60 }, { lightness: -25 }] }];

  keyExtractor = item => item;

  renderStickyHeader = () => {

    const { profile, activeTab, showTitle } = this.state;

    return (
      <View style={{ marginTop: this.state.stickyHeaderTopMargin }}>

        {showTitle ? (
          <View style={header.sticky} onLayout={this.onStickyHeaderLayoutChange}>
            <Text style={styles.stickyHeaderText} numberOfLines={1}>
              {this.state.isOwnProfile ? profile.name : 'Min Profil'}
            </Text>
          </View>
        ) : (null)}

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.button, { borderBottomColor: activeTab === 'inStock' ? palette[2] : 'white' }]}
            onPress={bindComponentMethod.call(this, this.onTabPress, 'inStock')}>
            <Text style={styles.tabLabel}>TILGJENGELIG ({profile.inStock})</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { borderBottomColor: activeTab === 'inOrder' ? palette[2] : 'white' }]}
            onPress={bindComponentMethod.call(this, this.onTabPress, 'inOrder')}>
            <Text style={styles.tabLabel}>KOMMER ({profile.posts - profile.inStock})</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  };

  renderMapPlaceholder = () => (
    <LinearGradient colors={this.mapPlaceholderGradient} style={styles.mapPlaceholder}>
      <Icon name="map" style={styles.iconInMap} size={48} color={`${palette[3]}30`} />
    </LinearGradient>
  );

  renderInfoContainer = () => {
    const { profile } = this.state;

    return (
      <View style={styles.infoContainer} onLayout={this.onInfoContainerLayoutChange}>
        <View style={styles.map}>
          <MapStatic
            lat={profile.lat}
            lon={profile.lon}
            showMarker
            customMapStyle={this.mapStyle}
            onPress={this.showAddressOnMap}
            onMarkerPress={this.showAddressOnMap}
            placeholder={this.renderMapPlaceholder}
          />
        </View>
        <View style={styles.profile}>
          <ProfileInfo
            profile={profile}
            disableTouch
            avatarStyle={styles.avatar}
            onlineStyle={styles.onlineStatus}
            nameStyle={styles.name}
            locationStyle={styles.location}
          />
        </View>
      </View>
    );
  };

  render() {
    const { profile, profileLoaded, isOwnProfile, isLoading, stickyHeaderTopMargin } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <ChatModal />
        {profileLoaded ? (
          <ProductCards
            ref={bindComponentRef.call(this, 'products')}
            renderSectionHeader={this.renderStickyHeader}
            renderListHeader={this.renderInfoContainer}
            onScroll={this.onScroll}
            params={this.state.productsReqParams}
            extraData={{ stickyHeaderTopMargin }}
            onCardPress={this.navToProductScreen}
            onRefresh={this.refreshProfile}
            stickySectionHeadersEnabled
            isShowADS={false}
          />
        ) : (
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={this.loadProfile} />}>
              {!isLoading && <Text style={placeholders.emptyComponentText}>Trekk for å oppdatere</Text>}
            </ScrollView>
          )}
        {profileLoaded && !isOwnProfile && (
          <ProfileComActions
            commType={profile.phone ? 2 : 0}
            phone={profile.phone}
            name={profile.name}
            uid={profile.userId}
            navigation={navigation}
          />
        )}
        <LogoutConfirm
          visible={getStateParam(navigation, 'showLogoutConfirm', false)}
          onLogout={this.onLogout}
          onClose={this.onClose}
        />
        {profileLoaded && isOwnProfile && (
          <ActionButton containerStyle={styles.newProduct} onPress={this.navToProductForm}>
            <Icon name="add" size={25} color={palette[0]} />
          </ActionButton>
        )}
      </View>
    );
  }
}

export default ProfileScreen;
