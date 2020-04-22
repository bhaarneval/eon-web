import React from "react";
// import PropTypes from "prop-types";
import "./analytics.css";
import { Card, Progress } from "antd";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChartCard() {
  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: "Total Events 756",
        verticalAlign: "center",
        fontSize: 16,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: false,
        dataPoints: [
          { name: "Upcoming", y: 5, color:"orange" },
          { name: "completed", y: 31, color:"green" },
          { name: "Cancelled", y: 40, color:"red" },
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
        <CanvasJSChart options={options} />
      </div>
      <div className="progress-div">
        <div className="progress-div-item">
            <div>Completed</div>
            <Progress percent={30} size="small" showInfo={false} strokeColor="green" />
            <div>30%</div>
        </div>
        <div className="progress-div-item">
            <div>Upcoming</div>
            <Progress percent={30} size="small" showInfo={false} strokeColor="orange" />
            <div>30%</div>
        </div>
        <div className="progress-div-item">
            <div>Cancelled</div>
            <Progress percent={30} size="small" showInfo={false} strokeColor="red"/>
            <div>30%</div>
        </div>
      </div>
    </Card>
  );
}

// PieChartCard.propTypes = {
//   revenueGenerated: PropTypes.number.isRequired,
// };
