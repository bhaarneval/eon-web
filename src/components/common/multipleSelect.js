import { Select } from 'antd';
import React from "react";

function handleChange(value) {
  console.log(`selected ${value}`);
}

export function MultipleSelect() {
    return (
        <Select mode="tags" style={{ width: '100%' }} onChange={handleChange} tokenSeparators={[',']} />
    );
}

export default MultipleSelect;