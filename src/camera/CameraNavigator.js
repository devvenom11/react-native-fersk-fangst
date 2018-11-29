/** @module src/camera/CameraNavigator */

import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import { getStateParam } from '../common/helpers';
import CameraScreen from './CameraScreen';
import CameraRollScreen from './CameraRollScreen';
import PhotoPreviewScreen from './PhotoPreviewScreen';

/**
 * Navigator component for camera module.
 * @type Component
 */
const Navigator = StackNavigator({
  Camera: { screen: CameraScreen },
  CameraRoll: { screen: CameraRollScreen },
  PhotoPreview: { screen: PhotoPreviewScreen }
}, {
  initialRouteName: 'CameraRoll'
});

/**
 * StackNavigator wrapper for camera module navigation.
 * @extend Component
 */
class CameraNavigator extends Component {
  goBack = (images = []) => {
    const onImageSelect = getStateParam(
      this.props.navigation,
      'onImageSelect',
      () => {}
    );

    this.props.navigation.goBack();
    onImageSelect(images);
  }

  render() {
    const screenProps = {
      selectedMaxNum: getStateParam(
        this.props.navigation,
        'selectedMaxNum',
        6
      ),
      goBack: this.goBack
    };

    return <Navigator screenProps={screenProps} />;
  }
}

export default CameraNavigator;
