import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

export default function SelectDropDown (props) {
    const {optionsList,placeholder, handleChange} = props;
    return (
        <Select 
            placeholder={placeholder}
            onChange={handleChange}
            style={styles.body}
            showSearch={false}
            showArrow={true}
        >
            {
                optionsList?optionsList.map(option => {
                    return (
                    <Option key={option.id} value = {option.id}>{option.type}</Option>
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
}

const styles = {
    body:{
        width:"15%",
        marginLeft:"1%",
        marginRight:"1%",
        color:"#262C6F",
    }
}