import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./dashboard.css";
import EventCards from "../../components/eventCards/eventCards";
import UserEventcards from "../../components/eventCards/userEventCards";

import { Row, Button, Spin, message, Checkbox } from "antd";
import SearchBox from "../../components/commonComponents/searchBox";
import SelectDropDown from "../../components/commonComponents/selectDropdown";
import StyledRangePicker from "../../components/commonComponents/rangePicker";
import { connect } from "react-redux";
import {
  fetchEvents,
  getEventData,
  setEventUpdate,
} from "../../actions/eventActions";
import BackButton from "../../components/commonComponents/backButton";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      spinning: true,
      isChecked: false,
      isWishlist: false,
      role: this.props.userRole,
    };
  }
  componentDidMount() {
    this.fetchEventsList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.eventList !== prevProps.eventList) {
      this.setState({
        eventList: this.props.eventList,
      });
    }
    if (prevProps.location.search !== this.props.location.search) {
      this.fetchEventsList();
    }
  }

  fetchEventsList = () => {
    const {
      fetchEvents,
      userData,
      accessToken,
      location: { search },
    } = this.props;
    let searchParam = new URLSearchParams(search);
    let type = searchParam.get("type");
    if (type !== "wishlist") {
      fetchEvents({ userData, accessToken });
      this.setState({
        isWishlist: false,
      });
    } else if (type === "wishlist") {
      fetchEvents({
        userData,
        accessToken,
        filterData: { is_wishlisted: "True" },
      });
      this.setState({
        isWishlist: true,
      });
    }
  };
  handleEventClick = (id) => {
    const { getEventData, accessToken, history, userRole } = this.props;
    getEventData({
      id,
      accessToken,
      userRole,
      callback: (error) => {
        if (!error) {
          history.push(`/event-details?id=${id}`);
        } else {
          message.error(error);
        }
      },
    });
  };

  spliceArray = (list) => {
    let splicedList = [];
    splicedList = list.reduce(
      (rows, key, index) =>
        (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
        rows,
      []
    );
    return splicedList.map((list, index) => {
      return (
        <Row key={index} className="cards-row">
          {list.map((event, index) => {
            return this.props.userRole === "organiser" ? (
              <EventCards
                history={this.props.history}
                key={index}
                event={event}
                onClick={this.handleEventClick}
              />
            ) : (
              <UserEventcards
                history={this.props.history}
                key={index}
                event={event}
                onClick={this.handleEventClick}
              />
            );
          })}
        </Row>
      );
    });
  };

  handleFilterChange = (value) => {
    const { fetchEvents, userData, accessToken } = this.props;
    fetchEvents({ userData, accessToken, filterData: { type: value } });
  };
  handleDateChange = (date, dateString) => {
    const { fetchEvents, userData, accessToken } = this.props;
    if (dateString[0] !== "" && dateString[1] != "") {
      const startDate = moment(dateString[0], "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      const endDate = moment(dateString[1], "DD-MM-YYYY").format("YYYY-MM-DD");
      fetchEvents({
        userData,
        accessToken,
        filterData: { startDate: startDate, endDate: endDate },
      });
    } else fetchEvents({ userData, accessToken });
  };
  handleCreateEvent = () => {
    this.props.history.push("create");
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const searchText = event.target.value;
      const { fetchEvents, userData, accessToken } = this.props;
      fetchEvents({
        userData,
        accessToken,
        filterData: { search: searchText },
      });
    }
  };
  handleCheckChange = () => {
    const { fetchEvents, userData, accessToken } = this.props;
    if (!this.state.isChecked) {
      fetchEvents({
        userData,
        accessToken,
        filterData: { event_created_by: "True" },
      });
    } else {
      fetchEvents({ userData, accessToken });
    }
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  goBack = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { eventList, isWishlist } = this.state;
    return (
      <Spin spinning={this.props.fetchingEvent} className="spinner-dashboard">
        <div className="sub-content">
          {!isWishlist ? (
            <div className="events-heading"> Event Management </div>
          ) : (
            <BackButton handleOnClick={this.goBack} text={"Wishlist"} />
          )}
          <div className="dashboard-actions-container">
            <div className="filters">
              <SearchBox
                handleOnChange={this.handleSearchTextChange}
                placeholder={"Event Name / Location"}
                handleKeyPress={this.handleKeyPress}
              />
              <SelectDropDown
                handleChange={this.handleFilterChange}
                optionsList={this.props.eventType}
                placeholder={"Event Type"}
              />
              <StyledRangePicker handleChange={this.handleDateChange} />
              {this.props.userRole === "organiser" &&
                <div className="checkbox-style">
                  <Checkbox
                    checked={this.state.isChecked}
                    onChange={this.handleCheckChange}
                    size="large"
                  >
                    Created By Me
                  </Checkbox>
                </div>
              }
            </div>
            {this.props.userRole === "organiser" && 
              <Button 
                type="primary"
                onClick={this.handleCreateEvent}
              >
                Create
              </Button>
            }
          </div>
          <div className="events-container-flex">
            {this.spliceArray(eventList)}
          </div>
        </div>
      </Spin>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  userRole: PropTypes.string,
  userData: PropTypes.object,
  eventList: PropTypes.array,
  accessToken: PropTypes.string,
  fetchEvents: PropTypes.func,
  fetchingEvent: PropTypes.bool,
  getEventData: PropTypes.func,
  eventType: PropTypes.array,
  setEventUpdate: PropTypes.func,
};

const mapStateToProps = ({
  userReducer: { userRole, userData, accessToken, eventType },
  eventReducer: { eventList, fetchingEvent },
}) => ({
  userRole,
  userData,
  accessToken,
  eventType,
  eventList,
  fetchingEvent,
});
const mapDispatchToProps = {
  fetchEvents: fetchEvents,
  getEventData: getEventData,
  setEventUpdate: setEventUpdate,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
