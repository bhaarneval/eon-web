
import { Button, InputNumber } from 'antd';
import React, { Component } from "react";
import PropTypes from "prop-types";
import './subscription.css';

class FeeCalculation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: this.props.noOfSeats,
            totalAmountAfterPromo: this.props.noOfSeats * this.props.perHeadAmount,
            totalAmount: this.props.noOfSeats * this.props.perHeadAmount,
            codeApplied: false
        }
      }
      
      onIncDecSeats = (type) => {
          console.log(this.state.seats, this.props.perHeadAmount)
        if (type==='inc'){
            this.setState({
                seats : this.state.seats + 1,
                totalAmount: (this.state.seats + 1) * this.props.perHeadAmount
            })
        }
        else{
            this.setState({
                seats : this.state.seats - 1,
                totalAmount: (this.state.seats - 1) * this.props.perHeadAmount
            })
        }
    }
    
    applyCode = () => {
        this.setState({
            totalAmountAfterPromo: this.state.totalAmount - (this.state.totalAmount * (this.props.discountPercentage/100)),
            codeApplied: true
        })
    }

    onChangeSeats = (event) => {
        console.log(event)
    }

    render() {
        return (
            <div className="detail-card">
                <div className="subscription-container">
                    <div>
                        <Button type="primary" onClick={() => this.onIncDecSeats('dec')}>-</Button>
                            <InputNumber
                                min={1}
                                value={this.state.seats}
                                defaultValue={1}
                                onChange={event => this.onChangeSeats(event)}
                            />
                        <Button type="primary" onClick={() => this.onIncDecSeats('inc')}>+</Button>
                        <InputNumber
                            min={1}
                            disabled
                            value={this.state.codeApplied ? this.state.totalAmountAfterPromo : this.state.totalAmount}
                        />
                        <h3>Promotional offer</h3>
                        <div>10% discount available <Button disabled={this.state.codeApplied} type="primary" onClick={this.applyCode}>Appl{`${this.state.codeApplied ? 'ied!' : 'y'}`}</Button></div>
                    </div>
                    <div>
                        <h3>Breakdown details</h3>
                        <div>Total Amount : ₹{this.state.totalAmount}</div>
                        <div>Discount : - ₹{this.state.codeApplied && this.state.totalAmount * (this.props.discountPercentage/100)}</div>
                        <div>Amount payble: ₹{this.state.codeApplied ? this.state.totalAmountAfterPromo : this.state.totalAmount}</div>
                        <Button type="primary" onClick={() => this.props.payNow(this.state.seats, this.state.codeApplied ? this.state.totalAmountAfterPromo : this.state.totalAmount)}>Pay Now</Button>
                    </div>
                </div>
            </div>
        );
    }
 }


 FeeCalculation.propTypes = {
    noOfSeats:PropTypes.number,
    discountPercentage:PropTypes.number,
    perHeadAmount:PropTypes.number,
    payNow: PropTypes.func
}

export default FeeCalculation;