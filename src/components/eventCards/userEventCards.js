import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd';
import calendarImg from '../../assets/calendar.svg';
import locationPin from "../../assets/pin.svg";
import './eventCards.css';
import moment from 'moment';
import emptyImg from "../../assets/image.svg";
import { Tag } from 'antd';


/*
 * event card to display relevant information on dashboard
 */
export default function EventCards(props) {
    const {event,onClick} = props;
    let {id, name, sold_tickets, date,time, images, location,subscription_fee, is_subscribed, event_status} = event;
    let eventDate = date+" "+time;
    eventDate = moment(eventDate,"YYYY-MM-DD hh:mm A");
    eventDate = moment(eventDate).format("DD MMM'YY hh:mm A");
    const tagColor = `${event_status === 'upcoming' ? 'orange' : ''}${event_status === 'cancelled' ? 'red' : ''}${event_status === 'completed' ? 'green' : ''}`;
  return (
    <Card
      bordered={true}
      className="cursor cards-style"
      onClick={() => onClick(id)}
      cover={
        <div className="image-status-container">
          <img
            alt="example"
            src={images && images !== "" && images!=="undefined"?images:emptyImg}
            className="cards-cover-style"
            align="center"
          />
          {is_subscribed ? <Tag color="#e8c7f5" className="status-button ellipsis-style">
            Subscribed
          </Tag>:null}
        </div>
      }
    >
      <div className="user-cards-flex">
        <div className="event-name ellipsis-style">{name}</div>
        <div className="attendies-fees-div">
          <div className="attendies-div ellipsis-style">{sold_tickets} Attendies</div>
          <div className="fees-div ellipsis-style">{subscription_fee === 0? "Free":"₹"+subscription_fee.toLocaleString()}</div>
        </div>
        <div className="address-div attendies-fees-div ellipsis-style">
          <div className="ellipsis-style">
            <img src={calendarImg} className="calendar-gap"/>
            {eventDate}
          </div>
          <Tag 
            style={{marginRight : '0px'}}
            color={tagColor}>
            <span className="capitalize ellipsis-style">{event_status}</span>
            </Tag>
          </div>
          <div className="address-div ellipsis-style">
            <img src={locationPin} className="calendar-gap"/>
              {location}
          </div>
      </div>
    </Card>
  );
 }


EventCards.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
    onClick: PropTypes.func,
}