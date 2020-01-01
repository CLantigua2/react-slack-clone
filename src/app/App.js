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

// all components mount app so I can fetch data here
function App() {
  const { currentUser } = useSelector(state => state.user);
  const { channels } = useSelector(state => state.channel);
  const { messages } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchCurrentUser(dispatch, history);
  }, [dispatch, history]);

  useEffect(() => {
    getAllChannels(dispatch);
  }, [dispatch]);

  return currentUser && channels ? (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/slack-app" component={SlackPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  ) : (
    <WithSpinner />
  );
}

export default App;
