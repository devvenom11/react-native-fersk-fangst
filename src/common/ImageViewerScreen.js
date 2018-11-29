/** @module src/map/ImageViewerScreen */

import React, { Component } from 'react';
import { Image } from 'react-native';
import Gallery from 'react-native-image-gallery';

import { getStateParam } from './helpers';
import ImageViewerScreenHeader from './ImageViewerScreenHeader';
import styles from './ImageViewerScreen.styles';

/**
 * Component for image viewer screen.
 * @extends Component
 */
class ImageViewerScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <ImageViewerScreenHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);

    this.state = {
      images: getStateParam(props.navigation, 'images', []).map(uri => ({ source: { uri } })),
      index: getStateParam(props.navigation, 'index', 0)
    };
  }

  onImageChange = (index) => {
    this.props.navigation.setParams({ index });
  };

  renderImage = props => <Image {...props} resizeMethod="resize" />;

  render() {
    const { index, images } = this.state;

    return (
      <Gallery
        style={styles.container}
        images={images}
        initialPage={index}
        imageComponent={this.renderImage}
        pageMargin={15}
        onPageSelected={this.onImageChange}
      />
    );
  }
}

export default ImageViewerScreen;
