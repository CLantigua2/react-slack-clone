import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "../messages-header";
import MessageForm from "../message-form";
import Message from "../message";
import { connect } from "react-redux";
// import { createLoadingSelector } from "../../redux/selectors";
import { getMessagesAction } from "../../redux/message/messages.actions";
// import WithSpinner from "../../common/with-spinner";

class Messages extends React.Component {
  render() {
    const { currentUser, channels, messages } = this.props;

    return (
      <>
        <MessagesHeader />
        <Segment>
          <Comment.Group className='messages'>
            {messages.messages.map(message => (
              <Message
                key={message.timestamp}
                message={message}
                user={message.user}
              />
            ))}
          </Comment.Group>
        </Segment>
        <MessageForm
          currentUser={currentUser}
          channels={channels}
          messages={messages}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    messages: state.messages,
    channel: state.channel.inidividual_channel
  };
};

export default connect(mapStateToProps, { getMessagesAction })(Messages);
