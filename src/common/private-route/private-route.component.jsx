import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import WithSpinner from "../with-spinner";
import {
  createLoadingSelector,
  createErrorMessageSelector
} from "../../redux/selectors";

const PrivateRoute = ({ component: Component, loading, auth, ...rest }) => {
  return loading ? (
    <WithSpinner />
  ) : (
    <Route
      {...rest}
      render={props =>
        auth.currentUser && auth.currentUser.token ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired
};

const loadingSelector = createLoadingSelector([
  "GET_CURRENT_USER",
  "GET_CHANNEL"
]);

const errorSelector = createErrorMessageSelector([
  "GET_CURRENT_USER",
  "GET_CHANNEL"
]);
const mapStateToProps = state => {
  return {
    auth: state.user,
    loading: loadingSelector(state),
    error: errorSelector(state)
  };
};

export default connect(mapStateToProps)(PrivateRoute);
