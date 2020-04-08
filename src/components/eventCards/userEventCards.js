import React from 'react'
import PropTypes from 'prop-types'
import {Card, Button} from 'antd';
import calendarImg from '../../assets/calendar.svg';
import locationPin from "../../assets/pin.svg";
import './eventCards.css';
import moment from 'moment';



export default function EventCards(props) {
    const {event} = props;
    let {name, attendies, eventDate, eventImage, eventLocation,fees, ifSubscribed} = event;
    eventDate = moment(eventDate,"DD-MM-YYYY");
    eventDate = eventDate.format("dddd, DD MMM, hh:mm A");
  return (
    <Card
      bordered={true}
      className="cards-style"
      onClick={() => props.history.push(`/event-details/1`)}
      cover={
        <div className="image-status-container">
          <img
            alt="example"
            src={eventImage}
            className="cards-cover-style"
            align="center"
          />
          {ifSubscribed?<Button shape="round" className="status-button">
            Subscribed
          </Button>:null}
        </div>
      }
    >
      <div className="user-cards-flex">
        <div className="event-name">{name}</div>
        <div className="attendies-fees-div">
          <div className="attendies-div">{attendies} Attendies</div>
          <div className="fees-div">{"₹"+fees}</div>
        </div>
        <div style={{fontSize: '12px'}}><img src={calendarImg} className="calendar-gap"/>{eventDate}</div>
        <div style={{fontSize: '12px'}}><img src={locationPin} className="calendar-gap"/>{eventLocation}</div>
      </div>
    </Card>
  );
 }


EventCards.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}