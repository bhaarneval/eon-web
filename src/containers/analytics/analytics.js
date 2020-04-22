import React, { Component } from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import "./analyticsContainer.css";
import {Card} from "antd";
import RevenueCard from "../../components/analytics/analyticsRevenueCard";
import PieChartCard from "../../components/analytics/pieChartCard";
import SearchBox from "../../components/commonComponents/searchBox";
import SelectDropDown from "../../components/commonComponents/selectDropdown";
import { statusList } from "../../constants/constants";
import AnalyticsTable from "../../components/analytics/analyticsTable";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
  }

  handleKeyPress = (event) => {
    const searchText = event.target.value;
    this.setState(
      {
        searchText: searchText,
      },
      () => {
        this.applyFilters();
      }
    );
  };
  render() {
    const { searchText } = this.state;
    return (
      <div className="analytics-container">
        <div className="side-cards">
          <RevenueCard revenueGenerated={120000} />
          <div className="pie-chart-div">
            <PieChartCard revenueGenerated={1212000} />
          </div>
        </div>
        <Card className="table-card">
          <div style={{ width: "100%", }}>
            <div style={{ width: "100%", display: "flex", justifyContent:"flex-start" }}>
              <SearchBox
                handleOnChange={this.handleSearchTextChange}
                placeholder={"Event Name"}
                handleKeyPress={this.handleKeyPress}
                value={searchText}
              />
              <SelectDropDown
                handleChange={(key) => {
                  console.log(key);
                }}
                optionsList={statusList}
                placeholder={"Status"}
                value={this.state.statusType}
              />
            </div>
            <AnalyticsTable />
          </div>
        </Card>
      </div>
    );
  }
}
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
const mapDispatchToProps = {};

// Analytics.propTypes = {}
export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
