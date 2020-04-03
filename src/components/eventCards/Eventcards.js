import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd';
import calendarImg from '../../assets/calendar.svg';
import './eventCards.css';
import moment from 'moment';


export default function EventCards(props) {
    const {event} = props;
    const {name, attendies, date, eventImage} = event;
  return (
    <Card
      bordered={true}
      className="cards-style"
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
      <div className="card-desc-grid">
        <div className="event-name">{name}</div>
        <div className="card-desc-flex">
          <div style={{fontSize: '12px'}}>{attendies} Attendies</div>
          <div style={{fontSize: '12px'}}><img src={calendarImg} className="calendar-gap"/>{moment(date).format("DD MMM YYYY")}</div>
        </div>
      </div>
    </Card>
  );
 }


EventCards.propTypes = {
    event: PropTypes.object.isRequired,
}