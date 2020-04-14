
import { Button, } from 'antd';
import React, { Component } from "react";
import PropTypes from "prop-types";
import {NAME_REQUIRED, INVALID_BANK, BANK_REQUIRED, EXPIRY_REQUIRED} from '../../constants/messages';
import { Form, Input } from "antd";
import "./subscription.css";
import BackButton from "../commonComponents/backButton";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    onFinish = (data) => {
        console.log(data);
        this.props.onBankSubmit(data.accountno, data.expirydate);
    }

    handleClose = () => {
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className="detail-card">
                <BackButton handleOnClick={this.props.handleBackClick} text={"Payments"}/>
                <div className="subscription-container-payment" style={{justifyContent: 'center'}}>
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
                                    placeholder="Full Name"
                                />
                            </Form.Item>
                            <Form.Item
                                name="accountno"
                                rules={[{
                                    required: true,
                                    message: BANK_REQUIRED
                                },
                                {
                                    max: 16,
                                    min:16,
                                    message: INVALID_BANK
                                }]}
                            >
                                <Input
                                    placeholder="Account Number"
                                />
                            </Form.Item>
                            <Form.Item name="expirydate"
                                rules={[{
                                    required: true,
                                    message: EXPIRY_REQUIRED
                                }]}
                            >
                                <Input
                                    placeholder="Expiry Date (MM/YYYY)"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button style={{width: '100%'}} htmlType="submit" type="primary">Pay</Button>
                            </Form.Item>
                        </Form>
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
    handleBackClick: PropTypes.func,
    history: PropTypes.object
}

export default Payment;