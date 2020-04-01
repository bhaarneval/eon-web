import React from 'react'
import PropTypes from 'prop-types'
import {Modal, Checkbox, Button} from 'antd';

export default function TermsAndConditions (props){
    const { handleAccept, isChecked, handleClose, handleCheckChange } = props;
 
  return(
   <Modal
   visible
    onCancel = {handleClose}
    title = {<h1 style = {{textAlign:'center', color: '#262C6F'}}>Terms & Conditions</h1>}
    footer = {null}
   >
    <div>hello world!</div>
    <div>
        <Checkbox checked = {isChecked} onChange={handleCheckChange}>I hereby agree with the terms and conditions</Checkbox>
        <Button style = {{backgroundColor:'#262C6F', color:'#ffffff'}} onClick = {handleAccept}>Accept</Button>
    </div>
   </Modal>
    )
 }

TermsAndConditions.propTypes = {
    handleAccept: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleCheckChange: PropTypes.func.isRequired
}