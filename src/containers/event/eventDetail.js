import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Button, Input, Modal, Form, message} from 'antd';
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
import moment from "moment";
import { cancelSubscription, updateInviteeList, setEventUpdate, cancelEvent, sendNotification, getEventData, subscriptionFreeEvent,subscriptionPaidEvent, shareWithFriend, updateWishList } from "../../actions/eventActions";

class EventDetail extends Component {
  constructor(props) {
    super(props);
    // const {eventData}=this.props;
    this.state = {
      showModal: false,
      searchValue: "",
      filteredRows: [],
      discount: 0,
      noOfSeats: 1,
      discountPercentage: 0,
      perHeadAmount: 500,
      showPayment: false,
      showPaymentSuccess: false,
      showCancelModal: false,
      showShareModal: false,
      showUpdateSeatsModal: false,
      totalAmount: "",
      finalSeats: "",
      finalAmount: "",
      paidAmount: 0,
      refundAmount: 0,
      newSeats: 0,
      processing: false,
    };
  }
  componentDidMount(){
    const {eventData, location:{search}, getEventData,accessToken, userRole, history} = this.props;
    let searchParam = new URLSearchParams(search);
    let id = searchParam.get("id");
    if(!eventData || !eventData.id || eventData.id !== parseInt(id)){
      getEventData({
        id,
        accessToken,
        userRole,
        callback: (error) => {
          if (error) {
            message.error(error);
            history.push("/dashboard");
          }
        },
      }); 
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
    const {updateInviteeList, accessToken, eventData} = this.props;
    updateInviteeList({
      data:{invitation_ids:list, event: eventData.id},
      accessToken: accessToken,
      updateType: "delete",
    })
}

onDiscountChange = (value) => {
    this.setState({
        discountPercentage: value
    })
}

handleSend = (inviteeList) => {
  const {updateInviteeList, eventData, accessToken} = this.props;
  const data = {
    event: eventData.id,
    discount_percentage: this.state.discountPercentage,
    invitee_list:[...new Set(Object.values(inviteeList))],

  };
  updateInviteeList({accessToken: accessToken, data: data, updateType:"save"});
  this.setState({
      showModal: false,
      discount:this.state.discountPercentage
  })
}

search = (event) => {
  let searchText = event.target.value.toLowerCase();
    this.setState({
        searchValue: event.target.value,
        filteredRows: this.props.eventData.invitee_list.filter((data) => {
          let name = data.user? data.user.name.toLowerCase(): "";
          let email = data.email.toLowerCase();
          return name.includes(searchText)|| email.includes(searchText)})
    })
}

payNow = (seats, amount,totalAmount) => {
  if(this.props.eventData.subscription_details.no_of_tickets_bought){
    seats = seats - this.props.eventData.subscription_details.no_of_tickets_bought;
  }
    this.setState({
        showPayment: !this.state.showPayment,
        finalAmount: amount,
        finalSeats: seats,
        totalAmount: totalAmount,
    })
}

onBankSubmit = (accountNo, expiry) => {
    this.setState({
      processing: true
    })
    let expMonth = moment(expiry,"MM-YYYY").format("MM");
    let exp = moment(expiry, "MM-YYYY").format("YYYY");
    const { finalAmount, finalSeats, totalAmount } =this.state;
    const {eventData, userData, accessToken,subscriptionPaidEvent} =this.props;

    let data = {
      event_id: eventData.id,
      user_id: userData.user_id,
      no_of_tickets: finalSeats,
      card_number: parseInt(accountNo),
      expiry_year: parseInt(exp),
      expiry_month: parseInt(expMonth),
      amount: totalAmount,
      discount_amount: totalAmount-finalAmount,
    }
    subscriptionPaidEvent({
      data: data,
      accessToken: accessToken,
      callback: (error) => {
        if(!error){
          this.setState({
            showPayment: false,
            showPaymentSuccess: true,
          });
        }
      }
    });  
}
handleFreeTicket = (seats) => {
  this.setState({
    processing: true,
  });
  if (seats >= 1 && seats> 0) {
    const {
      eventData,
      userData,
      accessToken,
      subscriptionFreeEvent,
    } = this.props;
    let data = {
      event_id: eventData.id,
      user_id: userData.user_id,
      no_of_tickets: seats,
    };
    subscriptionFreeEvent({
      data,
      accessToken,
      subscriptionType: "subscribe-new",
      callback: (error) => {
        if (!error) {
          this.setState({
            showPaymentSuccess: true,
          });
        }
      },
    });
  }
  else if(seats<0){
    this.setState({
      showUpdateSeatsModal: true,
      newSeats: this.props.eventData.subscription_details.no_of_tickets_bought + seats,
    })
  }
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
    this.setState({
      showPaymentSuccess: false,
      processing: false
    })
}

handleCancel = () => {
    this.setState({
        showCancelModal:true
    })
}
confirmCancel = () => {
    const {eventData, accessToken, cancelSubscription} = this.props;
    cancelSubscription({eventId: eventData.id, accessToken});
    this.setState({
      showCancelModal: false
    })
}
handleShare = () => {
    this.setState({
        showShareModal: !this.state.showShareModal,
    })
}
shareSubmit = (values) => {
  const {accessToken, shareWithFriend, eventData} = this.props;
  shareWithFriend({
    accessToken,
    data: { email_id: values.email, message: values.message, event_id: eventData.id },
  });
    this.setState({
        showShareModal: false,
    })
}
handleRefund = (seats) => {
    const {eventData} = this.props;
    const {amount_paid, no_of_tickets_bought} = eventData.subscription_details;
    this.setState({
        newSeats: seats,
        paidAmount:amount_paid,
        processing: true,
        refundAmount: amount_paid - seats*(amount_paid/no_of_tickets_bought),
        showUpdateSeatsModal: true,
    })
} 

handleRefundConfirm = () => {
  const { userData, eventData,subscriptionPaidEvent,subscriptionFreeEvent,accessToken} = this.props;
  if(eventData.subscription_fee!==0){
    let newSeats = this.state.newSeats - eventData.subscription_details.no_of_tickets_bought;
    let amount = eventData.subscription_details.amount_paid/(eventData.subscription_details.no_of_tickets_bought);
    amount = (-newSeats)*amount;
    let discountAmount = eventData.subscription_details.discount_given/(eventData.subscription_details.no_of_tickets_bought);
    discountAmount = (-newSeats)*discountAmount;
    
    let data = {
      event_id: eventData.id,
      user_id: userData.user_id,
      no_of_tickets: newSeats,
      amount: amount + discountAmount,
      discount_amount: discountAmount,
    }
    this.setState({
      showUpdateSeatsModal: false,
    })

    subscriptionPaidEvent({
      data: data,
      accessToken,
      callback: (error) => {
        if(!error){
          this.setState({
            noOfSeats:this.state.newSeats,
            showPaymentSuccess: true,
        })
        }
      }
    })
  }
  else {
    let data = {
      event_id: eventData.id,
      user_id: userData.user_id,
      no_of_tickets:
        this.state.newSeats -
        eventData.subscription_details.no_of_tickets_bought,
    };
    subscriptionFreeEvent({
      data,
      accessToken,
      callback: (error) => {
        if (!error) {
          this.setState({
            noOfSeats: this.state.newSeats,
            showUpdateSeatsModal: false,
            showPaymentSuccess: true,
          });
        }
      },
    });
  }   
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
    const { discountPercentage} = this.state;
    const { eventData, eventType, history, userRole, setEventUpdate, cancelEvent, accessToken,  updateWishList} = this.props;
    const actionNotAllowed = eventData && eventData.event_status !== 'upcoming' && !eventData.is_subscribed;
    return (
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Details"} />
        {eventData && eventData.id && 
          <EventInfo
            eventData = {eventData}
            eventType = {eventType}
            history={history}
            isOrganizer={userRole === 'organizer'}
            handleShare={this.handleShare}
            setEventUpdate={setEventUpdate}
            cancelEvent = {cancelEvent}
            accessToken = {accessToken}
            handleWishlist = {updateWishList}
          />
        }
        {userRole === 'organizer' && eventData && (eventData.self_organised === true || this.props.eventData.is_active) && (
          <div>
            <EventCount history={history} eventData = {eventData} notifySubscriber = {this.handleNotifySubscriber}/>
            <div className="invitee-row">
              <h2>
                <b>Invitees List</b>
              </h2>
              <Button type="primary" disabled={eventData.event_status !== "upcoming"} onClick={this.inviteButtonClick}>
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
                  : eventData.invitee_list
              }
              eventStatus = {this.props.eventData.event_status}
            />
            {this.state.showModal && (
              <InviteesPopup
                handleClose={this.handleModalClose}
                handleSend={this.handleSend}
                onDiscountChange={this.onDiscountChange}
                eventData = {eventData}
                discountPercentage = {discountPercentage}
              />
            )}
          </div>
        )}
        {userRole === 'subscriber' && !actionNotAllowed && (
          <div>
            {this.state.showPayment? (
              <Payment
                onBankSubmit={this.onBankSubmit}
                history={history}
                handleBackClick={this.handlePaymentsBack}
              />
            ) : (
              eventData.subscription_details ?
              <FeeCaclculation
                eventData={this.props.eventData}
                history={history}
                remainingTickets={eventData.remaining_tickets}
                noOfSeats={eventData.subscription_details.no_of_tickets_bought || 1}
                amountPaid={eventData.subscription_details.amount_paid}
                discountPercentage={eventData.discount_percentage||eventData.subscription_details.discount_percentage||0}
                perHeadAmount={eventData.subscription_fee}
                payNow={this.payNow}
                processing={this.state.processing}
                handleFreeTicket={this.handleFreeTicket}
                handleCancel={this.handleCancel}
                handleRefund={this.handleRefund}
                userData = {this.props.userData}
              />:null
            )}
          </div>
        )}
        {this.state.showPaymentSuccess && (
          <Modal visible onCancel={this.handleClose} footer={null} width={400}>
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
                Your subscription for this event will be cancelled. 
              </div>
              {
                eventData.subscription_fee!==0 && 
                <div className = "cancel-success cancel-success-paid">All the
                money paid will be refunded to you.</div>
              }
              <Button type="primary" onClick={this.confirmCancel} style={{marginTop:"10%"}}>
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
                <Form.Item name="message" rules={[
                    { required: true, message: "Message cannot be empty!" }]}>
                  <Input.TextArea
                    placeholder="Enter custom share message"
                    autoSize={{ minRows: 4, maxRows: 4 }}
                    className = "input-textarea"
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
              {eventData.subscription_fee !== 0 && (
                  <div>
                    <div>
                      Total Amount paid for{" "}
                      <b className="color-text">
                        {
                          this.props.eventData.subscription_details
                            .no_of_tickets_bought
                        }
                      </b>{" "}
                      seats was{" "}
                      <b className="color-text">₹ {this.state.paidAmount}</b>
                    </div>
                    <div>
                      Total amount refundable to you is{" "}
                      <b className="color-text">₹ {this.state.refundAmount}</b>
                    </div>
                  </div>
                )}
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
  userRole: PropTypes.string,
  eventData: PropTypes.object,
  updateInviteeList: PropTypes.func,
  accessToken: PropTypes.string,
  setEventUpdate: PropTypes.func,
  eventType: PropTypes.array,
  cancelEvent: PropTypes.func,
  sendNotification: PropTypes.func,
  location: PropTypes.object,
  getEventData: PropTypes.func,
  subscriptionFreeEvent: PropTypes.func,
  userData: PropTypes.object,
  subscriptionPaidEvent: PropTypes.func,
  shareWithFriend: PropTypes.func,
  cancelSubscription: PropTypes.func,
  updateWishList: PropTypes.func,
}

const mapStateToProps = ({
  userReducer: {
    userRole,
    userData,
    accessToken,
    eventType,
  },
  eventReducer: {
    eventData
  },
}) => ({
  userRole,
  userData,
  accessToken,
  eventType,
  eventData,
})
const mapDispatchToProps = ({
  updateInviteeList: updateInviteeList,
  setEventUpdate: setEventUpdate,
  cancelEvent: cancelEvent,
  sendNotification: sendNotification,
  getEventData: getEventData,
  subscriptionFreeEvent: subscriptionFreeEvent,
  subscriptionPaidEvent: subscriptionPaidEvent,
  shareWithFriend: shareWithFriend,
  cancelSubscription: cancelSubscription,
  updateWishList: updateWishList,
})

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
