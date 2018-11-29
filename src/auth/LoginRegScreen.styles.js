import { StyleSheet } from 'react-native';

import { palette } from '../common/styles';
import { platform } from '../common/helpers';

/**
 * Stylesheet for Login and Registration screens component.
 * @type {StyleSheet}
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: palette[0],
    flex: 1
  },
  scroll: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  form: {
    flex: 1,
    flexGrow: 1.5,
    justifyContent: 'space-between',
    maxWidth: 380,
    minWidth: 280,
    padding: platform.ios ? 48 : 40,
  },
  fields: {
    minHeight: 110,
    justifyContent: 'space-between'
  },
  field: {
    ...(platform.ios ?
      {
        fontSize: 16,
        lineHeight: 24
      } :
      {
        fontSize: 14,
        lineHeight: 16
      }
    ),
    marginVertical: 10
  },
  actions: {
    minHeight: 130,
    justifyContent: 'space-between',
    paddingBottom: 35,
    paddingTop: platform.ios ? 30 : 34
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  actionMain: {
    flex: 1,
    maxWidth: 378,
    minWidth: 278
  },
  actionFB: {
    backgroundColor: '#3B5998',
    flex: 1,
    marginRight: 5,
    maxWidth: 183,
    minWidth: 133
  },
  actionGoogle: {
    backgroundColor: '#DE473A',
    flex: 1,
    marginLeft: 5,
    maxWidth: 183,
    minWidth: 133
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24
  },
  actionTextDisabled: {
    color: (palette[platform.ios ? 5 : 0])
  },
  activityIndicator: {
    ...StyleSheet.flatten(StyleSheet.absoluteFillObject),
    backgroundColor: palette[0],
    justifyContent: 'center',
    zIndex: 1
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: platform.ios ? 40 : 36
  }
});

export default styles;
