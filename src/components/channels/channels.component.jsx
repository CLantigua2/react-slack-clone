import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  addChannelAction,
  getIndividualChannel
} from "../../redux/channel/channel.actions";
import { getMessagesAction } from "../../redux/message/messages.actions";

class Channels extends React.Component {
  state = {
    modal: false,
    channelName: "",
    channelDetails: "",
    firstLoad: true,
    activeChannel: ""
  };

  componentDidMount() {
    this.setFirstChannel();
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.state.activeChannel !== nextState.activeChannel) {
      this.props.getMessagesAction(this.state.activeChannel);
    }
  }

  setFirstChannel = () => {
    const firstChannel = this.props.channels[0];
    if (this.state.firstLoad && this.props.channels.length > 0) {
      this.props.getIndividualChannel(firstChannel);
      this.setActiveChannel(firstChannel);
    }
    this.setState({ firstLoad: false });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { channelDetails, channelName } = this.state;
    const { currentUser } = this.props;
    if (this.isFormValid(this.state)) {
      const newChannel = {
        name: channelName,
        details: channelDetails,
        createdBy: {
          name: currentUser.displayName,
          photoURL: currentUser.photoURL
        }
      };
      this.props.addChannelAction(newChannel);
      this.setState({ modal: false, channelDetails: "", channelName: "" });
    }
  };

  isFormValid = ({ channelName, channelDetails }) => {
    if (channelDetails && channelName) {
      return true;
    }
    return false;
  };

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.getIndividualChannel(channel);
  };

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));
  render() {
    const { modal } = this.state;
    const { channels } = this.props;
    return (
      <>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS{" "}
            </span>
            ({channels.length}){" "}
            <Icon
              name="add"
              onClick={this.openModal}
              style={{ cursor: "pointer" }}
            />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* // Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default connect(null, {
  addChannelAction,
  getIndividualChannel,
  getMessagesAction
})(Channels);
