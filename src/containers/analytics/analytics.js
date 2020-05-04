import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./analyticsContainer.css";
import { Card, Button } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import RevenueCard from "../../components/analytics/analyticsRevenueCard";
import PieChartCard from "../../components/analytics/pieChartCard";
import TicketGraph from "../../components/analytics/ticketGraph";
import MonthWiseStatusCount from "../../components/analytics/monthWiseStatusCount";
import EventWiseRevenue from "../../components/analytics/eventWiseRevenue";
import MonthWiseRevenue from "../../components/analytics/monthWiseRevenue";
import SearchBox from "../../components/commonComponents/searchBox";
import SelectDropDown from "../../components/commonComponents/selectDropdown";
import { statusList } from "../../constants/constants";
import AnalyticsTable from "../../components/analytics/analyticsTable";
import { fetchAnalyticsData } from "../../actions/commonActions";

/**
 * container fo ranalytics dashboard
 * conatins different charts displayed
 * conatins the event table with informato=ion of revenue generated
 * different charts for different representation
 */
class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      analyticsData: "",
      status: "",
    };
  }

  componentDidMount() {
    if (this.props.userRole !== "subscriber") {
      this.fetchAnalytic();
    } else {
      this.props.history.push("/dashboard");
    }
  }

  //fetch analytics from database
  fetchAnalytic = () => {
    const { accessToken, fetchAnalyticsData } = this.props;
    const { searchText, status } = this.state;
    let filterData = {
      searchText: searchText != "" ? searchText : undefined,
      status: status !== "" ? status : undefined,
    };
    fetchAnalyticsData({
      accessToken,
      filterData: filterData,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.analyticsData !== prevProps.analyticsData) {
      this.setState({
        analyticsData: this.props.analyticsData,
      });
    }
  }

  //search with the provided search text on press of enter
  handleKeyPress = (event) => {
    const searchText = event.target.value;
    this.setState(
      {
        searchText: searchText,
      },
      () => {
        this.fetchAnalytic();
      }
    );
  };

  // handle search text change
  handleSearchTextChange = (event) => {
    this.setState({
      searchText: event.target.value,
    })
  }

  //handle dropdown filter change
  handleDropDownChange = (key) => {
    this.setState(
      {
        status: statusList[key]["type"],
      },
      () => {
        this.fetchAnalytic();
      }
    );
  };
  //to remove the applied filters
  removeFilters = () => {
    this.setState(
      {
        searchText: "",
        status: "",
      },
      () => this.fetchAnalytic()
    );
  };
  
  render() {
    const { searchText, status } = this.state;
    const { analyticsData } = this.props;
    return (
      <>
        {analyticsData.event_list && (
          <div className="analytics-container">
            <div  style={{height:"100%", boxSizing:"border-box", marginRight:"2%"}}>
              <div style={{ display: "flex" }}>
                <div className="side-cards">
                  <div className="revenue-row">
                    <RevenueCard
                      header="Revenue generated"
                      revenueGenerated={"₹" + analyticsData.total_revenue.toLocaleString()}
                    />
                    <RevenueCard
                      header="Upcoming events"
                      revenueGenerated={analyticsData.ongoing_events.toLocaleString()}
                    />
                  </div>
                  <div className="pie-chart-div">
                    <PieChartCard analyticsData={analyticsData} />
                  </div>
                </div>
                <div>
                  <Card className="table-card">
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          onClick={this.removeFilters}
                          style={{ marginRight: "1%" }}
                        >
                          <SyncOutlined />
                        </Button>
                        <SearchBox
                          handleOnChange={this.handleSearchTextChange}
                          placeholder={"Event Name / Location"}
                          handleKeyPress={this.handleKeyPress}
                          value={searchText}
                        />
                        <SelectDropDown
                          handleChange={this.handleDropDownChange}
                          optionsList={statusList}
                          placeholder={"Status"}
                          value={status !== "" ? status : "Status"}
                        />
                      </div>
                      <AnalyticsTable eventsList={analyticsData.event_list} />
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <div style={{marginTop:"1%"}}>
            <TicketGraph
              data={analyticsData && analyticsData.ticket_graph_object}
            />
            <EventWiseRevenue
              data={analyticsData && analyticsData.ticket_graph_object}
            />
            <MonthWiseStatusCount
              data={analyticsData && analyticsData.monthly_event_count}
            />
            <MonthWiseRevenue
              data={analyticsData && analyticsData.monthly_revenue}
            />
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = ({
  userReducer: { accessToken, userRole },
  analyticsReducer: { analyticsData },
}) => ({
  accessToken,
  userRole,
  analyticsData,
});
const mapDispatchToProps = {
  fetchAnalyticsData: fetchAnalyticsData,
};

Analytics.propTypes = {
  accessToken: PropTypes.string,
  fetchAnalyticsData: PropTypes.func,
  analyticsData: PropTypes.object,
  userRole: PropTypes.string,
  history: PropTypes.object,
};
export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
