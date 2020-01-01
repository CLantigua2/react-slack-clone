import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "../messages-header";
import MessageForm from "../message-form";
import Message from "../message";
import { connect } from "react-redux";
import { getMessagesAction } from "../../redux/message/messages.actions";

class Messages extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      messages: { messages }
    } = this.props;
    if (prevProps.messages.messages !== messages) {
      this.renderMessages(messages);
    }
  }
  renderMessages = messages => {
    if (messages.length) {
      messages.map(message => {
        console.log("HIIIII!!!: ", message);
        return (
          <Message
            key={message.timestamp}
            message={message}
            user={this.props.currentUser}
          />
        );
      });
    } else {
      return null;
    }
  };
  render() {
    const { currentUser, channels, messages } = this.props;

    return (
      <>
        <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">
            {this.renderMessages(messages.messages)}
          </Comment.Group>
        </Segment>
        <MessageForm
          currentUser={currentUser}
          channels={channels}
          messages={this.props.messages}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps, null)(Messages);
