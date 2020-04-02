import React, { Component } from "react";
import PropTypes from "prop-types";
import "./dashboard.css";
import EventCards from "../../components/eventCards/Eventcards";

import { dummyList } from "../../constants/constants";
import { Row } from "antd";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: []
    };
  }

  spliceArray = list => {

    let splicedList = [];
    splicedList = list.reduce(
      (rows, key, index) =>
        (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
        rows,
      []
    );
    return splicedList.map((list,index) => {
      return (
        <Row key={index} className="cards-row">
          {list.map((event, index) => {
            return <EventCards key={index} event={event} />;
          })}
        </Row>
      );
    })
  };

  render() {
    const list = dummyList
    
    return (
      <>
        <div className="events-heading"> Events Management </div>
        <div className="events-container-flex">
          {this.spliceArray(list)}
        </div>
      </>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object
};

export default Dashboard;
