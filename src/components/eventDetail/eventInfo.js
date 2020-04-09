
import PropTypes from 'prop-types'
import './eventDetail.css'
import dummyImg from '../../assets/concert.jpg';
import { Dropdown, Menu, Button, Input } from 'antd';
const { TextArea } = Input;
import React, { Component } from "react";
import {Modal} from 'antd';
import {
    MoreOutlined,
  } from '@ant-design/icons';
  import shareImg from "../../assets/share.svg";
  import AddBookmark from "../../assets/addBookmark.svg";
  import Bookmarked from "../../assets/bookmarked.svg";

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelPopup: false,
            message: '',
            bookmarked: false,
        }
      }

    takeMenuAction = (input) => {
        if(input.key === "1")
          this.setState({
              cancelPopup: true
          })
        else if(input.key === "2")
         this.props.history.push(`/create?type=edit`);
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
    handleBookmark = () => {
        this.setState({
            bookmarked:!this.state.bookmarked
        })
    }

    render() {
        console.log(this.props.isOrganizer)
        const bookMarkImg = this.state.bookmarked?Bookmarked:AddBookmark;
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
                    {this.props.isOrganizer ? (
                        <Dropdown overlay={menuSidebar}>
                        <MoreOutlined style={{ height: "10px" }} />
                        </Dropdown>
                    ) : (
                        <div>
                            <img src={shareImg}  style={{height:"20px",width:"20px",cursor:"pointer"}} onClick={this.props.handleShare}/>
                            <img src={bookMarkImg} style={{height:"20px",width:"20px",cursor:"pointer", marginLeft:"10px"}} onClick={this.handleBookmark}/>
                        </div>
                    )}
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
                        title = {<div className = 'modal-header'>Cancel Event</div>}
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
                                <Button disabled={this.state.message.length < 1} type="primary" onClick={this.cancel}>Confirm</Button>
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
    isSubscriber: PropTypes.Boolean,
    isOrganizer: PropTypes.Boolean,
    handleShare: PropTypes.func,
    history: PropTypes.object
}

export default EventInfo;