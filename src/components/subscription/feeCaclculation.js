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
      isSubscribed: this.props.eventData.subscription_details.is_subscribed||false,
      isUpdate: false,
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

  handleSeatsUpdate = () => {
    const {
      perHeadAmount,
      handleFreeTicket,
      handleRefund,
      noOfSeats,
    } = this.props;
    let { seats, totalAmount } = this.state;
    if (perHeadAmount === 0) {
      handleFreeTicket(seats);
      return;
    }

    if (seats < noOfSeats) {
      handleRefund(seats);
    }
    if (seats > noOfSeats) {
      totalAmount = (seats - noOfSeats) * perHeadAmount;
      console.log(totalAmount);
      this.setState({
        isUpdate: true,
        totalAmount: totalAmount,
      });
    }
  };
  handleUpdateCancel = () => {
    this.setState({
      seats: this.props.noOfSeats,
      isUpdate: false,
      totalAmount: this.props.noOfSeats * this.props.perHeadAmount,
      totalAmountAfterPromo: this.props.noOfSeats * this.props.perHeadAmount,
      codeApplied: false,
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
                    !this.state.isUpdate
                      ? this.state.seats !== 1
                        ? this.onIncDecSeats("dec")
                        : null
                      : null
                  }
                />
                <div style={{ fontSize: "150%" }}>
                  <b>{this.state.seats}</b>
                </div>
                <PlusCircleOutlined
                  style={{ fontSize: "200%", color: "#262C6F" }}
                  onClick={() =>
                    !this.state.isUpdate ? this.onIncDecSeats("inc") : null
                  }
                />
                <InputNumber
                  min={this.props.noOfSeats}
                  disabled
                  value={
                    this.props.perHeadAmount !== 0
                      ? "₹ " + this.state.totalAmount
                      : "       -"
                  }
                  style={{
                    color: "#262C6F",
                    backgroundColor: "#ffffff",
                    border: "1px solid #262C6F",
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                />
              </div>
              {(this.props.perHeadAmount !== 0 && this.props.discountPercentage!==0 && !this.state.isSubscribed) ||
              this.state.isUpdate && this.props.discountPercentage!==0 ? (
                <div>
                  <h3>
                    <b>Promotional offer</b>
                  </h3>
                  <div className="subscription-seats subscription-discount">
                    {this.props.discountPercentage}% discount available{" "}
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
            {this.state.isSubscribed && !this.state.isUpdate ? (
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  {this.state.isUpdate ? (
                    <Button
                      type="primary"
                      onClick={this.handleUpdateCancel}
                      style={{ marginRight: "2%" }}
                    >
                      Cancel
                    </Button>
                  ) : null}
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
              </div>
            )}
          </div>
        </div>
        {this.state.isSubscribed && !this.state.isUpdate ? (
          <div className="update-row">
            <Button type="primary">{<PDF />}</Button>
            <div className="cancel-row">
              <Button onClick={this.props.handleCancel}>Cancel</Button>
              <Button
                type="primary"
                disabled={this.props.noOfSeats === this.state.seats}
                onClick={this.handleSeatsUpdate}
              >
                Update
              </Button>
            </div>
          </div>
        ) : this.props.perHeadAmount === 0 || !this.props.perHeadAmount ? (
          <div className="confirm-button">
            {" "}
            <Button type="primary" onClick={()=>this.props.handleFreeTicket(this.state.seats)}>
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
  handleRefund: PropTypes.func,
  eventData: PropTypes.object,
};

export default FeeCalculation;
