// @flow
import React , {Component} from 'react';



import { GiftedChat } from '../react-native-gifted-chat-0.13.0/GiftedChat'; // 0.3.0

import Fire from '../api/auth-api';



export default class Chat extends Component{



  state = {
    messages: [],
  };

  get user() {
    return {
      name: "test",
      _id: Fire.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    Fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    Fire.shared.off();
  }
}


