/** @module src/market/product/card.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for card component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: palette[0],
    borderRadius: 2,
    elevation: 3,
    marginHorizontal: 5,
    minHeight: 200
  },
  toolbar: {
    left: 0,
    flexDirection: 'row',
    paddingHorizontal: 5,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  toolbarLeft: {
    flexDirection: 'row',
    marginRight: 'auto'
  },
  toolbarRight: {
    marginLeft: 'auto',
    marginVertical: 10,
    backgroundColor: 'transparent'
  },
  debioIcon: {
    marginRight: 5,
    marginVertical: 10,
    height: 24,
    width: 24
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: `${palette[4]}80`,
    height: 115,
    justifyContent: 'center'
  },
  image: {
    height: 115,
    width: '100%',
    backgroundColor: 'gray'
  },
  imagePlaceholder: {
    alignSelf: 'center',
    height: 96,
    width: 96
  },
  info: {
    padding: 5,
    justifyContent: 'space-between'
  },
  infoTop: {
    flexDirection: 'row'
  },
  infoBottom: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  infoText: {
    fontSize: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: palette[2],
    maxWidth: '80%'
  }
});

export default styles;

