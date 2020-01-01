import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import ColorPanel from "../../components/color-panel";
import SidePanel from "../../components/side-panel";
import Messages from "../../components/messages";
import MetaPanel from "../../components/meta-panel";

const SlackPage = ({ currentUser, channels }) => {
  return (
    <Grid columns="equal" className="app" style={{ background: "#eee" }}>
      <ColorPanel />
      <SidePanel
        key={currentUser && currentUser.uid}
        currentUser={currentUser}
        channels={channels.channels}
      />

      <Grid.Column style={{ marginLeft: 320 }}>
        <Messages currentUser={currentUser} channels={channels} />
      </Grid.Column>

      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  channels: state.channel
});

export default connect(mapStateToProps)(SlackPage);
