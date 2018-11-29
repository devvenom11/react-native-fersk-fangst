/** @module src/market/group/GroupCard.styles */

import { StyleSheet } from 'react-native';

import { palette } from '../../common/styles';

/**
 * Stylesheet for GroupCard.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: palette[0],
    borderRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 15,
    height: 40,
    padding: 15
  },
  title: {
    color: palette[3],
    fontSize: 16
  },
  titleSelected: {
    color: palette[2],
    fontSize: 16
  }
});


export default styles;
