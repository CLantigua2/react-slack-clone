import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

const isOwnMessage = (message, user) => {
  return message.user.id === user.id ? "message__self" : "";
};

const timeFromNow = timestamp => moment(timestamp).fromNow();

const Message = ({ message, user }) => {
  return (
    <Comment>
      <Comment.Avatar src={message.user.photoURL} />
      <Comment.Content className={isOwnMessage(message, user)}>
        <Comment.Author as="a">{message.user.displayName}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        <Comment.Text>{message.content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Message;
