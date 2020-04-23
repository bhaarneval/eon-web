import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./analyticsContainer.css";
import { Card, Button } from "antd";
import {SyncOutlined} from "@ant-design/icons";
import RevenueCard from "../../components/analytics/analyticsRevenueCard";
import PieChartCard from "../../components/analytics/pieChartCard";
import SearchBox from "../../components/commonComponents/searchBox";
import SelectDropDown from "../../components/commonComponents/selectDropdown";
import { statusList } from "../../constants/constants";
import AnalyticsTable from "../../components/analytics/analyticsTable";
import { fetchAnalyticsData } from "../../actions/commonActions";

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
   if(this.props.userRole !== "subscriber") {
      this.fetchAnalytic();
   }
  }

  fetchAnalytic = () => {
    const { accessToken, fetchAnalyticsData } = this.props;
    const {searchText, status} = this.state;
    let filterData = {
        searchText: searchText!=""?searchText:undefined,
        status: (status!=="")?status:undefined
    }
    fetchAnalyticsData({
      accessToken,
      filterData: filterData,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.analyticsData !== prevProps.analyticsData) {
      this.setState({
        analyticsData: this.props.analyticsData,
      });
    }
  }

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

  handleDropDownChange = (key) => {
    this.setState(
        {
          status: statusList[key]['type'],
        },
        () => {
          this.fetchAnalytic();
        }
      );
  }
  removeFilters = () => {
      this.setState({
          searchText: "",
          status: ""
    }, () => this.fetchAnalytic());
  }
  render() {
    const { searchText, status } = this.state;
    const { analyticsData } = this.props;
    return (
      <>
        {
            analyticsData.event_list && (
                <div className="analytics-container">
          <div className="side-cards">
            <RevenueCard revenueGenerated={analyticsData.total_revenue} />
            <div className="pie-chart-div">
              <PieChartCard analyticsData={analyticsData} />
            </div>
          </div>
          <Card className="table-card">
            <div style={{ width: "100%" }}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button onClick={this.removeFilters} style={{marginRight:"1%"}}><SyncOutlined /></Button>
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
                  value={status!==""?status:"Status"}
                />
              </div>
              <AnalyticsTable  eventsList = {analyticsData.event_list}/>
            </div>
          </Card>
        </div>
            )
        }
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
};
export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
