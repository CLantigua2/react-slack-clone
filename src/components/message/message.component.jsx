import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import { Line } from "rc-progress";
import { connect } from "react-redux";
import { createLoadingSelector } from "../../redux/selectors";

const isOwnMessage = (message, user) => {
  return message.user.id === user.uid ? "message__self" : "";
};

const isImage = message => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user, progress }) => {
  if (progress === 100) {
    return (
      <Comment>
        <Comment.Avatar src={message.user.photoURL} />
        <Comment.Content className={isOwnMessage(message, user)}>
          <Comment.Author as="a">{message.user.name}</Comment.Author>
          <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
          {isImage(message) ? (
            <Image src={message.image} className="message__image" />
          ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    );
  } else {
  }
};

const loading = createLoadingSelector("PROGRESS");

const mapStateToProps = state => ({
  progressing: loading(state),
  progress: state.progress.progress
});

export default connect(mapStateToProps, null)(Message);
