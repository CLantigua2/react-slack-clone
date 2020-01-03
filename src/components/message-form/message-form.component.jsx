import React from "react";
import uuidv4 from "uuid/v4";
import { Segment, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { addMessageAction } from "../../redux/message/messages.actions";
import { timestamp } from "../../firebase/firebase.utils";
import {
  createLoadingSelector,
  createErrorMessageSelector
} from "../../redux/selectors";
import FileModal from "../file-modal";
import { database, storage } from "../../firebase/firebase.utils";
import { moveProgress } from "../../redux/progress/progress.actions";

class MessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "",
      errors: [],
      modal: false,
      uploadState: "",
      uploadTask: null
    };
  }

  openModal = () => this.setState({ modal: true });
  closeModal = () => this.setState({ modal: false });

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createMessage = (fileUrl = null) => {
    const { currentUser } = this.props;
    const { message } = this.state;
    // send message
    const newMessage = {
      timestamp: timestamp,
      user: {
        id: currentUser.id,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL
      }
    };
    if (fileUrl !== null) {
      newMessage["image"] = fileUrl;
    } else {
      newMessage["content"] = message;
    }
    return newMessage;
  };

  sendMessage = e => {
    e.preventDefault();
    debugger;
    const { channels, loading, errors } = this.props;
    this.props.addMessageAction(
      channels.individual_channel.id,
      this.createMessage()
    );
    setTimeout(() => {
      if (!loading && !errors.length) {
        this.setState({ message: "" });
      }
    }, 500);
  };

  uploadFile = (file, metadata) => {
    const pathToUpload = this.props.channels.individual_channel.id;
    const ref = database.ref("messages");
    const filePath = `chat/public/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: storage
          .ref()
          .child(filePath)
          .put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.props.moveProgress(percentUploaded);
          },
          err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => {
                console.error(err);
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .child(pathToUpload)
      .push()
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: "done " });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err)
        });
      });
  };
  render() {
    const { loading, errors, message, modal } = this.state;
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
          // className={
          //   errors.some(error => error.message.includes("message"))
          //     ? "error"
          //     : ""
          // }
          onKeyPress={e => {
            if (e.key === "Enter") {
              this.sendMessage(e);
            }
          }}
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
            onClick={this.openModal}
          />
          <FileModal
            modal={modal}
            closeModal={this.closeModal}
            uploadFile={this.uploadFile}
          />
        </Button.Group>
      </Segment>
    );
  }
}

const loading = createLoadingSelector(["ADDING_MESSAGES"]);
const errors = createErrorMessageSelector(["ADDING_MESSAGES"]);
const mapStateToProps = state => ({
  loading: loading(state),
  errors: errors(state)
});

export default connect(mapStateToProps, { addMessageAction, moveProgress })(
  MessageForm
);
