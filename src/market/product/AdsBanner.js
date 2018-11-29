import React, { Component } from 'react';
import { Linking, View, Text, Image } from 'react-native';
import Touchable from '../../common/Touchable';
import styles from './AdsBanner.styles';
import { shadow } from '../../common/styles';

class AdsBanner extends Component {
  constructor(props) {
    super(props);
    this.timeout = null;
    this.state = {
      showBanner: true,
    };
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({showBanner: false});
    }, (this.props.banner.timer * 1000));
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
  
  onPress = () => {
    Linking.canOpenURL(this.props.banner.link).then(supported => {
      if (supported) {
        Linking.openURL(this.props.banner.link);
      }
    });
  };

  render() {
    const { banner } = this.props;
    if (this.state.showBanner) {
      return (
        <View>
          <Touchable onPress={this.onPress}>
            <View style={[styles.banner, shadow]}>
              <Image source={{ uri: banner.image }} resizeMethod="resize" resizeMode="stretch" style={styles.image} />
            </View>
          </Touchable>
        </View>
      );
    } else {
      return null;
    }
  }
}

AdsBanner.defaultProps = {
    banner: {
      category: 0,
      id: 0,
      image: null,
      isActive: true,
      link: null,
      priority: 0,
      timer: 0
    }
  };

export default AdsBanner;
