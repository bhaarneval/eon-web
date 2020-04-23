import React from 'react'
import PropTypes from 'prop-types'
import "./analytics.css";
import {Card} from "antd";
import revenueImg from "../../assets/revenue.svg";



export default function RevenueCard(props) {
    const {revenueGenerated} = props;
  return(
        <Card className="revenue-card">
            <div className="revenue-heading"><b>Revenue Generated</b></div>
            <div className="revenue-value">
                <img src={revenueImg} style={{height:"100%", width:"20%"}}/>
                <div className="value-style ellipsis-style-analytics">₹ {revenueGenerated.toLocaleString()}</div>
            </div>
        </Card>
    )
 }


RevenueCard.propTypes = {
    revenueGenerated: PropTypes.number.isRequired,
}
 