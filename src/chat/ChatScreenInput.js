/** @module src/chat/ChatMessage */

import React, { Component } from 'react';
import { ScrollView, TextInput } from 'react-native';

import styles from './ChatScreenInput.styles';

/**
 * Component for chat message input field.
 * @extends Component
 */
class ChatScreenInput extends Component {
  constructor(props) {
    super(props);

    this.state = { initialHeight: 0, height: 0 };
  }

  onContentSizeChange = ({ nativeEvent }) => {
    const { height } = nativeEvent.contentSize;

    if (this.state.initialHeight === 0) this.setState({ initialHeight: height });

    this.setState({ height });
    this.scrollViewRef.scrollToEnd();
  };

  scrollViewRef = ScrollView;

  bindScrollViewRef = (ref) => {
    this.scrollViewRef = ref;
  };

  render() {    
    return (
      <ScrollView ref={this.bindScrollViewRef}>
        <TextInput
          // {...this.props}
          placeholder="Skriv inn tekst"
          style={[{ height: this.state.height }, styles.input]}
          multiline
          autoGrow={false}
          blurOnSubmit={true}
          underlineColorAndroid="transparent"
          underlineColoriOS="transparent"
          returnKeyType="send"
          autoCapitalize="sentences"
          onContentSizeChange={this.onContentSizeChange}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.handleSubmit}
        />
      </ScrollView>
    );
  }
}

export default ChatScreenInput;
