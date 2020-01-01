import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { fetchCurrentUser } from "../redux/user/user.actions";
import { getAllChannels } from "../redux/channel/channel.actions";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "../pages/home-page";
import Login from "../pages/login-page";
import Register from "../pages/register-page";
import SlackPage from "../pages/slack-page";
import WithSpinner from "../common/with-spinner";
import PrivateRoute from "../common/private-route";
import { createLoadingSelector } from "../redux/loading/loading.selectors";

// all components mount app so I can fetch data here
function App() {
  const { currentUser } = useSelector(state => state.user);
  const { channels } = useSelector(state => state.channel);
  const { messages } = useSelector(state => state.messages);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = createLoadingSelector([
    "FETCHING_CHANNEL",
    "FETCH_CURRENT_USER"
  ])(state);

  useEffect(() => {
    fetchCurrentUser(dispatch, history);
  }, [dispatch, history]);

  useEffect(() => {
    getAllChannels(dispatch);
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/slack-app" component={SlackPage} loading={loading} />
    </Switch>
  );
}

export default App;
