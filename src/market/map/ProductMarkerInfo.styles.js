/** @module src/market/map/ProductMarkerInfo.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

const container = {
  borderRadius: 2,
  elevation: 3,
  marginHorizontal: 15,
  position: 'absolute',
  width: 260,
  zIndex: 1
};

/**
 * Stylesheet for ProductMarkerInfo component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  containerCentered: {
    ...container,
    bottom: 15
  },
  containerSided: {
    ...container,
    alignSelf: 'center',
    right: 5
  },
  header: {
    alignItems: 'center',
    backgroundColor: palette[2],
    flexDirection: 'row',
    height: 40,
    padding: 10
  },
  body: {
    backgroundColor: palette[0]
  },
  image: {
    flex: 1,
    height: 140
  },
  imagePlaceholder: {
		alignItems: 'center',
		height: 140,
		justifyContent: 'center',
		alignSelf: 'center',
		width: 140
	},
  info: {
    padding: 10,
    justifyContent: 'space-between'
  },
  infoRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  debioIcon: {
    marginRight: 5,
    height: 24,
    width: 24
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  descriptionText: {
    flex: 1
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: palette[2],
    maxWidth: '80%'
  }
});

export default styles;

