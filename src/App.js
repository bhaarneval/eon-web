import './App.less';
/* eslint-disable */

import React, { Component } from "react";
import logo from './logo.svg';
import { getClusters } from "./actions/commonActions";
import { connect } from "react-redux";

class App extends Component {

  UNSAFE_componentWillMount() {
    this.props.getClusters("1");
  }
  render() {
    console.log(this.props.data)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

const mapDispatchToProps = {
  getClusters: getClusters
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
