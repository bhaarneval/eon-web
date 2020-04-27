import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

/**
* @author
* @class 
**/

export default function StyledButtons (props) {
    const { content, onClick, type } = props;
  return(
    <Button
    style={{
      height: "3em",
      width: "3em",
      backgroundColor:'#262C6F'
    }}
    type="primary"
    htmlType={type}
    shape="circle"
    onClick = {onClick}
  >
    {content}
  </Button>
    )
 }


StyledButtons.propTypes = {
    content:PropTypes.element.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
}