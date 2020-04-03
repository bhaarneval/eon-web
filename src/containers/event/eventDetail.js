import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Modal, Button, InputNumber, Input} from 'antd';
const { TextArea } = Input;
import EventInfo from "../../components/eventDetail/eventInfo";
import EventCount from "../../components/eventDetail/eventCount";

class InviteesPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true,
            inviteeList: [],
            count: 0,
            message:''
        }
      }

      handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            this.setState({
                count: this.state.count + 1,
                inviteeList: [...this.state.inviteeList, {[this.state.count] : event.target.value}],
                message: ''
            })
        }
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value 
        })
    }

    onDelete = (key) => {
        console.log(key)
    }

    render(){
        const { handleSend, handleClose, onDiscountChange } = this.props;
        console.log(this.state.inviteeList)
        return(
            <Modal
                visible
                onCancel = {handleClose}
                title = {<h1 className = 'modal-header'>Invitees List</h1>}
                footer = {null}
                width={660}
            >
                <div>
                    <div className="email-row">
                        {this.state.inviteeList.map((data, key) => {
                            return <span className="email" id={key} key={key}>{data[Object.keys(data)[0]]} <span onClick={() => this.onDelete(key)} className="delete-mark">x</span></span> 
                        })}
                    </div>
                    <TextArea 
                        value={this.state.message.length > 0 && this.state.message} 
                        rows={1} 
                        onChange={this.onChange}
                        onKeyPress={this.handleKeyPress} />
                    <div className='discount-row'>
                        <InputNumber
                            min={0}
                            size="large"
                            max={100}
                            formatter={value => `${value}%`}
                            parser={value => value.replace('%', '')}
                            onChange={onDiscountChange}
                        />
                        <InputNumber
                            size="large"
                            value={200}
                            disabled={true}
                        />
                    </div>
                    <div className = 'send-button-row'>
                        <div className = 'send-button'>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="primary" onClick={handleSend}>Send</Button>
                        </div>
                    </div>
                </div>
            </Modal>
        )

    }
 }
 InviteesPopup.propTypes = {
    handleSend: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    onDiscountChange: PropTypes.func.isRequired,
}

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: true,
    }
  }

  inviteButtonClick = () => {
    this.setState({
        showModal: true
    });
  }

  handleModalClose = () => {
    this.setState({
        showModal: false
    });
}


handleAccept = () => {
    
}

onDiscountChange = () => {
    
}

  render() {
    return (
      <div className="sub-content">
        <div className="events-heading">Event detail</div>
        <EventInfo />
        <EventCount />
        Invitees List 
        <Button type="primary" onClick={this.inviteButtonClick}>
            Add Invitees
        </Button>
        {this.state.showModal &&
            <InviteesPopup
                handleClose={this.handleModalClose}
                handleSend={this.handleSend}
                onDiscountChange={this.onDiscountChange}
         />
        }
      </div>
    );
  }
}

EventDetail.propTypes = {
  history: PropTypes.object
};

export default EventDetail;
