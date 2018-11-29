/** @module src/FCMClient */

import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
// import FCM, { FCMEvent } from 'react-native-fcm';
import {
  View,
  Modal as RNModal,
  Text,
  TouchableOpacity,
  StyleSheet,
  AppState
} from 'react-native';

import Toast from '@remobile/react-native-toast';
import chatService from './chat/chatService';
import navigationDispatcher from './navigationDispatcher';
import { palette } from './common/styles';
import Moment from 'moment';

/**
 * Component Firebase Cloud Messaging client.
 * @extends Component
 */
class ChatModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notification: null,
      message: null,
    }
  }

  componentDidMount() {
    chatService.addEventListener(chatService.onReceive, this.onReceive);
  }

  onReceive = (evt) => {
    const data = JSON.parse(evt.data)
    try {
      switch (data.type) {
        case 'history':
          
          break;
        case 'message':
          this.onMessageReceive(data);

          break;
        case 'success':
          
          break;
        default:
          break;
      }
    } catch (e) {
      Toast.show('Server error', 2000);
    } finally {
      
    }
  };

  onMessageReceive = (data) => {
    var cur_time = Moment().format('LT');
    const message = {
      id: data.id,
      uid: data.uid,
      name: data.name,
      message: data.text,
      time: 'asdf',
      message_time: cur_time,
      isRead: true
    };
    this.setState({ message: message });
    this.setState({ notification: true });
    setTimeout(() => {
        this.setState({ notification: null });
      }, 3000);
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


  render() {
    const { notification, message } = this.state;

    if (notification == null) {
      return null;
    } else {
      return <RNModal
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
  }
}

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
      },
      title: {
        paddingLeft: 8,
        paddingRight: 5,  
        paddingTop: 0,
        color: palette[2],
        fontSize: 19,
        textAlign: 'left'
      },
      time: {
        paddingRight: 10,
        color: palette[1],
        paddingTop: 0,
        fontSize: 12,
        textAlign: 'right'
      },
      message: {
        padding: 5,
        color: palette[1],
        fontSize: 14,
        textAlign: 'left'
      }
});


export default ChatModal;

// render() {
//   const { notification } = this.state;

//   if (notification == null) {
//     return null;
//   } else {

//     const notificationData = JSON.parse(notification.custom_notification);
//     const appData = JSON.parse(notification.app);

//     var date = new Date();
//     var hour = date.getHours();
//     var min = date.getMinutes();
//     var sec = date.getSeconds();
//     var curTime = hour + ":" + min + ":" + sec;

    //  return <Modal
    //   transparent={true}
    //   visible={true}>
    //   < View style={{ backgroundColor: palette[0] }}>
    //     <TouchableOpacity onPress={() => this.tapOnNotificationView(appData.uid, appData.name)}>
    //       <View style={styles.titleView}>
    //         <Text style={styles.title}>{notificationData.title}</Text>
    //         <Text style={styles.time}>{curTime}</Text>
    //       </View>
    //       <Text style={styles.message}> {notificationData.body}</Text>
    //     </TouchableOpacity>
    //   </View >
    // </Modal >

//   }
// }
// }

// const styles = StyleSheet.create({
// titleView: {
//   flexDirection: 'row',
//   width: '100%',
//   justifyContent: 'space-between'
// },
// title: {
//   paddingLeft: 8,
//   paddingRight: 5,  
//   paddingTop: 0,
//   color: palette[2],
//   fontSize: 19,
//   textAlign: 'left'
// },
// time: {
//   paddingRight: 10,
//   color: palette[1],
//   paddingTop: 0,
//   fontSize: 12,
//   textAlign: 'right'
// },
// message: {
//   padding: 5,
//   color: palette[1],
//   fontSize: 14,
//   textAlign: 'left'
// }
// });


// export default FCMClient;
