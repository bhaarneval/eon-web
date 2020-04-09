import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Button, Input, Modal, Form} from 'antd';
import { CheckCircleFilled } from "@ant-design/icons";
import EventInfo from "../../components/eventDetail/eventInfo";
import EventCount from "../../components/eventDetail/eventCount";
import EventTable from "../../components/eventDetail/inviteeTable";
import InviteesPopup from "../../components/eventDetail/inviteePopup";
import FeeCaclculation from "../../components/subscription/feeCaclculation";
import Payment from "../../components/subscription/payment";
import BackButton from "../../components/commonComponents/backButton";
import emailImg from "../../assets/Email ID.svg"
import {EMAIL_REQUIRED} from "../../constants/messages";
import {EMAIL_VALIDATION} from "../../constants/constants";
import { connect } from "react-redux";

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        rows: [],
        searchValue: '',
        filteredRows: [],
        discount: '',
        noOfSeats: 1,
        discountPercentage: 10,
        perHeadAmount: 500,
        showPayment: false,
        showPaymentSuccess: false,
        showCancelModal:false,
        showShareModal: false,
        showUpdateSeatsModal: false,
        finalSeats: '',
        finalAmount: '',
        isOrganizer: this.props.userRole === 'organizer',
        isSubscriber: this.props.userRole === 'subscriber',
        paidAmount: 0,
        refundAmount:0,
        newSeats:0,
    }
  }

  inviteButtonClick = () => {
    this.setState({
        showModal: true
    });
  }

  handleModalClose = () => {
    this.setState({
        showModal: false
    });
}


deleteAll = (list) => {
    const deletedList = []
    const data = this.state.rows;
    {list.map((no) => {
        return deletedList.push(data[no]);
    })}
    console.log(deletedList)
}

onDiscountChange = (value) => {
    this.setState({
        discount: value
    })
}

handleSend = (inviteeList) => {
    let data = [];
    for (let i = 0; i < Object.keys(inviteeList).length; i++) {
        data.push({
            key: i,
            email: inviteeList[Object.keys(inviteeList)[i]],
            name: inviteeList[Object.keys(inviteeList)[i]],
            contact: '1234567890',
            discount: this.state.discount
        });
    }
    this.setState({
        showModal: false,
        rows: data
    })
}

search = (event) => {
    this.setState({
        searchValue: event.target.value,
        filteredRows: this.state.rows.filter((data) => {return data['name'].includes(event.target.value)})
    })
}

payNow = (seats, amount) => {
    console.log(seats, amount)
    this.setState({
        showPayment: !this.state.showPayment,
        finalAmount: amount,
        finalSeats: seats
    })
    //call api for event id and seats
}

onBankSubmit = (accountNo, expiry, name) => {
    console.log(accountNo, expiry, name)
    this.setState({
        showPaymentSuccess: true
    })
}
handleFreeTicket = (seats) => {
    this.setState({
        showPaymentSuccess:true,
        noOfSeats:seats?seats:this.state.noOfSeats,
    })
}
goBack = () => {
    this.props.history.goBack();
}
handlePaymentsBack = () => {
    this.setState({
        showPayment:false
    })
}

handleClose = () => {
    this.props.history.push("/dashboard");
}

handleCancel = () => {
    this.setState({
        showCancelModal:true
    })
}
confirmCancel = () => {
    this.props.history.push("/dashboard");
}
handleShare = () => {
    this.setState({
        showShareModal: !this.state.showShareModal,
    })
}
shareSubmit = (values) => {
    console.log(values);
    this.setState({
        showShareModal: false,
    })
}
handleRefund = (seats) => {
    const {noOfSeats, perHeadAmount, discountPercentage} =this.state;
    let initialPaidAmount = noOfSeats*perHeadAmount;
    initialPaidAmount = initialPaidAmount - (initialPaidAmount*discountPercentage)/100;
    console.log(initialPaidAmount);
    let currentCost = seats * perHeadAmount;
    currentCost = currentCost-(currentCost*discountPercentage)/100;
    let refundAmount = initialPaidAmount - currentCost;
    this.setState({
        newSeats: seats,
        paidAmount:initialPaidAmount,
        refundAmount: refundAmount,
        showUpdateSeatsModal: true,
    })
} 

handleRefundConfirm = () => {
    this.setState({
        noOfSeats:this.state.newSeats,
        showUpdateSeatsModal: false,
        showPaymentSuccess: true,
    })
}

render() {
    const {noOfSeats, perHeadAmount, discountPercentage, isOrganizer, isSubscriber} = this.state;
    console.log(isOrganizer, isSubscriber)
    return (
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Detail"} />
        <EventInfo
          history={this.props.history}
          isSubscriber={isSubscriber}
          isOrganizer={isOrganizer}
          handleShare={this.handleShare}
        />
        {isOrganizer && (
          <div>
            <EventCount />
            <div className="invitee-row">
              <h2>
                <b>Invitees List</b>
              </h2>
              <Button type="primary" onClick={this.inviteButtonClick}>
                Add Invitees
              </Button>
            </div>
            <Input
              placeholder="input search text"
              onChange={(event) => this.search(event)}
              style={{ width: 200, position: "absolute", zIndex: 1 }}
            />
            <EventTable
              deleteAll={this.deleteAll}
              data={
                this.state.searchValue.length > 0
                  ? this.state.filteredRows
                  : this.state.rows
              }
            />
            {this.state.showModal && (
              <InviteesPopup
                handleClose={this.handleModalClose}
                handleSend={this.handleSend}
                onDiscountChange={this.onDiscountChange}
              />
            )}
          </div>
        )}
        {isSubscriber && (
          <div>
            {this.state.showPayment ? (
              <Payment
                onBankSubmit={this.onBankSubmit}
                history={this.props.history}
                handleBackClick={this.handlePaymentsBack}
              />
            ) : (
              <FeeCaclculation
                noOfSeats={noOfSeats}
                discountPercentage={discountPercentage}
                perHeadAmount={perHeadAmount}
                payNow={this.payNow}
                handleFreeTicket={this.handleFreeTicket}
                handleCancel={this.handleCancel}
                handleRefund={this.handleRefund}
              />
            )}
          </div>
        )}
        {this.state.showPaymentSuccess && (
          <Modal visible onCancel={this.handleClose} footer={null} width={500}>
            <div className="payment-success">
              <CheckCircleFilled style={{ color: "green", fontSize: "600%" }} />
            </div>
            <div className="payment-success">
              You have successfully subscribed for the event
            </div>
            <div className="payment-success-button">
              <Button style={{ color: "green" }} onClick={this.handleClose}>
                Okay
              </Button>
            </div>
          </Modal>
        )}
        {this.state.showCancelModal && (
          <Modal
            visible
            title="Cancel Event Subscription"
            onCancel={() => this.setState({ showCancelModal: false })}
            footer={null}
            width={500}
          >
            <div className="cancel-modal">
              <div className="cancel-success">
                Your subscription for this event will be cancelled. All the
                money paid will be refunded back to you.
              </div>
              <Button type="primary" onClick={this.confirmCancel}>
                Confirm
              </Button>
            </div>
          </Modal>
        )}
        {this.state.showShareModal && (
          <Modal visible onCancel={this.handleShare} width={500} footer={null}>
            <div>
              <h2 style={{ color: "#262C6F" }}>
                <b>Share this event with your friend</b>
              </h2>
              <Form name="shareEvent" onFinish={this.shareSubmit}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: EMAIL_REQUIRED },
                    {
                      pattern: EMAIL_VALIDATION,
                      message: EMAIL_REQUIRED,
                    },
                  ]}
                >
                  <Input
                    prefix={<img src={emailImg} />}
                    placeholder="Email"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item name="message">
                  <Input.TextArea
                    placeholder="Enter custom share message"
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    onResize={false}
                  />
                </Form.Item>
                <div className="share-confirm">
                  <Button type="primary" htmlType="submit">
                    Share
                  </Button>
                </div>
              </Form>
            </div>
          </Modal>
        )}
        {this.state.showUpdateSeatsModal && (
          <Modal
            visible
            title={<h3 className="color-text">Update Event Subscription</h3>}
            onCancel={() => this.setState({ showUpdateSeatsModal: false })}
            footer={null}
            width={500}
          >
            <div className="refund-modal">
              <div>
                Number of Attendies will be updated to <b className="color-text">{this.state.newSeats}</b>
              </div>
              <div>
                Total Amount paid for <b  className="color-text">{this.state.noOfSeats}</b> seats was{" "}
                <b  className="color-text">₹ {this.state.paidAmount}</b>
              </div>
              <div>
                Total amount refundalble to you is <b  className="color-text">₹ {this.state.refundAmount}</b>
              </div>
              <Button type="primary" onClick={this.handleRefundConfirm} className="update-button">
                Confirm
              </Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

EventDetail.propTypes = {
  history: PropTypes.object,
  userRole: PropTypes.string
};

const mapStateToProps = ({
  userReducer: {
    userRole,
  }
}) => ({
  userRole,
})

export default connect(mapStateToProps)(EventDetail);
