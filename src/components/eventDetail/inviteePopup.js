import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Modal, Button, InputNumber, Input} from 'antd';
import { EMAIL_VALIDATION } from "../../constants/constants";
const { TextArea } = Input;


class InviteesPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteeList: {},
            count: 0,
            message:'',
            emailError:''
        }
    }

    validateEmail(email){      
    var emailPattern = EMAIL_VALIDATION;
    return emailPattern.test(email); 
    } 

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            if(this.validateEmail(event.target.value)){
                let a = this.state.inviteeList
                a[this.state.count] = event.target.value
                if (new Set(Object.values(a)).size !== Object.values(a).length){
                    delete a[`${this.state.count}`];
                    this.setState({
                        emailError: 'Email already exists in the list',
                        inviteeList: a,
                    })
                    return
                }
                this.setState({
                    count: this.state.count + 1,
                    inviteeList: a,
                    message: ''
                })
            }
            else{
                this.setState({
                    emailError: 'Please enter a valid email address'
                })
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
        const { handleSend, handleClose, onDiscountChange } = this.props;
        return(
            <Modal
                visible
                onCancel = {handleClose}
                title = {<h1 className = 'modal-header'>Invitees List</h1>}
                footer = {null}
                width={660}
            >
                <div>
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
                        placeholder="Press Enter to add email id"
                        onChange={this.onChange}
                        onKeyPress={this.handleKeyPress} 
                    />
                    {this.state.emailError.length > 0 &&
                        <div className="error">{this.state.emailError}</div>
                    }
                    <div className='discount-row'>
                        <div className='discount-box'>
                            <div>Discount:</div>
                            <InputNumber
                                min={0}
                                size="large"
                                max={100}
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                onChange={onDiscountChange}
                            />
                        </div>
                        <div className='discount-box'>
                            <div>Updated Fee:</div>
                            <InputNumber
                                size="large"
                                value={200}
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className = 'send-button-row'>
                        <div className = 'send-button'>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="primary" onClick={() => handleSend(this.state.inviteeList)}>Send</Button>
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
}

export default InviteesPopup;
