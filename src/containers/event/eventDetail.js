import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Button, Input, InputNumber} from 'antd';
import EventInfo from "../../components/eventDetail/eventInfo";
import EventCount from "../../components/eventDetail/eventCount";
import EventTable from "../../components/eventDetail/inviteeTable";
import InviteesPopup from "../../components/eventDetail/inviteePopup";

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
        totalAmount: 500,
        totalAmountAfterPromo: 0,
        intialAmount: 500,
        discountPercentage: 10,
        // role: 'Organizer'
        role: 'User' //User
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

onChangeSeats = (event) => {
    console.log(event)
}

onIncDecSeats = (type) => {
    if (type==='inc'){
        this.setState({
            noOfSeats : this.state.noOfSeats + 1,
            totalAmount: (this.state.noOfSeats + 1) * this.state.intialAmount
        })
    }
    else{
        this.setState({
            noOfSeats : this.state.noOfSeats - 1,
            totalAmount: (this.state.noOfSeats - 1) * this.state.intialAmount
        })
    }
}

applyCode = () => {
    this.setState({
        totalAmountAfterPromo: this.state.totalAmount * (this.state.discountPercentage/100)
    })
}

render() {
    console.log(this.state.rows)
    return (
      <div className="sub-content">
        <div className="events-heading">Event detail</div>
        <EventInfo history={this.props.history}/>
        {this.state.role === 'Organizer' &&
            <div>
                <EventCount />
                <div className="invitee-row">
                    <h2><b>Invitees List</b></h2>
                    <Button type="primary" onClick={this.inviteButtonClick}>
                        Add Invitees
                    </Button>
                </div>
                <Input
                    placeholder="input search text"
                    onChange={event => this.search(event)}
                    style={{ width: 200, position: 'absolute', zIndex: 1 }}
                />
                <EventTable deleteAll={this.deleteAll} data={this.state.searchValue.length > 0 ? this.state.filteredRows : this.state.rows}/>
                {this.state.showModal &&
                    <InviteesPopup
                        handleClose={this.handleModalClose}
                        handleSend={this.handleSend}
                        onDiscountChange={this.onDiscountChange}
                    />
                }
            </div>
        }
        {this.state.role === 'User' &&
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
        }
      </div>
    );
  }
}

EventDetail.propTypes = {
  history: PropTypes.object
};

export default EventDetail;
