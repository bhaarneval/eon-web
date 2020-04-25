import { Button, InputNumber, message } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./subscription.css";
// import PDF from "../commonComponents/ticketPdf";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";

class FeeCalculation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: this.props.noOfSeats,
      boughtSeats: this.props.noOfSeats,
      amountPaid: this.props.amountPaid,
      totalAmountAfterPromo: this.props.noOfSeats * this.props.perHeadAmount,
      totalAmount: this.props.noOfSeats * this.props.perHeadAmount,
      codeApplied: false,
      isSubscribed: this.props.eventData.is_subscribed || false,
      isUpdate: false,
    };
  }

  onIncDecSeats = (type) => {
    let { seats, totalAmount, codeApplied } = this.state;
    const { perHeadAmount, discountPercentage, remainingTickets } = this.props;
    if (type === "inc") {
      if (seats >= remainingTickets) {
        message.error(`Only ${remainingTickets} tickets are remaining.`);
        return;
      }
      totalAmount = (seats + 1) * perHeadAmount;
      if (codeApplied) {
        totalAmount = totalAmount - totalAmount * (discountPercentage / 100);
      }
      this.setState({
        seats: seats + 1,
        totalAmount: (seats + 1) * perHeadAmount,
        totalAmountAfterPromo: codeApplied
          ? totalAmount
          : this.state.totalAmountAfterPromo,
      });
    } else {
      let totalAmount = (seats - 1) * perHeadAmount;
      if (codeApplied) {
        totalAmount = totalAmount - totalAmount * (discountPercentage / 100);
      }
      this.setState({
        seats: seats - 1,
        totalAmount: (seats - 1) * perHeadAmount,
        totalAmountAfterPromo: codeApplied
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
      if (seats < noOfSeats) {
        handleFreeTicket(seats - noOfSeats);
      } else if (seats > noOfSeats) handleFreeTicket(seats - noOfSeats);

      return;
    }

    if (seats < noOfSeats) {
      handleRefund(seats);
    }
    if (seats > noOfSeats) {
      totalAmount = (seats - noOfSeats) * perHeadAmount;
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

  feedbackButtonClick = () => {
    const {eventData} = this.props;
    this.props.history.push(
      eventData.feedback_given ? 
        `/feedbacks?id=${this.props.eventData.id}` 
      : 
        `/submit-feedback?id=${this.props.eventData.id}`
    )
  }

  render() {
    const {eventData} = this.props;
    const actionAllowed = eventData && eventData.event_status === 'upcoming';
    return (
      <div>
        <div className="detail-card">
          <div className="subscription-container">
            {actionAllowed &&
              <div className="subscription-left">
                <div className="available-tickets">Total Available Tickets : {this.props.remainingTickets}</div>
                {this.state.isUpdate ? (
                  <h2>
                    Newly added seats :{" "}
                    {this.state.seats - this.state.boughtSeats}
                  </h2>
                ) : (
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
                )}
                {(this.props.perHeadAmount !== 0 &&
                  this.props.discountPercentage !== 0 &&
                  !this.props.eventData.is_subscribed) ||
                (this.state.isUpdate && this.props.discountPercentage !== 0) ? (
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
            }
            {this.props.eventData.is_subscribed && !this.state.isUpdate ? (
              <div className="already-subscibed">
                <h2 style={{ color: "#57ABA0" }}>
                  You have already bought {this.props.noOfSeats} seats for this
                  event.
                </h2>
                {this.state.amountPaid > 0 && (
                  <h4 style={{ color: "#57ABA0" }}>
                    Total amount paid : ₹{" "}
                    {this.props.eventData.subscription_details.amount_paid}
                  </h4>
                )}
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
                          : this.state.totalAmount,
                        this.state.totalAmount
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

        {this.props.eventData.is_subscribed && !this.state.isUpdate ? (
          <div className="update-row">
            <div style = {{display:"flex", justifyContent:"flex-start"}}>
              {/* <PDF
                eventData={this.props.eventData}
                userData={this.props.userData}
              /> */}
              <Button
                type="primary"
                style ={{marginLeft:"2%"}}
                onClick={this.feedbackButtonClick}
              >
                {this.props.eventData.feedback_given ? "View Feedback" : "Submit Feedback"}
              </Button>
            </div>
            {actionAllowed && 
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
            }
          </div>
        ) : this.props.perHeadAmount === 0 || !this.props.perHeadAmount ? (
          <div className="confirm-button">
            {" "}
            <Button
              type="primary"
              onClick={() => this.props.handleFreeTicket(this.state.seats)}
            >
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
  amountPaid: PropTypes.number,
  userData: PropTypes.object,
  history: PropTypes.object,
  remainingTickets: PropTypes.number
};

export default FeeCalculation;
