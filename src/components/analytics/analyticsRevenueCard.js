import React from 'react'
import PropTypes from 'prop-types'
import "./analytics.css";
import {Card} from "antd";
import revenueImg from "../../assets/revenue.svg";



export default function RevenueCard(props) {
    const {revenueGenerated, header} = props;
  return(
        <Card className="revenue-card">
            <div><b>{header}</b></div>
            <div className="revenue-value">
                {header !== "Upcoming events" &&
                    <img src={revenueImg} style={{height:"100%", width:"15%"}}/>
                }
                <div className="value-style ellipsis-style-analytics">{revenueGenerated}</div>
            </div>
        </Card>
    )
 }


RevenueCard.propTypes = {
    revenueGenerated: PropTypes.string.isRequired,
    header: PropTypes.any
}
 