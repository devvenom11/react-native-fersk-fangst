/** @module src/camera/PhotoPreviewScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for photo preview screen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonsView: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    borderRadius: 50,
    marginBottom: 30,
    elevation: 3
  },
  buttonSubmit: {
    marginRight: 30
  },
  buttonCancel: {
    backgroundColor: palette[0],
    marginLeft: 30
  }
});

export default styles;

