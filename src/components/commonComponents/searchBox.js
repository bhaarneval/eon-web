import React, {useState, useEffect} from "react";
import Proptypes from "prop-types";
import {Input} from "antd";    

import searchImg from '../../assets/Search.svg';

/*
 * search box for dashboard and analytics
 */
export default function SearchBox (props) {
    const {handleKeyPress, placeholder, value, handleOnChange} = props;
    let [currentValue, setValue] =useState(value);

    useEffect(() => {
      setValue(value)
    }, [value])

    return (
      <Input
        placeholder={placeholder}
        onPressEnter={(event) => handleKeyPress(event)}
        style={{ width: 200, zIndex: 1 }}
        prefix={<img src={searchImg}/>}
        allowClear={false}
        onChange = {handleOnChange}
        value={currentValue}
      />
    );

}
SearchBox.propTypes = {
    handleKeyPress: Proptypes.func.isRequired,
    placeholder: Proptypes.string.isRequired,
    value: Proptypes.string,
    handleOnChange: Proptypes.func,
}
