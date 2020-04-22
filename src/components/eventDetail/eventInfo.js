
import PropTypes from 'prop-types'
import './eventDetail.css'
import { Dropdown, Menu, Button, Input } from 'antd';
const { TextArea } = Input;
import React, { Component } from "react";
import {Modal} from 'antd';
import {
    MoreOutlined,
  } from '@ant-design/icons';
  import URLIMage from "../../assets/URL.svg";
  import shareImg from "../../assets/share.svg";
  import AddBookmark from "../../assets/addBookmark.svg";
  import Bookmarked from "../../assets/bookmarked.svg";
import moment from 'moment';

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelPopup: false,
            message: '',
            bookmarked: this.props.eventData.is_wishlisted||false,
        }
      }

    takeMenuAction = (input) => {
        if(input.key === "1")
          this.setState({
              cancelPopup: true
          })
        else if(input.key === "2") {
            this.props.setEventUpdate(true);
            this.props.history.push(`/create?type=edit&id=${this.props.eventData.id}`);
        }
            
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
        this.setState({
            cancelPopup: false,
        })
        const {eventData, cancelEvent,history, accessToken} = this.props;
        cancelEvent({
            message: this.state.message,
            accessToken: accessToken,
            eventId: eventData.id,
            callback: (error) => {
                if(!error){
                    history.push("/dashboard");
                }
                else{
                    console.error(error);
                }
            }
        });
    }
    handleBookmark = () => {
        let currentState = this.state.bookmarked;
        const {eventData, handleWishlist, accessToken} = this.props;
        handleWishlist({
            data: {event_id:eventData.id},
            accessToken,
            updateType: !currentState?"add":"delete",
            callback: () => {
                this.setState({
                    bookmarked:!this.state.bookmarked
                })
            }
        }); 
    }

    render() {
        const bookMarkImg = this.state.bookmarked?Bookmarked:AddBookmark;
        const menuSidebar = (
            <Menu onClick={key => this.takeMenuAction(key)}>
                <Menu.Item key="1">Cancel</Menu.Item>
                <Menu.Item key="2">Edit</Menu.Item>
            </Menu>
        );
        const {eventData, eventType, isOrganizer, handleShare} = this.props;
        let eventDate = eventData.date + " "+ eventData.time;
        eventDate = moment(eventDate,"YYYY-MM-DD hh:mm A");
        eventDate = eventDate.format("DD MMM' YY, hh:mm A");
        return (
            <div className="detail-card">
                <div className="detail-card-top">
                    <img src={eventData.images} className="detail-img"/>
                    <div className="detail-card-top-descContainer">
                        <h2>{eventData.name}</h2>
                        <div className="detail-card-top-desc">
                            {eventData.description}
                        </div>
                    </div>
                    {isOrganizer && eventData.self_organised && eventData.event_status === "upcoming" ? (
                        <Dropdown overlay={menuSidebar}>
                        <MoreOutlined style={{ height: "10px" }} />
                        </Dropdown>
                    ) : !isOrganizer? (
                        <div>
                            <img src={shareImg}  style={{height:"20px",width:"20px",cursor:"pointer"}} onClick={handleShare}/>
                            <img src={bookMarkImg} style={{height:"20px",width:"20px",cursor:"pointer", marginLeft:"10px"}} onClick={this.handleBookmark}/>
                        </div>
                    ):null}
                </div>
                <div className="detail-card-top-other">
                    <div className="detail-card-top-other-box">
                        <div><b>Type of event</b></div>
                    <div>{eventType.length>0 && (eventData.event_type||eventData.type)?eventType.find(option => (eventData.event_type === option.id)||(eventData.type===option.id)).type.toUpperCase():""}</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>No. of Tickets</b></div>
                    <div>{eventData.no_of_tickets}</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>Event Date & Time</b></div>
                        <div>{eventDate}</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>Subscription Fee</b></div>
                    <div>{eventData.subscription_fee===0?"FREE":eventData.subscription_fee}</div>
                    </div>
                    <div className="detail-card-top-other-box">
                        <div><b>URL</b></div>
                        <div><a rel="noopener noreferrer" href={eventData.external_links} target="_blank"><img src={URLIMage}/></a></div>
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
    eventData: PropTypes.object.isRequired,
    isOrganizer: PropTypes.bool,
    handleShare: PropTypes.func,
    history: PropTypes.object,
    setEventUpdate: PropTypes.func,
    eventType: PropTypes.array,
    cancelEvent: PropTypes.func,
    accessToken: PropTypes.string,
    handleWishlist: PropTypes.func,
}

export default EventInfo;