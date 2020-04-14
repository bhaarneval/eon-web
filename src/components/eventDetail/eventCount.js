import PropTypes from 'prop-types'
import './eventDetail.css'
// import fb from '../../assets/fb.svg';
import feedback from '../../assets/feedback.svg';
import reminder from '../../assets/reminder.svg';
import update from '../../assets/update.svg';
import user from '../../assets/user_yellow.svg';
import {Modal, Input, Button} from 'antd';
const { TextArea } = Input;
import React, { Component } from "react";


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
        console.log(this.state.message, this.state.reminderType)
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

    render () {
        const {eventData} = this.props;
        return (
            <div className="detail-card-count">
                <div className="detail-card-tile detail-card-container">
                    <div>
        <span className="detail-card-tile-row"><img className="subscriber-image" src={user}/><div className="detail-card-tile-text">{eventData.sold_tickets}</div></span>
                        <div>
                            No of Subscribers
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile detail-card-container">
                    <div>
                    <span className="detail-card-tile-row"><img className="subscriber-image" src={feedback}/><div className="detail-card-tile-text">2</div></span>
                        <div>
                            View Feedbacks
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile detail-card-container">
                    <div>
                        <div className="fb-share-button" data-href="https://d3icgv3vrc0gqv.cloudfront.net/" data-layout="button_count" data-size="large"><a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">sad</a>
                        </div>
                        <div>
                            Share on social media
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile reminder-tile">
                    <div onClick={() => this.sendUpdate('reminder')}  className="detail-card-container reminder-row">
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={reminder}/>Send reminder</span>
                    </div>
                    <div onClick={() => this.sendUpdate('updates')} className="detail-card-container reminder-row">
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={update}/>Send updates</span>
                    </div>
                </div>
                {this.state.updatePopup &&
                    <Modal
                        visible
                        onCancel = {this.handleClose}
                        title = {<div className = 'modal-header'>{this.state.reminderType === 'updates' ? 'Send an update' : 'Send reminder'}</div>}
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