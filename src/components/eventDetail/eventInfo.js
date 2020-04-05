
import PropTypes from 'prop-types'
import './eventDetail.css'
import dummyImg from '../../assets/concert.jpg';
import { Dropdown, Menu, Button, Input } from 'antd';
const { TextArea } = Input;
import React, { Component } from "react";
import {Modal} from 'antd';

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelPopup: false,
            message: ''
        }
      }

    takeMenuAction = (input) => {
        if(input.key === "1")
          this.setState({
              cancelPopup: true
          })
        else if(input.key === "2")
          this.props.history.push(`/register/subscriber`)
    }

    handleClose = () => {
        this.setState({
            cancelPopup: false
        })
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value,
        })
    }

    cancel = () => {
        console.log(this.state.message)
        this.setState({
            cancelPopup: false,
        })
    }

    render() {
        const menuSidebar = (
            <Menu onClick={key => this.takeMenuAction(key)}>
            <Menu.Item key="1">Cancel</Menu.Item>
            <Menu.Item key="2">Edit</Menu.Item>
            </Menu>
        );
        return (
            <div className="detail-card">
                <div className="detail-card-top">
                    <img src={dummyImg} className="detail-img"/>
                    <div className="detail-card-top-descContainer">
                        <h2>Technex</h2>
                        <div className="detail-card-top-desc">
                            description
                        </div>
                    </div>
                    <Dropdown.Button
                        overlay = {menuSidebar}
                        type="primary"
                        variant="contained"
                    />
                </div>
                <div className="detail-card-top-other">
                    <div className="detail-card-top-other-box">
                        <div><b>Type of event</b></div>
                        <div>Technical</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>No. of Tickets</b></div>
                        <div>3000</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>Event Date & Time</b></div>
                        <div>24th march</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>Subsription Fee</b></div>
                        <div>Technical</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>URL</b></div>
                        <div>Technical</div>
                    </div>
                </div>

                {this.state.cancelPopup &&
                    <Modal
                        visible
                        onCancel = {this.handleClose}
                        title = {<h1 className = 'modal-header'>Cancel Event</h1>}
                        footer = {null}
                        width={660}
                    >
                        <TextArea 
                            rows={2} 
                            placeholder="Message"
                            onChange={this.onChange}
                        />
                        <div>*Complete amount will be refunded to subscribers.</div>
                        <div>*Cancellation email and notification will be sent to all subscribers</div>
                        <div className = 'send-button-row'>
                            <div className = 'send-button'>
                                <Button onClick={this.handleClose}>Cancel</Button>
                                <Button type="primary" onClick={this.cancel}>Confirm</Button>
                            </div>
                        </div>
                    </Modal>
                }
            </div>
        );
    }
 }


 EventInfo.propTypes = {
    event: PropTypes.object.isRequired,
    history: PropTypes.object,
}

export default EventInfo;