import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "../messages-header";
import MessageForm from "../message-form";
import Message from "../message";
import { connect } from "react-redux";

class Messages extends React.Component {
  state = {
    rerender: 0,
    messages: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.messages.messages !== state.messages) {
      return { messages: props.messages.messages };
    } else {
      return null;
    }
  }
  componentDidUpdate(prevProps) {
    const {
      messages: { messages }
    } = this.props;
    if (prevProps.messages.messages !== messages) {
      this.updateRender();
    }
  }

  updateRender = () => {
    this.setState({
      messages: this.props.messages.messages
    });
  };

  renderMessages = messages => {
    let content;

    if (messages.length > 0) {
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
      content = <p>Hello</p>;
    }
    return content;
  };
  render() {
    const { currentUser, channels, messages } = this.props;

    return (
      <>
        <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">
            {this.state.messages ? (
              this.renderMessages(messages.messages)
            ) : (
              <p>Loading...</p>
            )}
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
