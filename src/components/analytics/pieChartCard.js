import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Card, Progress } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function PieChartCard(props) {
  const { analyticsData } = props;
  const {
    completed_events,
    cancelled_events,
    ongoing_events,
    total_events,
  } = analyticsData;
  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false,
      margin: [0, 0, 0, 0],
      spacingTop: 0,
      spacingBottom: 0,
      spacingLeft: 0,
      spacingRight: 0,
      height:250,
      type: "pie",
    },
    title: {
      text: `Total Events<br>${total_events}`,
      align: "center",
      verticalAlign: "middle",
      style: {
        color: "#0F58CB",
        fontSize: "16px",
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "{point.percentage:.1f}%",
    },
    accessibility: {
      point: null,
    },
    plotOptions: {
      series: {
        states: {
          inactive: {
            opacity: 1,
          },
        },
      },
      pie: {
        size: "100%",
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "pie",
        name: "Event Status",
        innerSize: "70%",
        data: [
          { name: "Ongoing", y: ongoing_events, color: "orange" },
          { name: "completed", y: completed_events, color: "green" },
          { name: "Cancelled", y: cancelled_events, color: "red" },
        ],
      },
    ],
  };

  return (
    <Card className="pie-card">
      <div className="revenue-heading">
        <b>Events Status</b>
      </div>
      <div className="pie-chart">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div className="progress-div">
        <div className="progress-div-item">
          <div>Completed</div>
          <Progress
            percent={(completed_events / total_events) * 100}
            size="small"
            showInfo={false}
            strokeColor="green"
          />
          <div>
            {total_events !== 0
              ? Number((completed_events / total_events) * 100).toFixed(2) + "%"
              : "0%"}
          </div>
        </div>
        <div className="progress-div-item">
          <div>Upcoming</div>
          <Progress
            percent={(ongoing_events / total_events) * 100}
            size="small"
            showInfo={false}
            strokeColor="orange"
          />
          <div>
            {total_events !== 0
              ? Number((ongoing_events / total_events) * 100).toFixed(2) + "%"
              : "0%"}
          </div>
        </div>
        <div className="progress-div-item">
          <div>Cancelled</div>
          <Progress
            percent={(cancelled_events / total_events) * 100}
            size="small"
            showInfo={false}
            strokeColor="red"
          />

          <div>
            {total_events !== 0
              ? Number((cancelled_events / total_events) * 100).toFixed(2) + "%"
              : "0%"}
          </div>
        </div>
      </div>
    </Card>
  );
}

PieChartCard.propTypes = {
  analyticsData: PropTypes.object.isRequired,
};
