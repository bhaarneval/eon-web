import React from 'react'
import PropTypes from 'prop-types'
import {Card, Button} from 'antd';
import calendarImg from '../../assets/calendar.svg';
import './eventCards.css';
import moment from 'moment';


export default function EventCards(props) {
    const {event} = props;
    const {name, status, attendies, date, eventImage} = event;
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
          <Button shape="round" className="status-button">
            {status}
          </Button>
        </div>
      }
    >
      <div className="card-desc-grid">
        <div className="event-name">{name}</div>
        <div className="card-desc-flex">
          <div>{attendies} Attendies</div>
          <div><img src={calendarImg} className="calendar-gap"/>{moment(date).format("DD MMM YYYY")}</div>
        </div>
      </div>
    </Card>
  );
 }


EventCards.propTypes = {
    event: PropTypes.object.isRequired,
}