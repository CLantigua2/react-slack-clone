import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import propTypes from "prop-types";
import WithSpinner from "../with-spinner";

const PrivateRoute = ({ component: Component, auth, loading, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <WithSpinner />
      ) : auth.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
