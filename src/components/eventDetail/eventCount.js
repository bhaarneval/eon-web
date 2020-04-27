import PropTypes from 'prop-types'
import './eventDetail.css'
import fb from '../../assets/fb.svg';
import feedback from '../../assets/feedback.svg';
import reminder from '../../assets/reminder.svg';
import update from '../../assets/update.svg';
import user from '../../assets/user_yellow.svg';
import {Modal, Input, Button} from 'antd';
const { TextArea } = Input;
import React, { Component } from "react";
import {
    FacebookShareButton,
} from 'react-share';


class EventCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatePopup: false,
            message: ''
        }
      }

      handleClose = () => {
        this.setState({
            updatePopup: false
        })
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value,
        })
    }

    type = () => {
        this.setState({
            updatePopup: false,
        })
    }

    sendUpdate = (type) => {
        this.setState({
            updatePopup: true,
            reminderType: type
        })
    }

    feedbackClick = () => {
        this.props.history.push(`/feedbacks?id=${this.props.eventData.id}`)
    }

    render () {
        const { eventData } = this.props;
        const isUpcoming = eventData && eventData.event_status === "upcoming";
        return (
            <div className="detail-card-count">
                <div className="detail-card-tile detail-card-container">
                    <div>
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={user}/>
                            <div className="detail-card-tile-text">{eventData.sold_tickets}</div>
                        </span>
                        <div>
                            No of Subscribers
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile cursor detail-card-container" onClick={this.feedbackClick}>
                    <div>
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={feedback}/><div className="detail-card-tile-text">{eventData.feedback_count}</div></span>
                        <div>
                            View Feedbacks
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile detail-card-container">
                    <div>
                        <FacebookShareButton url={`http://d10crzu2ups2gn.cloudfront.net/event-details?id=${eventData.id}`}>
                            <img className="subscriber-image" src={fb}/>
                        </FacebookShareButton>
                        <div className="cursor">
                            Share
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile reminder-tile">
                    <div onClick={() => isUpcoming && this.sendUpdate('reminder')}  className={`${isUpcoming ? 'cursor' : 'notAllowedCursor'} detail-card-container reminder-row`}>
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={reminder}/>Send Reminder</span>
                    </div>
                    <div onClick={() => isUpcoming && this.sendUpdate('updates')} className={`${isUpcoming ? 'cursor' : 'notAllowedCursor'} detail-card-container reminder-row`}>
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={update}/>Send Update</span>
                    </div>
                </div>
                {this.state.updatePopup &&
                    <Modal
                        visible
                        onCancel = {this.handleClose}
                        title = {<div className = 'modal-header'>{this.state.reminderType === 'updates' ? 'Send Update' : 'Send Reminder'}</div>}
                        footer = {null}
                        width={660}
                    >
                        <TextArea 
                            rows={2} 
                            placeholder="Message"
                            onChange={this.onChange}
                        />
                        <div>*Update email and notification will be sent to all subscribers</div>
                        <div className = 'send-button-row'>
                            <div className = 'send-button'>
                                <Button onClick={this.handleClose}>Cancel</Button>
                                <Button disabled={this.state.message.length < 1} type="primary" onClick={()=>{
                                    this.setState({
                                        updatePopup: false
                                    })
                                    this.props.notifySubscriber(this.state.message, this.state.reminderType)}}>Send</Button>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
 }


 EventCount.propTypes = {
    history: PropTypes.object,
    eventData: PropTypes.object,
    notifySubscriber: PropTypes.func,
}

export default EventCount;