import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

export default function SelectDropDown (props) {
    const {optionsList, placeholder, handleChange, value} = props;
    return (
        <Select 
            placeholder={placeholder}
            onChange={handleChange}
            style={styles.body}
            showSearch={false}
            showArrow={true}
            value = {value!= "" ? value : placeholder}
        >
            {
                optionsList?optionsList.map(option => {
                    return (
                    <Option style={{'textTransform': 'capitalize'}} key={option.id} value = {option.id}>{option.type}</Option>
                    )
                }):null
            }
        </Select>
    )
}
SelectDropDown.propTypes = {
    optionsList:PropTypes.array.isRequired,
    placeholder:PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any,
}

const styles = {
    body:{
        marginLeft:"1%",
        marginRight:"1%",
        width:"15%",
        textTransform: 'capitalize',
    }
}