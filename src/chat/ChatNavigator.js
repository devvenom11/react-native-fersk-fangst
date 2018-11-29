/** @module src/settings/ChatNavigator */

import { StackNavigator } from 'react-navigation';

import DialogsScreen from './DialogsScreen';
import ChatScreen from './ChatScreen';

/**
 * Navigator component for Chat module.
 * @type {StackNavigator}
 */
const ChatNavigator = StackNavigator({
  Dialogs: { screen: DialogsScreen },
  Chat: { screen: ChatScreen }
}, {
  initialRouteName: 'Dialogs'
});

export default ChatNavigator;
