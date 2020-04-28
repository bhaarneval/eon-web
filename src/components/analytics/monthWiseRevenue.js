import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Card } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function MonthWiseRevenue(props) {
  const { data } = props;

  const options = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Month wise revenue'
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
            text: 'Event count'
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
    series: [{
        name: 'Revenue',
        data: data
    }]
  };

  return (
    <Card className="graphs">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}

MonthWiseRevenue.propTypes = {
    data: PropTypes.array.isRequired,
};
