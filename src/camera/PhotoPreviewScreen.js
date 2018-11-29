/** @module src/camera/PhotoPreviewScreen */

import React, { Component } from 'react';
import {
  View,
  Image,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { palette, headerTransparent } from '../common/styles';
import { getStateParam } from '../common/helpers';
import Button from '../common/Button';
import styles from './PhotoPreviewScreen.styles';

/**
 * Component for photo preview screen.
 * @extends Component
 */
class PhotoPreviewScreen extends Component {
  static navigationOptions = { ...headerTransparent }

  constructor(props) {
    super(props);

    this.state = { imageURI: getStateParam(this.props.navigation, 'imageURI', '') };
  }

  cancelPhoto() {
    this.props.navigation.goBack();
  }

  submitPhoto() {
    this.props.screenProps.goBack([this.state.imageURI]);
  }

  render() {
    return (
      <ImageBackground
        source={{ uri: (this.state.imageURI != null && this.state.imageURI.length > 0 ? this.state.imageURI : null) }}
        style={styles.image}>

        <View style={styles.buttonsView}>
          <Button
            buttonStyle={[styles.button, styles.buttonCancel]}
            onPress={() => this.cancelPhoto()}
          >
            <Icon
              name="clear"
              size={32}
              color={palette[3]}
            />
          </Button>
          <Button
            buttonStyle={[styles.button, styles.buttonSubmit]}
            onPress={() => this.submitPhoto()}
          >
            <Icon
              name="check"
              size={32}
              color={palette[0]}
            />
          </Button>
        </View>
      </ImageBackground>
    );
  }
}

export default PhotoPreviewScreen;
