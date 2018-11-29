/** @module src/market/product/ProductFormScreenFields.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for ProductFormScreenFields component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 15,
    paddingRight: 15
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textField: {
    flex: 1,
    marginLeft: 15,
    marginTop: 11
  },
  phoneNumContainer: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 10
  },
  phoneNumText: {
		width: 50,
		height: 30,
		marginLeft: 15,
		color: palette[5],
		fontSize: 12,
		marginTop: 20,
	},
  pickerContainer: {
    flex: 1,
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 10
  },
  pickerLabel: {
    fontSize: 12
  },
  picker: {
    // marginLeft: -8,
    height: 40
  },
  debioContainer: {
    alignItems: 'center'
  },
  debio: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 30,
    maxWidth: 400,
    paddingLeft: 15
  },
  debioSwitch: {
    alignItems: 'flex-start',
    width: 70
  },
  debioInfo: {
    flex: 1
  },
  debioTitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10
  },
  debioExample: {
    alignItems: 'center',
    flex: 1
  }
});

export default styles;
