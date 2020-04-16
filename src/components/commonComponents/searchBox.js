import React, {useState, useEffect} from "react";
import Proptypes from "prop-types";
import {Input} from "antd";    

import searchImg from '../../assets/Search.svg';

export default function SearchBox (props) {
    const {handleKeyPress, placeholder, value} = props;
    let [currentValue, setValue] =useState(value);

    useEffect(() => {
      setValue(value)
    }, [value])

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
      <Input
        placeholder={placeholder}
        onPressEnter={(event) => handleKeyPress(event)}
        style={{ width: 200, zIndex: 1 }}
        prefix={<img src={searchImg}/>}
        allowClear={true}
        onChange = {handleChange}
        value={currentValue}
      />
    );

}
SearchBox.propTypes = {
    handleKeyPress: Proptypes.func.isRequired,
    placeholder: Proptypes.string.isRequired,
    value: Proptypes.string,
}
