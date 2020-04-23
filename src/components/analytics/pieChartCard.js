import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Card, Progress } from "antd";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChartCard(props) {
  const { analyticsData } = props;
  const {
    completed_events,
    cancelled_events,
    ongoing_events,
    total_events,
  } = analyticsData;
  const options = {
    animationEnabled: true,
    subtitles: [
      {
        text: `Total Events ${analyticsData.total_events}`,
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
        <CanvasJSChart options={options} />
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
          <div>{total_events!==0?Number((completed_events / total_events) * 100).toFixed(2)+"%":"0%"}</div>
        </div>
        <div className="progress-div-item">
          <div>Upcoming</div>
          <Progress
            percent={(ongoing_events / total_events) * 100}
            size="small"
            showInfo={false}
            strokeColor="orange"
          />
          <div>{total_events!==0?Number((ongoing_events / total_events) * 100).toFixed(2)+"%":"0%"}</div>
        </div>
        <div className="progress-div-item">
          <div>Cancelled</div>
          <Progress
            percent={(cancelled_events / total_events) * 100}
            size="small"
            showInfo={false}
            strokeColor="red"
          />
          
          <div>{total_events!==0?Number((cancelled_events / total_events) * 100).toFixed(2)+"%":"0%"}</div>
        </div>
      </div>
    </Card>
  );
}

PieChartCard.propTypes = {
  analyticsData: PropTypes.object.isRequired,
};
