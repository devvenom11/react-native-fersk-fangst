/** @module src/market/product/ProductScreen.styles */

import { StyleSheet } from 'react-native';

import { palette, header } from '../../common/styles';

/**
 * Stylesheet for ProductScreen.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stickyHeader: {
    backgroundColor: palette[3],
    left: 0,
    position: 'absolute',
    right: 0,
    zIndex: 0
  },
  stickyHeaderText: {
    ...StyleSheet.flatten(header.text),
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 15,
    paddingHorizontal: 85
  },
  images: {
    backgroundColor: palette[4],
    zIndex: 11
  },
  info: {
    backgroundColor: palette[0],
    paddingHorizontal: 15,
    paddingTop: 15
  },
  infoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold'
  },
  debio: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  debioIcon: {
    marginLeft: 5,
    height: 32,
    width: 32
  },
  price: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  priceValue: {
    color: palette[2],
    fontSize: 18,
    fontWeight: 'bold'
  },
  date: {
    flex: 1,
    textAlign: 'right'
  },
  status: {
    fontWeight: 'bold',
    lineHeight: 16,
    textAlign: 'left'
  },
  description: {
    borderBottomColor: palette[3],
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 14,
    paddingBottom: 20,
    paddingTop: 15
  },
  author: {
    backgroundColor: palette[0],
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  map: {
    height: 200,
    marginBottom: 25
  },
  adverts: {
    paddingBottom: 15,
    paddingHorizontal: 5
  },
  advertsTitle: {
    paddingBottom: 15,
    paddingLeft: 10
  },
  activityIndicator: {
    padding: 15
  }
});

export default styles;

