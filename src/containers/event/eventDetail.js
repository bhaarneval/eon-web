import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Button, Input, Modal} from 'antd';
import { CheckCircleFilled } from "@ant-design/icons";
import EventInfo from "../../components/eventDetail/eventInfo";
import EventCount from "../../components/eventDetail/eventCount";
import EventTable from "../../components/eventDetail/inviteeTable";
import InviteesPopup from "../../components/eventDetail/inviteePopup";
import FeeCaclculation from "../../components/subscription/feeCaclculation";
import Payment from "../../components/subscription/payment";
import BackButton from "../../components/commonComponents/backButton";

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
        finalSeats: '',
        finalAmount: '',
        // role: 'Organizer'
        role: 'User', //User
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
handleFreeTicket = () => {
    this.setState({
        showPaymentSuccess:true,
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

render() {
    const {noOfSeats, perHeadAmount, discountPercentage} = this.state;
    return (
      <div className="sub-content">
        <BackButton handleOnClick={this.goBack} text={"Event Detail"} />
        <EventInfo history={this.props.history} />
        {this.state.role === "Organizer" && (
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
        {this.state.role === "User" && (
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
                Your subscription for this event will be cancelled. All the money paid will be refunded back to you.
              </div>
              <Button type="primary" onClick={this.confirmCancel}>Confirm</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

EventDetail.propTypes = {
  history: PropTypes.object
};

export default EventDetail;
