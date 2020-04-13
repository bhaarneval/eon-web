import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Button, Input, Modal, Form, Spin} from 'antd';
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
import { updateInviteeList, setEventUpdate, cancelEvent, sendNotification } from "../../actions/eventActions";

class EventDetail extends Component {
  constructor(props) {
    super(props);
    // const {eventData}=this.props;
    this.state = {
        showModal: false,
        searchValue: '',
        filteredRows: [],
        discount: 0,
        noOfSeats: 1,
        discountPercentage: this.props.eventData.discount_percentage?this.props.eventData.discount_percentage:0,
        perHeadAmount: 500,
        showPayment: false,
        showPaymentSuccess: false,
        showCancelModal:false,
        showShareModal: false,
        showUpdateSeatsModal: false,
        finalSeats: '',
        finalAmount: '',
        paidAmount: 0,
        refundAmount:0,
        newSeats:0,
    }
  }
  componentDidMount(){
    const {eventData, history} = this.props;
    if(!eventData.id){
      history.push("/dashboard");
    }
  }

  inviteButtonClick = () => {
    this.setState({
        showModal: true
    });
  }

  handleModalClose = () => {
    this.setState({
        showModal: false,
        discountPercentage: this.state.discount
    });
}


deleteAll = (list) => {
  console.log(list);
    const {updateInviteeList, accessToken, eventData} = this.props;
    updateInviteeList({
      data:{invitation_ids:list, event: eventData.id},
      accessToken: accessToken,
      updateType: "delete",
    })
}

onDiscountChange = (value) => {
  console.log(value);
    this.setState({
        discountPercentage: value
    })
}

handleSend = (inviteeList) => {
  console.log(inviteeList[0]);
  const {updateInviteeList, eventData, accessToken} = this.props;
  let invitees=[];
  for (let i = 0; i < Object.keys(inviteeList).length; i++) {
    invitees=[...invitees,inviteeList[i]] ;
}
    const data = {
      event: eventData.id,
      discount_percentage: this.state.discountPercentage,
      invitee_list:invitees,

    };
    updateInviteeList({accessToken: accessToken, data: data, updateType:"save"});
    this.setState({
        showModal: false,
        discount:this.state.discountPercentage
    })
}

search = (event) => {
    this.setState({
        searchValue: event.target.value,
        filteredRows: this.props.eventData.invitee_list.filter((data) => {
          let name = data.user? data.user.name: "";
          return name.includes(event.target.value)|| data.email.includes(event.target.value)})
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
    this.props.history.push("/dashboard");
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

handleNotifySubscriber = (message, type) => {
  const {accessToken, sendNotification, eventData } = this.props;
  const data = {
    event_id:eventData.id,
    message: message,
    type: type,
  };

sendNotification({
    data: data,
    accessToken: accessToken
  });
}

render() {
    const {noOfSeats, perHeadAmount, discountPercentage} = this.state;
    return (
      <Spin spinning={this.props.fetchingEvent} className="spinner">
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Detail"} />
        <EventInfo
          eventData = {this.props.eventData}
          eventType = {this.props.eventType}
          history={this.props.history}
          isOrganizer={this.props.userRole === 'organiser'}
          handleShare={this.handleShare}
          setEventUpdate={this.props.setEventUpdate}
          cancelEvent = {this.props.cancelEvent}
          accessToken = {this.props.accessToken}
        />
       {/* <div className="fb-share-button" data-href="https://d3icgv3vrc0gqv.cloudfront.net/" data-layout="button_count" data-size="small"><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div> */}
        {this.props.userRole === 'organiser' && (
          <div>
            <EventCount eventData = {this.props.eventData} notifySubscriber = {this.handleNotifySubscriber}/>
            <div className="invitee-row">
              <h2>
                <b>Invitees List</b>
              </h2>
              <Button type="primary" onClick={this.inviteButtonClick}>
                Add Invitees
              </Button>
            </div>
            <Input
              placeholder="Name / Email"
              onChange={(event) => this.search(event)}
              style={{ width: 200, position: "absolute", zIndex: 1 }}
            />
            <EventTable
              deleteAll={this.deleteAll}
              data={
                this.state.searchValue.length > 0
                  ? this.state.filteredRows
                  : this.props.eventData.invitee_list
              }
            />
            {this.state.showModal && (
              <InviteesPopup
                handleClose={this.handleModalClose}
                handleSend={this.handleSend}
                onDiscountChange={this.onDiscountChange}
                eventData = {this.props.eventData}
                discountPercentage = {discountPercentage}
              />
            )}
          </div>
        )}
        {this.props.userRole === 'subscriber' && (
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
      </Spin>
    );
  }
}

EventDetail.propTypes = {
  history: PropTypes.object,
  userRole: PropTypes.string,
  eventData: PropTypes.object,
  fetchingEvent: PropTypes.bool,
  updateInviteeList: PropTypes.func,
  accessToken: PropTypes.string,
  setEventUpdate: PropTypes.func,
  eventType: PropTypes.array,
  cancelEvent: PropTypes.func,
  sendNotification: PropTypes.func,
};

const mapStateToProps = ({
  userReducer: {
    userRole,
    accessToken,
    eventType,
  },
  eventReducer: {
    eventData,
    fetchingEvent
  },

}) => ({
  userRole,
  accessToken,
  eventType,
  eventData,
  fetchingEvent
})
const mapDispatchToProps = ({
  updateInviteeList: updateInviteeList,
  setEventUpdate: setEventUpdate,
  cancelEvent: cancelEvent,
  sendNotification: sendNotification,
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
