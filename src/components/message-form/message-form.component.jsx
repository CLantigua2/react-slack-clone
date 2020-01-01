import React from "react";
import { Segment, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { addMessageAction } from "../../redux/message/messages.actions";
import { timestamp } from "../../firebase/firebase.utils";

class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    errors: []
  };

  componentDidUpdate(prevProps) {
    const { messages } = this.props;
    if (
      prevProps.messages.messages_adding_loading !==
      messages.messages_adding_loading
    ) {
      this.setState({ loading: messages.messages_adding_loading });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendMessage = e => {
    e.preventDefault();
    const { channels, currentUser, messages } = this.props;
    const { message, errors } = this.state;
    if (message) {
      // send message
      const newMessage = {
        timestamp: timestamp,
        content: message,
        user: {
          id: currentUser.id,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        }
      };
      this.props.addMessageAction(channels.individual_channel.id, newMessage);
      setInterval(() => {
        if (
          !messages.messages_adding_loading &&
          !messages.messages_adding_error.length
        ) {
          this.setState({ message: "" });
        }
      }, 500);
    } else {
      this.setState({
        errors: [...errors, "Add a message"]
      });
    }
  };
  render() {
    const { loading, errors, message } = this.state;
    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          value={message}
          labelPosition="left"
          placeholder="Write your message"
          onChange={this.handleChange}
          className={errors.some(err => err.includes("message")) ? "error" : ""}
        />

        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            loading={loading}
            disabled={loading}
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default connect(null, { addMessageAction })(MessageForm);
