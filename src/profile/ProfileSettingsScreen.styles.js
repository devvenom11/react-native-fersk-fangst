/** @module src/market/profile/ProfileSettingsScreen.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';

/**
 * Stylesheet for ProfileSettingsScreen component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  scrollContainer: {
    minHeight: '100%'
  },
  fields: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15
  },
  photoEdit: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    maxWidth: 450,
    justifyContent: 'space-between'
  },
  photo: {
    height: 88,
    width: 88
  },
  uploadPhotoButton: {
    marginHorizontal: 15,
    paddingVertical: 10,
    height: 45
  },
  deletePhotoButton: {
    backgroundColor: palette[0],
    paddingVertical: 10
  },
  field: {
    marginTop: 5
  },
  controls: {
    justifyContent: 'flex-end'
  },
  activityIndicator: {
    height: 80,
    justifyContent: 'center',
    width: '100%'
  },
  submitButton: {
    minWidth: '100%',
    paddingVertical: 10
  },
  buttonText: {
    color: palette[0],
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  },
  phoneNumContainer: {
    flex: 1,
    paddingTop: 10
  },
  phoneNumText: {
		width: 50,
		height: 30,
		color: palette[5],
		fontSize: 12,
		marginTop: 20,
	}
});

export default styles;
