import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "../messages-header";
import MessageForm from "../message-form";
import Message from "../message";
import { connect } from "react-redux";
import { createLoadingSelector } from "../../redux/selectors";
import { getMessagesAction } from "../../redux/message/messages.actions";
import WithSpinner from "../../common/with-spinner";

class Messages extends React.Component {
  state = {
    rerender: 0,
    messages: []
  };

  componentDidMount() {
    this.setTimer();
  }

  setTimer = () => {
    if (this.timerHandle) {
      return;
    }
    this.timerHandle = setTimeout(() => {
      this.setState(prev => ({ rerender: prev.rerender + 1 }));
      this.timerHandle = 0;
    }, 500);
  };

  clearTimer = () => {
    if (this.timerHandle) {
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.loading !== this.props.loading) {
      console.log("TRUE 19");
      if (!this.props.loading) {
        console.log("TRUE 21");
        this.setState(prev => ({ rerender: prev.rerender + 1 }));
        if (this.props.messages.messages !== prevState.messages.messages) {
          console.log("TRUE 23");
          console.log("PROPS: ", this.props.messages.messages);
          this.setState({ messages: this.props.messages.messages });
        }
      }
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  renderMessages = messages => {
    // console.log("MESSAGES: ", messages);
    let content;
    if (messages.length > 0) {
      content = messages.map(message => {
        return (
          <Message
            rerender={this.state.rerender}
            key={message.timestamp}
            message={message}
            user={message.user}
          />
        );
      });
    } else if (messages.length === 0) {
      content = <p>No comments</p>;
    } else if (this.props.loading) {
      content = <WithSpinner />;
    }
    return content;
  };

  render() {
    const { currentUser, channels } = this.props;
    const { messages } = this.state;
    console.log(messages);
    return (
      <>
        <MessagesHeader />
        <Segment>
          <Comment.Group className="messages">
            {this.renderMessages(messages || this.props.messages.messages)}
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

const loading = createLoadingSelector(["GET_CHANNEL", "GET_MESSAGES"]);

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    messages: state.messages,
    loading: loading(state),
    channel: state.channel.inidividual_channel
  };
};

export default connect(mapStateToProps, { getMessagesAction })(Messages);
