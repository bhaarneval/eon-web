import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import EventInfo from "../../components/eventDetail/eventInfo";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: []
    };
  }

  render() {
    return (
      <div className="sub-content">
        <div className="events-heading"> Event detail </div>
        <EventInfo/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object
};

export default Dashboard;
