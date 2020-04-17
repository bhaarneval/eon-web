import React from 'react'
import PropTypes from 'prop-types'
import {Card, Button} from 'antd';
import calendarImg from '../../assets/calendar.svg';
import locationPin from "../../assets/pin.svg";
import './eventCards.css';
import moment from 'moment';
import emptyImg from "../../assets/image.svg";



export default function EventCards(props) {
    const {event,onClick} = props;
    let {id,name, sold_tickets, date,time, images, location,subscription_fee, is_subscribed} = event;
    let eventDate = date+" "+time;
    eventDate = moment(eventDate,"YYYY-MM-DD hh:mm A");
    eventDate = moment(eventDate).format("DD MMM' YY hh:mm A");
  return (
    <Card
      bordered={true}
      className="cards-style"
      onClick={() => onClick(id)}
      cover={
        <div className="image-status-container">
          <img
            alt="example"
            src={images && images !== "" && images!=="undefined"?images:emptyImg}
            className="cards-cover-style"
            align="center"
          />
          {is_subscribed?<Button shape="round" className="status-button ellipsis-style">
            Subscribed
          </Button>:null}
        </div>
      }
    >
      <div className="user-cards-flex">
        <div className="event-name ellipsis-style">{name}</div>
        <div className="attendies-fees-div">
          <div className="attendies-div ellipsis-style">{sold_tickets} Attendies</div>
          <div className="fees-div ellipsis-style">{subscription_fee === 0? "Free":"₹"+subscription_fee}</div>
        </div>
        <div className="address-div ellipsis-style"><img src={calendarImg} className="calendar-gap"/>{eventDate}</div>
        <div className="address-div ellipsis-style"><img src={locationPin} className="calendar-gap"/>{location}</div>
      </div>
    </Card>
  );
 }


EventCards.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
    onClick: PropTypes.func,
}