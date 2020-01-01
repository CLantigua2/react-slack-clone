import React from "react";
import UserPanel from "../user-panel/";
import Channels from "../channels/";
import { Menu } from "semantic-ui-react";

class SidePanel extends React.Component {
  render() {
    const { currentUser, channels } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser} channels={channels} />
      </Menu>
    );
  }
}

export default SidePanel;
