import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import authService from "../../services/auth.service";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authService.getCurrentUser()) {
          const userName = authService.getCurrentUser().username;
          const email = authService.getCurrentUser().email;

          return (
            <Component {...props} user={{ userName: userName, email: email }} />
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedRoute;
