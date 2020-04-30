import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Card } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function MonthWiseStatusCount(props) {
  const { data } = props;

  const options = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Month wise event status counts'
    },
    credits: {
        enabled: false,
      },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        title: {
            text: 'Months'
        },
    },
    yAxis: {
        title: {
            text: 'Event Count'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: true
        }
    },
    series: [data[0], data[1], data[2]]
  };

  return (
    <Card className="graphs">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}

MonthWiseStatusCount.propTypes = {
    data: PropTypes.array.isRequired,
};
