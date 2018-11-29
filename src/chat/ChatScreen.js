/** @module src/chat/ChatScreen */

import React, { Component } from 'react';
import {
  View,
  SectionList,
  Text,
  ActivityIndicator,
  AppState,
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal as RNModal,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from '@remobile/react-native-toast';
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import Appsee from 'react-native-appsee';

import FCMClient from '../FCMClient';
import { palette } from '../common/styles';
import { getStateParam, getCompanionId } from '../common/helpers';
import Touchable from '../common/Touchable';
import authService from '../auth/authService';
import chatService, { checkSocketState } from './chatService';
import ChatMessage from './ChatMessage';
import ChatScreenHeader from './ChatScreenHeader';
import ChatScreenInput from './ChatScreenInput';
import MessageSectionsMap from './MessageSectionsMap';
import styles from './ChatScreen.styles';
import navigationDispatcher from '../navigationDispatcher';


/**
 * Screen component for chat.
 * @extends Component
 */
class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: <ChatScreenHeader navigation={navigation} />
  })

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      sections: [],
      messageCount: 0,
      stickyDate: 0,
      isStickyDateVisible: false,
      toSend: getStateParam(props.navigation, 'toSend', ''),
      sendQueue: [],
      token: '',
      userId: 0,
      companionId: getCompanionId(props.navigation, 'uid', 0),
      offset: 0,
      notification: null,
      message: null,
      temp_uid: null,
      sender_uid: null
    };

    this.sectionsMap = new MessageSectionsMap();
  }

  componentWillMount() {
    Appsee.addEvent('Reached ChatScreen');
    this.setState({ userId: authService.getUser().userId });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentDidMount() {
    FCMClient.clearNotification();

    chatService.addEventListener(chatService.onConnect, this.onConnect);
    chatService.addEventListener(chatService.onReceive, this.onReceive);
    chatService.addEventListener(chatService.onError, this.onError);
    chatService.addEventListener(chatService.onClose, this.onClose);

    this.props.navigation.setParams({ goBackHandler: this.goBackHandler });

    BackHandler.addEventListener('hardwareBackPress', this.goBackHandler);    
  }

  componentWillUnmount() {
    this.clearListeners();
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow(e) {
    this.setState({ offset: e.endCoordinates.height })
  }

  _keyboardDidHide() {
    this.setState({ offset: 0 })
  }

  onConnect = () => {
    this.loadMessages();
    if (getStateParam(this.props.navigation, 'markAsRead', false)) this.markAsRead(this.state.companionId);
  };

  onReceive = (evt) => {
    const data = JSON.parse(evt.data)
    try {
      switch (data.type) {
        case 'history':
          this.onMessagesLoad(data.info);
          break;
        case 'message':
          this.onMessageReceive(data, data.timeStamp);

          break;
        case 'success':
          if (/^READ-/.test(data.id)) break;

          this.onMessageSent(data.id);

          break;
        default:
          break;
      }
    } catch (e) {
      Toast.show('Server error', 2000);
      console.log("server error", e);
    } finally {
      this.resetIndicators();
    }
  };

  onClose = () => {
    this.resetIndicators();
  };

  onError = () => {
    this.resetIndicators();
  }

  onMessagesLoad = (messages) => {
    if (messages.length >0) {
      this.setState({ temp_uid: messages[0].uid })

      for (let i = 0; i < messages.length; i++) {
        const message = messages[i];
  
        message.time = Moment.utc(message.time).local();
  
        this.sectionsMap.get(this.timestampToDateStamp(message.time)).push(message);
      }
      this.setState({
        sections: this.sectionsMap.toList(),
        messageCount: this.state.messageCount + messages.length
      });
    }


  };

  onMessageReceive = (data, timeStamp) => {
    var cur_time = Moment().format('LT');
    const message = {
      id: data.id,
      uid: data.uid,
      name: data.name,
      message: data.text,
      time: Moment(timeStamp),
      message_time: cur_time,
      isRead: true
    };
    this.setState({ message: message,
                    notification: true,
                    sender_uid: data.uid });
    this.setState({  });
    setTimeout(() => {
        this.setState({ notification: null });
      }, 3000);
    
    if (this.state.sender_uid === this.state.temp_uid) {
      this.sectionsMap.get(this.timestampToDateStamp(message.time)).unshift(message);

      this.setState({ sections: this.sectionsMap.toList(), messageCount: this.state.messageCount + 1 });
  
      if (AppState.currentState === 'active') {
        chatService.dispatch({ type: 'success', id: data.id });
        this.markAsRead(this.state.companionId);
      }
    }
  };

  tapOnNotificationView = (uid, name) => {

    this.setState({ notification: null }, () => {
      navigationDispatcher.dispatch(NavigationActions.navigate({
        routeName: 'Messenger',
        action: NavigationActions.navigate({
          routeName: 'Chat',
          params: {
            uid: uid,
            name: name,
            openedFromNotification: true,
            markAsRead: true
          }
        })
      }));
    });
  };

  onMessageSent = (messageId) => {    
    this.setState({ sendQueue: this.state.sendQueue.filter(id => id !== messageId) });
  };

  onWrite = (toSend) => {
    this.setState({ toSend });
  };

  onSubmit = () => {
    if (this.state.toSend.length > 0) this.sendMessage();
  };

  onEndReached = () => {
    if (this.state.isLoading) return;

    this.loadMessages(this.state.messageCount);
  };

  onViewableItemsChanged = ({ viewableItems: items }) => {
    const datestamp = items[items.length - 1].section.title;

    if (datestamp !== this.state.stickyDate) {
      this.setState({ stickyDate: datestamp });
    }
  };

  onScrollBegin = () => {
    this.setState({ isStickyDateVisible: true });
  };

  onScrollEnd = () => {
    this.setState({ isStickyDateVisible: false });
  };

  goBackHandler = () => {
    const { navigation } = this.props;

    if (getStateParam(navigation, 'goBack', false)) {
      navigation.goBack();
      getStateParam(navigation, 'onGoBack', () => { })();
    } else {
      navigation.navigate('Dialogs', { loadDialogs: true });
    }

    this.clearListeners();

    return true;
  };

  timestampToDateStamp = timestamp => Moment(timestamp).startOf('day').valueOf();

  loadMessages = (offset = 0) => {
    this.setState({ isLoading: true });

    chatService.send({
      type: 'history',
      uid: this.state.companionId,
      offset,
      limit: 30
    });
  };

  sendMessage = () => {
    const { toSend: text, userId, companionId, messageCount, sendQueue } = this.state;
    const timestamp = Moment();
    const message = {
      id: `${userId}${companionId}${timestamp.valueOf()}`,
      uid: userId,
      message: text,
      time: timestamp,
      isRead: false
    };

    chatService.send({
      type: 'message',
      text,
      uid: companionId,
      id: message.id
    });

    this.sectionsMap.get(this.timestampToDateStamp(message.time)).unshift(message);

    this.setState({
      sections: this.sectionsMap.toList(),
      toSend: '',
      sendQueue: [...sendQueue, message.id],
      messageCount: messageCount + 1
    });
    
  };

  markAsRead = (uid) => {
    chatService.send({ type: 'read', id: `READ-${uid}`, uid });
  };

  resetIndicators = () => {
    this.setState({ isLoading: false });
  };

  clearListeners = () => {
    chatService.removeEventListener(chatService.onConnect, this.onConnect);
    chatService.removeEventListener(chatService.onReceive, this.onReceive);
    chatService.removeEventListener(chatService.onError, this.onClose);
    chatService.removeEventListener(chatService.onClose, this.onClose);

    BackHandler.removeEventListener('hardwareBackPress');
  };

  keyExtractor = (message, index) => (index != null ? `${message.uid}${index}` : message.title);

  renderMessage = ({ item }) => {    
    return (    
    <ChatMessage
      isOwn={item.uid === this.state.userId}
      isSent={this.state.sendQueue.indexOf(item.id) < 0}
      text={item.message}
      time={item.time}
    />
  );}

  renderSectionDate = datestamp => <Text style={styles.sectionDate}>{Moment(datestamp).format('LL')}</Text>;

  renderSectionFooter = ({ section }) => this.renderSectionDate(section.title);

  render() {
    const { sections, stickyDate, toSend, sendQueue, isLoading, isStickyDateVisible, notification, message, temp_uid, sender_uid } = this.state;
    const { offset } = this.state
    
    return Platform.OS == "ios" ? (
      <View style={[styles.container, { marginBottom: offset }]}>
        {
          notification === null || temp_uid === sender_uid ?
          <View></View>:
          <RNModal
            transparent={true}
            onRequestClose={()=>{}}
            visible={true}>
            < View style={{ backgroundColor: palette[0] }}>
              <TouchableOpacity onPress={() => this.tapOnNotificationView(message.uid, message.name)}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{message.name}</Text>
                    <Text style={styles.time}>{message.message_time}</Text>
                </View>
                <Text style={styles.message}> {message.message}</Text>
              </TouchableOpacity>
            </View >
          </RNModal >
        }
        {isStickyDateVisible && (
          <View style={styles.sectionDateSticky}>
            {this.renderSectionDate(stickyDate)}
          </View>
        )}
        {/* {isLoading && <ActivityIndicator animate size="large" style={styles.loadingIndicator} />} */}
        <View style={styles.chat}>
          <SectionList
            sections={sections}
            extraData={sendQueue}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderMessage}
            renderSectionFooter={this.renderSectionFooter}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.01}
            onViewableItemsChanged={this.onViewableItemsChanged}
            onScrollBeginDrag={this.onScrollBegin}
            onScrollEndDrag={this.onScrollEnd}
            scrollEventThrottle={16}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            windowSize={50}
            removeClippedSubviews
            inverted
          />
        </View>
        <View style={styles.controls}>
          <ChatScreenInput value={toSend} onChangeText={this.onWrite} handleSubmit={this.onSubmit} />
          <Touchable onPress={this.onSubmit}>
            <Icon name="send" size={24} color={palette[0]} style={styles.sendButton} />
          </Touchable>
        </View>
      </View>
    ): (
      <View style={styles.container}>
       {
          notification === null || temp_uid === sender_uid ?
          <View></View>:
        <RNModal
          transparent={true}
          onRequestClose={()=>{}}
          visible={true}>
          < View style={{ backgroundColor: palette[0] }}>
            <TouchableOpacity onPress={() => this.tapOnNotificationView(message.uid, message.name)}>
              <View style={styles.titleView}>
                  <Text style={styles.title}>{message.name}</Text>
                  <Text style={styles.time}>{message.message_time}</Text>
              </View>
              <Text style={styles.message}> {message.message}</Text>
            </TouchableOpacity>
          </View >
        </RNModal >
        }
      {isStickyDateVisible && (
        <View style={styles.sectionDateSticky}>
          {this.renderSectionDate(stickyDate)}
        </View>
      )}
      {/* {isLoading && <ActivityIndicator animate size="large" style={styles.loadingIndicator} />} */}
      <View style={styles.chat}>
        
        <SectionList
          sections={sections}
          extraData={sendQueue}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderMessage}
          renderSectionFooter={this.renderSectionFooter}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.01}
          onViewableItemsChanged={this.onViewableItemsChanged}
          onScrollBeginDrag={this.onScrollBegin}
          onScrollEndDrag={this.onScrollEnd}
          scrollEventThrottle={16}
          initialNumToRender={50}
          maxToRenderPerBatch={50}
          windowSize={50}
          removeClippedSubviews
          inverted
        />
        
      </View>
      <View style={styles.controls}>
        <ChatScreenInput value={toSend} onChangeText={this.onWrite} handleSubmit={this.onSubmit} />
        <Touchable onPress={this.onSubmit}>
          <Icon name="send" size={24} color={palette[0]} style={styles.sendButton} />
        </Touchable>
      </View>
    </View>
    );
  }
}

export default ChatScreen;
