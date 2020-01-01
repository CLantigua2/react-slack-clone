import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "../messages-header";
import MessageForm from "../message-form";
import Message from "../message";
import { connect } from "react-redux";
import { getMessagesAction } from "../../redux/message/messages.actions";

class Messages extends React.Component {
  renderMessages = messages => {
    console.log("MESSAGES: ", messages);

    let content;
    if (messages) {
      content = messages.map(message => {
        return (
          <Message
            key={message.timestamp}
            message={message}
            user={this.props.currentUser}
          />
        );
      });
    } else {
      content = null;
    }
    console.log("CONTENT: ", content);
    return content;
  };
  render() {
    const { currentUser, channels, messages } = this.props;

    return (
      <>
        <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">
            {messages.messages.length > 0 &&
              this.renderMessages(messages.messages)}
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
