import React from "react";
import PropTypes from "prop-types";
import "./analytics.css";
import { Card } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export default function EventWiseRevenue(props) {
  const { data } = props;
  const {
    name_list,
    revenue_list
  } = data;

  const options = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Event wise revenue'
    },
    credits: {
      enabled: false,
    },
    xAxis: {
        categories: name_list,
        title: {
            text: 'Events'
        },
    },
    yAxis: {
        title: {
            text: 'Revenue'
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
        data: revenue_list
    }]
  };

  return (
    <Card className="graphs">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Card>
  );
}

EventWiseRevenue.propTypes = {
  data: PropTypes.object.isRequired,
};
