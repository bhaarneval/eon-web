import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd';

/**
* @author
* @class 
**/

export default function StyledButtons (props) {
    const { content, onClick } = props;
  return(
    <Button
    style={{
      height: "4em",
      width: "4em",
      backgroundColor:'#262C6F'
    }}
    type="primary"
    htmlType="submit"
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
}