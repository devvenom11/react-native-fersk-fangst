/** @module src/product/ProductDeleteConfirm */

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Toast from '@remobile/react-native-toast';

import Modal from '../../common/Modal';
import productService from './productService';

/**
 * Modal window confirmation form for product post deletion.
 * @extends React.PureComponent
 */
class ProductDeleteConfirm extends Component {
  constructor(props) {
    super(props);

    this.state = { isProcessing: false, visible: props.visible };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }

  dismiss = () => {
    this.setState({ isProcessing: false, visible: false }, this.props.onClose);
  };

  deleteProduct = async () => {
    this.setState({ isProcessing: true });

    try {
      await productService.delete(this.props.id).run();

      this.props.onDelete();
    } catch (e) {
      Toast.show(e.toString(), 2000);
    } finally {
      this.dismiss();
    }
  };

  render() {
    const { isProcessing, visible } = this.state;

    return (
      <Modal
        visible={visible}
        content={<Text style={Modal.styles.text}>Er du sikker på at du vil slette annonsen?</Text>}
        controls={
          isProcessing ? <Modal.ActivityIndicator /> : (
            <View style={Modal.styles.controls}>
              <Modal.DeclineButton onPress={this.dismiss} />
              <View style={{ flex: 1 }}></View>
              <Modal.AcceptButton onPress={this.deleteProduct} />
            </View>
          )
        }
      />
    );
  }
}

ProductDeleteConfirm.defaultProps = {
  visible: false,
  onDelete() { },
  onClose() { }
};

export default ProductDeleteConfirm;
