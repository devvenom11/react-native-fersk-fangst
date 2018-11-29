/** @module src/camera/CameraRollScreen */

import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  CameraRoll,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

import { palette, header, headerDefault } from '../common/styles';
import { calcGrid, getStateParam, bindComponentMethod, requestExternalStorage } from '../common/helpers';
import Touchable from '../common/Touchable';
import HeaderButton from '../common/HeaderButton';
import Button from '../common/Button';
import styles from './CameraRollScreen.styles';

/**
 * Component for camera roll screen.
 * @extends Component
 */
class CameraRollScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const selectedCount = getStateParam(navigation, 'selectedCount', 0);

    return {
      ...headerDefault,
      headerLeft: (
        <HeaderButton onPress={() => { screenProps.goBack(); }}>
          <Icon
            name="arrow-back"
            size={24}
            color={palette[0]}
          />
        </HeaderButton>
      ),
      headerTitle: 'Velg bilde',
      headerRight: screenProps.selectedMaxNum > 0 && (
        <Text style={[header.text, { paddingRight: 10 }]}>
          {`Utvalgt ${selectedCount}/${screenProps.selectedMaxNum}`}
        </Text>
      )
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      screenWidth: 0,
      colMinWidth: 110,
      colWidth: 110,
      cols: 1,
      endCursor: '',
      images: [{ uri: 'cameraBtn' }],
      selectedURIs: [],
      selectedMaxNum: props.screenProps.selectedMaxNum
    };
  }

  componentDidMount() {
    this.getCameraRoll();
  }

  onLayoutChange = (evt) => {
    const { width } = evt.nativeEvent.layout;

    if (width !== this.state.screenWidth) {
      const grid = calcGrid(width - 10, this.state.colMinWidth);

      this.setState({
        screenWidth: width,
        cols: grid.cols,
        colWidth: grid.colWidth
      });
    }
  };

  onCardSelect = (uri) => {
    this.setState((state) => {
      const selectedURIs = state.selectedURIs.filter(selectedURI => selectedURI !== uri);
      const selectedCount = selectedURIs.length;
      const { selectedMaxNum } = state;

      if (
        selectedCount === state.selectedURIs.length &&
        selectedMaxNum > 0 &&
        selectedCount < selectedMaxNum
      ) {
        selectedURIs.push(uri);
      }

      return { selectedURIs };
    }, () => {
      this.props.navigation.setParams({ selectedCount: this.state.selectedURIs.length });
    });
  };

  onEndReached = () => {
    if (this.state.endCursor.length > 0) {
      this.getCameraRoll();
    }
  };

  getCameraRoll = async () => {
    if (await requestExternalStorage()){
      if (this.state.endCursor === '') {
        const cameraRoll = await CameraRoll.getPhotos({
          first: 30
        });

        this.setState(state => ({
          images: [...state.images, ...cameraRoll.edges.map(edge => edge.node.image)],
          endCursor: cameraRoll.page_info.has_next_page ? cameraRoll.page_info.end_cursor : ''
        }));
      } else {
        const cameraRoll = await CameraRoll.getPhotos({
          first: 30,
          after: this.state.endCursor
        });

        this.setState(state => ({
          images: [...state.images, ...cameraRoll.edges.map(edge => edge.node.image)],
          endCursor: cameraRoll.page_info.has_next_page ? cameraRoll.page_info.end_cursor : ''
        }));
      }
    }
  };

  openCamera = () => {
    if (Platform.OS == "android") {
        const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.launchCamera(options, (response) => {
        CameraRoll.getPhotos({
          first: 1,
          assetType: 'All',
        })
        .then(r => {
          this.props.screenProps.goBack([r.edges[0].node.image.uri]);
        })
        .catch((err) => {
        });
      });
    } else {
      this.props.navigation.navigate('Camera');
    }
    
  };

  submitSelection = () => {
    this.props.screenProps.goBack(this.state.selectedURIs);
  };

  keyExtractor = item => item.uri;

  renderItem = ({ item }) => {

    const cardSize = this.state.colWidth - 10;
    const { uri } = item;
    const selectedIdx = this.state.selectedURIs.indexOf(uri) + 1;

    return uri === 'cameraBtn' ? (
      <View style={{ width: this.state.colWidth }}>
        <View style={[styles.cameraBtn, { height: cardSize }]}>
          <Touchable onPress={this.openCamera}>
            <View style={styles.cameraBtnTouchable}>
              <Icon
                name="camera-alt"
                size={36}
                color={palette[5]}
              />
              <Text>Lag et bilde</Text>
            </View>
          </Touchable>
        </View>
      </View>
    ) : (
        <View style={{ width: this.state.colWidth }}>
          <ImageBackground
            source={{ uri }}
            style={[styles.imageCard, {
              height: cardSize,
              width: cardSize
            }]}
          >
            <Touchable style={{ flex: 1 }} onPress={bindComponentMethod.call(this, this.onCardSelect, uri)}>
              <View style={styles.imageCardTouchable}>
                {selectedIdx > 0 && (
                  <Text style={styles.imageCardCheckMark}>{selectedIdx}</Text>
                )}
              </View>
            </Touchable>
          </ImageBackground>
        </View>
      );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          onLayout={this.onLayoutChange}
          style={styles.imagesContainer}
        >
          <FlatList
            numColumns={this.state.cols}
            key={this.state.cols}
            data={this.state.images}
            extraData={this.state.selectedURIs}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.1}
            scrollEventThrottle={16}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            windowSize={50}
            removeClippedSubviews
          />
        </View>
        <View style={styles.submitBtnContainer}>
          <Button
            onPress={this.submitSelection}
            buttonStyle={styles.submitBtn}
          >
            <Text style={styles.submitBtnText}>FERDIG</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default CameraRollScreen;
