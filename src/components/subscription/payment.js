
import { Button, Modal } from 'antd';
import React, { Component } from "react";
import PropTypes from "prop-types";
import userImg from '../../assets/user.svg';
import {NAME_REQUIRED, INVALID_CONATCT, CONTACT_NO} from '../../constants/messages';
import {ACCOUNT_VALIDATION} from '../../constants/constants';
import { Form, Input } from "antd";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onFinish = (data) => {
        console.log(data);
        this.props.onBankSubmit('111', '11', '1')
    }

    handleClose = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className="detail-card">
                <div className="subscription-container" style={{justifyContent: 'center'}}>
                    <div className="subscription-payment">
                        <h3>Bank details</h3>
                        <Form
                            className="form-main"
                            name="bankDetails"
                            onFinish={this.onFinish}
                            layout="vertical"
                        >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: NAME_REQUIRED }]}
                            >
                                <Input
                                    prefix={<img src={userImg} />}
                                    placeholder="Name"
                                />
                            </Form.Item>
                            <Form.Item
                                name="accountno"
                                rules={[{
                                    required: true,
                                    message: CONTACT_NO
                                },
                                {
                                    pattern: ACCOUNT_VALIDATION,
                                    max: 16,
                                    min:16,
                                    message: INVALID_CONATCT
                                }]}
                            >
                                <Input
                                    prefix={<img src={userImg} />}
                                    placeholder="Account no"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    name="expirydate"
                                    prefix={<img src={userImg} />}
                                    placeholder="Expiry Date (MM/YYYY)"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{width: '100%'}} htmlType="submit" type="primary">Pay</Button>
                            </Form.Item>
                        </Form>
                        <Modal
                            visible={this.props.showPaymentSuccess}
                            onCancel = {this.handleClose}
                            title = {<div className = 'modal-header'>Payment successful</div>}
                            footer = {null}
                            width={300}
                        >
                            <Button onClick={this.handleClose}>
                                Okay
                            </Button>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
 }


 Payment.propTypes = {
    noOfSeats:PropTypes.number,
    discountPercentage:PropTypes.number,
    perHeadAmount:PropTypes.number,
    onBankSubmit: PropTypes.func,
    showPaymentSuccess: PropTypes.Boolean,
    history: PropTypes.object
}

export default Payment;