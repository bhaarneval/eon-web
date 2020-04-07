import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import "./dashboard.css";
import EventCards from "../../components/eventCards/eventCards";
import UserEventcards from "../../components/eventCards/userEventCards";

import { dummyList } from "../../constants/constants";
import { Row, Button } from "antd";
import SearchBox from '../../components/commonComponents/searchBox';
import SelectDropDown from "../../components/commonComponents/selectDropdown";
import StyledRangePicker from "../../components/commonComponents/rangePicker";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList:dummyList,
      eventsList: dummyList,
      role:"user"
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
            return this.state.role === "organiser" ? (
              <EventCards
                history={this.props.history}
                key={index}
                event={event}
              />
            ) : (
              <UserEventcards
                history={this.props.history}
                key={index}
                event={event}
              />
            );
          })}
        </Row>
      );
    })
  };
  filterList = (filterType,filterValue) => {
    let eventList = this.state.eventList;
    switch (filterType) {
      case "location":
        if(filterValue==="")
          break;
        eventList = eventList.filter(event => {
          return event.eventLocation === filterValue || event.name === filterValue;
        });
        break;
        case "type":
        eventList = eventList.filter(event => {
          return event.type === filterValue;
        });
        break;
        case "date":
        eventList = eventList.filter(event => {
          return event.eventDate >= filterValue.startDate && event.eventDate <= filterValue.endDate;
        });
        break;
      default:
        console.error("Something wrong in dashboard filter");
        break;
    }
    this.setState({
      eventsList:eventList
    })
  }
  handleSearchTextChange = (value) => {
    this.filterList("location",value);
  }
  handleFilterChange = (value) => {
    this.filterList("type",value);
  }
  handleDateChange = (date, dateString) => {
    const startDate=moment(dateString[0]).format("DD-MM-YYYY");
    const endDate = moment(dateString[1]).format("DD-MM-YYYY");
    this.filterList("date",{startDate,endDate});
  }
  handleCreateEvent =() => {
    this.props.history.push("create");
  }

  render() {
    const optionsList = ["Cultural","Tech","Fashion","Painting"];
    let eventsList = this.state.eventList;
    let search = new URLSearchParams(this.props.location.search);
    let type = search.get("type");
    if(type == "wishlist"){
      eventsList = dummyList.splice(3,5);
    }
    else {
      eventsList = this.state.eventsList;
    }
    return (
      <div className="sub-content">
        <div className="events-heading"> Event Management </div>
        <div className="dashboard-actions-container">
          <div className="filters">
            <SearchBox handleOnChange={this.handleSearchTextChange} placeholder={"Event Name / Location"}/>
            <SelectDropDown handleChange={this.handleFilterChange} optionsList={optionsList} placeholder = {"Event Type"}/>
            <StyledRangePicker handleChange = {this.handleDateChange} />
          </div>
          <Button
            onClick={this.handleCreateEvent}
            className="button-create"
          >Create</Button>
        </div>
        <div className="events-container-flex">{this.spliceArray(eventsList)}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default Dashboard;
