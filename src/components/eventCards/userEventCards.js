import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd';
// import calendarImg from '../../assets/calendar.svg';
import './eventCards.css';
// import moment from 'moment';



export default function EventCards(props) {
    const {event} = props;
    const {name, attendies, date, eventImage, eventLocation,fees} = event;
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
        </div>
      }
    >
      <div className="user-cards-flex">
        <div>{name}</div>
        <div>{attendies}</div>
        <div>{fees}</div>
        <div>{date}</div>
        <div>{eventLocation}</div>
      </div>
    </Card>
  );
 }


EventCards.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}