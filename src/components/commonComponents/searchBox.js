import React from "react";
import Proptypes from "prop-types";
import {Select} from "antd";    

import searchImg from '../../assets/Search.svg';

export default function SearchBox (props) {
    const {handleOnChange, placeholder} = props;
    return (
      <Select
        mode="multiple"
        size="large"
        style={{ width: "30%"}}
        notFoundContent={null}
        placeholder={placeholder}
        suffixIcon={<img src={searchImg}/>}
        onSearch={handleOnChange}
      />
    );

}
SearchBox.propTypes = {
    handleOnChange: Proptypes.func.isRequired,
    placeholder: Proptypes.string.isRequired,
}
