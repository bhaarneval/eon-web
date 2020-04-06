
import { Button, InputNumber } from 'antd';
import React, { Component } from "react";
import PropTypes from "prop-types";

class FeeCalculation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: this.props.noOfSeats,
            totalAmountAfterPromo: 0,
            totalAmount: this.props.noOfSeats * this.props.perHeadAmount,
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
            totalAmountAfterPromo: this.state.totalAmount - (this.state.totalAmount * (this.props.discountPercentage/100))
        })
    }

    onChangeSeats = (event) => {
        console.log(event)
    }

    render() {
        return (
            <div className="detail-card">
                <Button type="primary" onClick={() => this.onIncDecSeats('dec')}>-</Button>
                    <InputNumber
                        min={1}
                        defaultValue={1}
                        onChange={event => this.onChangeSeats(event)}
                    />
                <Button type="primary" onClick={() => this.onIncDecSeats('inc')}>+</Button>
                Updated amount
                <InputNumber
                    min={1}
                    disabled
                    value={this.state.totalAmount}
                />
                <div>
                    Promotional Offers
                    <div>10% is available for you <Button type="primary" onClick={this.applyCode}>Apply</Button></div>
                    Total amount
                    {this.state.totalAmountAfterPromo}
                </div>
            </div>
        );
    }
 }


 FeeCalculation.propTypes = {
    noOfSeats:PropTypes.number,
    discountPercentage:PropTypes.number,
    perHeadAmount:PropTypes.number,
}

export default FeeCalculation;