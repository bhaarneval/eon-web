import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function StyledRangePicker (props) {
    const {handleChange} = props;
    return <RangePicker
         autofocus={true} 
         size="small"
         format = "DD-MM-YY"
         onChange={handleChange}
         style={{width:"25%"}}
         disabledDate={current => {
            return current && current < moment().startOf("day");
          }}
         />;
}

StyledRangePicker.propTypes = {
    handleChange :PropTypes.func.isRequired,
}