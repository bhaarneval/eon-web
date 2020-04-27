import { Select } from 'antd';
import React from "react";

export function MultipleSelect() {
    return (
        <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
    );
}

export default MultipleSelect;