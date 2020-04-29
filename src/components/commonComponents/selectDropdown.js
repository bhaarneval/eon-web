import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";

const { Option } = Select;

/*
 * dropdown for dashboard to filter event Type, fee type and event status
 */
export default function SelectDropDown (props) {
    const {optionsList, placeholder, handleChange, value, allOptionRequired} = props;
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
                optionsList && optionsList.map(option => {
                    return (
                        <Option className="capitalize" key={option.id} value = {option.id}>    
                            {option.type}
                        </Option>
                    )
                })
            }
            {allOptionRequired &&
                <Option className="capitalize" key='All' value = 'All'>    
                    {'All'}
                </Option>
            }
        </Select>
    )
}
SelectDropDown.propTypes = {
    optionsList:PropTypes.array.isRequired,
    placeholder:PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    allOptionRequired: PropTypes.bool
}

const styles = {
    body:{
        marginLeft:"1%",
        marginRight:"1%",
        width:"15%",
        textTransform: 'capitalize',
    }
}