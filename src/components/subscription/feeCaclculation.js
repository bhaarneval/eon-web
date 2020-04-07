import { Button, InputNumber } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./subscription.css";
import PDF from "../commonComponents/ticketPdf";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

class FeeCalculation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: this.props.noOfSeats,
      totalAmountAfterPromo: this.props.noOfSeats * this.props.perHeadAmount,
      totalAmount: this.props.noOfSeats * this.props.perHeadAmount,
      codeApplied: false,
      isSubscribed: false,
    };
  }

  onIncDecSeats = (type) => {
    console.log(this.state.seats, this.props.perHeadAmount);
    if (type === "inc") {
      let totalAmount = (this.state.seats + 1) * this.props.perHeadAmount;
      if (this.state.codeApplied) {
        totalAmount =
          totalAmount - totalAmount * (this.props.discountPercentage / 100);
      }
      this.setState({
        seats: this.state.seats + 1,
        totalAmount: (this.state.seats + 1) * this.props.perHeadAmount,
        totalAmountAfterPromo: this.state.codeApplied
          ? totalAmount
          : this.state.totalAmountAfterPromo,
      });
    } else {
      let totalAmount = (this.state.seats + 1) * this.props.perHeadAmount;
      if (this.state.codeApplied) {
        totalAmount =
          totalAmount - totalAmount * (this.props.discountPercentage / 100);
      }
      this.setState({
        seats: this.state.seats - 1,
        totalAmount: (this.state.seats - 1) * this.props.perHeadAmount,
        totalAmountAfterPromo: this.state.codeApplied
          ? totalAmount
          : this.state.totalAmountAfterPromo,
      });
    }
  };

  applyCode = () => {
    this.setState({
      totalAmountAfterPromo:
        this.state.totalAmount -
        this.state.totalAmount * (this.props.discountPercentage / 100),
      codeApplied: true,
    });
  };

  render() {
    return (
      <div>
        <div className="detail-card">
          <div className="subscription-container">
            <div className="subscription-left">
              <div className="subscription-seats borderBottom">
                <MinusCircleOutlined
                  style={{ fontSize: "200%", color: "#262C6F" }}
                  onClick={() =>
                    this.state.seats !== 1 ? this.onIncDecSeats("dec") : null
                  }
                />
                <div style = {{fontSize:"150%"}}><b>{this.state.seats}</b></div>
                <PlusCircleOutlined
                  style={{ fontSize: "200%", color: "#262C6F" }}
                  onClick={() => this.onIncDecSeats("inc")}
                />
                <InputNumber
                  min={1}
                  disabled
                  value={this.props.perHeadAmount!==0?"₹ " + this.state.totalAmount:"       -"}
                  style={{
                    color: "#262C6F",
                    backgroundColor: "#ffffff",
                    border: "1px solid #262C6F",
                    fontSize: "15px",
                    fontWeight:"bold"
                  }}
                />
              </div>
              {this.props.perHeadAmount !== 0 && !this.state.isSubscribed ? (
                <div>
                  <h3>
                    <b>Promotional offer</b>
                  </h3>
                  <div className="subscription-seats subscription-discount">
                    10% discount available{" "}
                    <Button
                      disabled={this.state.codeApplied}
                      type="primary"
                      shape="round"
                      style={{
                        backgroundColor: "green",
                        border: "none",
                        color: "#ffffff",
                      }}
                      onClick={this.applyCode}
                    >
                      Appl{`${this.state.codeApplied ? "ied!" : "y"}`}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
            {this.state.isSubscribed ? (
              <div className="already-subscibed">
                <h2 style={{ color: "#57ABA0" }}>
                  You are already subscribed to this event.
                </h2>
                <h4 style={{ color: "#57ABA0" }}>
                  *If you want to Add/Remove invitees, click on Modify
                </h4>
                <h4 style={{ color: "#57ABA0" }}>
                  *Click on <b>Download</b> for event details and QR Code
                </h4>
              </div>
            ) : !this.props.perHeadAmount ||
              this.props.perHeadAmount === 0 ? null : (
              <div className="subscription-left">
                <h3>Breakdown details</h3>
                <div className="breakdown">
                  <div>Total Amount : ₹{this.state.totalAmount}</div>
                  {this.state.codeApplied && (
                    <div>
                      Discount : - ₹
                      {this.state.codeApplied &&
                        this.state.totalAmount *
                          (this.props.discountPercentage / 100)}
                    </div>
                  )}
                  <div>
                    Amount payble: ₹
                    {this.state.codeApplied
                      ? this.state.totalAmountAfterPromo
                      : this.state.totalAmount}
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.payNow(
                      this.state.seats,
                      this.state.codeApplied
                        ? this.state.totalAmountAfterPromo
                        : this.state.totalAmount
                    )
                  }
                >
                  Pay Now
                </Button>
              </div>
            )}
          </div>
        </div>
        {this.state.isSubscribed ? (
          <div className="update-row">
            <Button type="primary">{<PDF />}</Button>
            <div className="cancel-row">
              <Button onClick={this.props.handleCancel}>Cancel</Button>
              <Button type="primary">Update</Button>
            </div>
          </div>
        ) : this.props.perHeadAmount === 0 || !this.props.perHeadAmount ? (
          <div className="confirm-button">
            {" "}
            <Button type="primary" onClick={this.props.handleFreeTicket}>
              Confirm
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

FeeCalculation.propTypes = {
  noOfSeats: PropTypes.number,
  discountPercentage: PropTypes.number,
  perHeadAmount: PropTypes.number,
  payNow: PropTypes.func,
  handleFreeTicket: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default FeeCalculation;
