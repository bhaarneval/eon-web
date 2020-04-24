import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Card } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function MonthWiseRevenue(props) {
  const { data } = props;
  console.log(data)

  const options = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Month wise revenu'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Revenue',
        data: data
    }]
  };

  return (
    <Card className="pie-card">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}

MonthWiseRevenue.propTypes = {
    data: PropTypes.object.isRequired,
};
