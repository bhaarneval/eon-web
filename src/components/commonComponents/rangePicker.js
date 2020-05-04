import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

/**
 * 
 * @param handleChange: to handle on date select
 * @param values: to sustain selected values 
 */
export default function StyledRangePicker (props) {
    const {handleChange, values} = props;
    return <RangePicker
            autofocus={true} 
            size="small"
            format = "DD/MM/YY"
            onChange={handleChange}
            value = {values.startDate !== ''?[moment(values.startDate,"YYYY-MM-DD"), moment(values.endDate,"YYYY-MM-DD")]:[null,null]}
        />;
}

StyledRangePicker.propTypes = {
    handleChange :PropTypes.func.isRequired,
    values: PropTypes.object,
}