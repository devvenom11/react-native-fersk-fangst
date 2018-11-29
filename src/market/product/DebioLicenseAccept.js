/** @module src/product/DebioLicenseAccept */

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import { DebioLicense } from '../../common/legalTexts';
import Modal from '../../common/Modal';

/**
 * Modal window confirmation form for Debio license.
 * @extends React.PureComponent
 */
class DebioLicenseAccept extends Component {
  render() {
    const { visible, onDecline, onAccept } = this.props;

    return (
      <Modal
        visible={visible}
        content={(
          <ScrollView>
            <DebioLicense style={Modal.styles.text} />
          </ScrollView>
        )}
        controls={(
          <View style={Modal.styles.controls}>
            <Modal.DeclineButton onPress={onDecline} />
            <View style={{ flex: 1 }}></View>
            <Modal.AcceptButton onPress={onAccept} />
          </View>
        )}
      />
    );
  }
}

DebioLicenseAccept.defaultProps = {
  visible: false,
  onAccept() { },
  onDecline() { }
};

export default DebioLicenseAccept;
