import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Modal, Button, InputNumber, Input} from 'antd';
import { EMAIL_VALIDATION } from "../../constants/constants";
const { TextArea } = Input;


class InviteesPopup extends Component {
    constructor(props) {
        super(props);
        const {eventData} =this.props;
        this.state = {
            inviteeList: {},
            count: 0,
            message:'',
            emailError:'',
            amount: eventData.subscription_fee,
        }
    }

    validateEmail(email){      
        var emailPattern = EMAIL_VALIDATION;
        return emailPattern.test(email); 
    } 

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            const count = this.state.count;
            event.preventDefault();
            const emailList = event.target.value.split(',')
            if ((emailList.length + Object.keys(this.state.inviteeList).length) > 10){
                this.setState({
                    emailError: 'Please enter 10 email ids only at a time.'
                })
                return;
            }
            for (var i = 0; i < emailList.length; i++){
                if(this.validateEmail(emailList[i].trim())){
                    let a = this.state.inviteeList
                    a[count === 0 ? i : parseInt(Object.keys(this.state.inviteeList)[Object.keys(this.state.inviteeList).length - 1]) + 1 + i] = emailList[i].trim()
                    this.setState({
                        count: count + 1,
                        inviteeList: a,
                        message: ''
                    })
                }
                else{
                    this.setState({
                        emailError: 'Please enter a valid email address'
                    })
                    break;
                }
            }
        }
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value,
            emailError: ''
        })
    }

    onDelete = (key) => {
        let a =this.state.inviteeList;
        delete a[`${key}`];
        this.setState({
            inviteeList: a,
        })
    }

    render(){
        const { handleSend, handleClose, onDiscountChange, discountPercentage } = this.props;
        let amount = this.state.amount-((this.state.amount*discountPercentage)/100);
        return(
            <Modal
                visible
                onCancel = {handleClose}
                title = {<div className = 'modal-header'>Add Invitees</div>}
                footer = {null}
                width={660}
            >
                <div>
                    <div className="warning">Max 10 email ids at a time.</div>
                    <div className="warning">Please hit enter to add the email to the invitee list.</div>
                    <div className="email-row">
                        {Object.keys(this.state.inviteeList).map((key) => {
                            return <span className="email" id={key} key={key}>  {this.state.inviteeList[key]} 
                                <span onClick={() => this.onDelete(key)} className="delete-mark">x</span>
                            </span> 
                        })}
                    </div>
                    Enter Invitee&apos;s Email ID
                    <TextArea 
                        value={this.state.message.length > 0 && this.state.message} 
                        rows={1} 
                        disabled={Object.keys(this.state.inviteeList).length > 10}
                        placeholder="Press Enter to add email id"
                        onChange={this.onChange}
                        onKeyPress={this.handleKeyPress} 
                    />
                    {this.state.emailError.length > 0 &&
                        <div className="error-message">{this.state.emailError}</div>
                    }
                    <div className='discount-row'>
                        <div className='discount-box'>
                            <div>Discount:</div>
                            <InputNumber
                                min={0}
                                size="large"
                                max={100}
                                value={discountPercentage}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                onChange={onDiscountChange}
                            />
                        </div>
                        <div className='discount-box'>
                            <div>Updated Fee:</div>
                            <InputNumber
                                size="large"
                                value={amount}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className = 'send-button-row'>
                        <div className = 'send-button'>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="primary" disabled={Object.keys(this.state.inviteeList).length ==0} onClick={() => handleSend(this.state.inviteeList)}>Send</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
 }
 InviteesPopup.propTypes = {
    handleSend: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    onDiscountChange: PropTypes.func.isRequired,
    eventData: PropTypes.object,
    discountPercentage: PropTypes.number,
}

export default InviteesPopup;
