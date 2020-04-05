import PropTypes from 'prop-types'
import './eventDetail.css'
import fb from '../../assets/fb.png';
import feedback from '../../assets/feedback.png';
import reminder from '../../assets/reminder.png';
import user from '../../assets/user.png';
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
        return (
            <div className="detail-card-count">
                <div className="detail-card-tile detail-card-container">
                    <div>
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={user}/><div className="detail-card-tile-text">200</div></span>
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
                    <span className="detail-card-tile-row"><img className="subscriber-image" src={fb}/></span>
                        <div>
                            Share on social media
                        </div>
                    </div>
                </div>
                <div className="detail-card-tile reminder-tile">
                    <div onClick={() => this.sendUpdate('reminder')}  className="detail-card-container reminder-row">
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={reminder}/>Send reminder</span>
                    </div>
                    <div onClick={() => this.sendUpdate('update')} className="detail-card-container reminder-row">
                        <span className="detail-card-tile-row"><img className="subscriber-image" src={reminder}/>Send updates</span>
                    </div>
                </div>
                {this.state.updatePopup &&
                    <Modal
                        visible
                        onCancel = {this.handleClose}
                        title = {<h1 className = 'modal-header'>{this.state.reminderType === 'update' ? 'Send an update' : 'Send reminder'}</h1>}
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
                                <Button disabled={this.state.message.length < 1} type="primary" onClick={this.send}>Send</Button>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
 }


 EventCount.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}

export default EventCount;