import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { fetchCurrentUser } from "../redux/user/user.actions";
import { getAllChannels } from "../redux/channel/channel.actions";
import { useDispatch } from "react-redux";
import HomePage from "../pages/home-page";
import Login from "../pages/login-page";
import Register from "../pages/register-page";
import SlackPage from "../pages/slack-page";
import PrivateRoute from "../common/private-route";

// all components mount app so I can fetch data here
function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchCurrentUser(dispatch, history);
    getAllChannels(dispatch);
  }, [dispatch, history]);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/slack-app" component={SlackPage} />
    </Switch>
  );
}

export default App;
