import "./layout.css";
/* eslint-disable */
import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../../components/login/login";
import Navbar from "../../components/nav/navbar";
import App from "../../App";

function StyledComp() {
  return (
    <div>
      <div className="flex flex-row layoutContainer">
        <div className="mainContentContainer">
          <Navbar />
          <div className="contentBody">
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={App} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

class LayoutComponent extends React.Component {
  render() {
    return <StyledComp />;
  }
}

export default LayoutComponent;
