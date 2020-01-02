import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createLoadingSelector,
  createErrorMessageSelector
} from "../../redux/selectors";
import ColorPanel from "../../components/color-panel";
import SidePanel from "../../components/side-panel";
import Messages from "../../components/messages";
import MetaPanel from "../../components/meta-panel";
import WithSpinner from "../../common/with-spinner";

const SlackPage = ({ currentUser, channels, loading }) => {
  if (loading) {
    return <WithSpinner />;
  }
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

const loading = createLoadingSelector(["GET_CHANNEL"]);

const errors = createErrorMessageSelector(["GET_MESSAGES", "ADDING_MESSAGES"]);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  channels: state.channel,
  loading: loading(state)
  // errors: errors(state)
});

export default connect(mapStateToProps)(SlackPage);
