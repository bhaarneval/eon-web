import React, { Component } from "react";
import PropTypes from "prop-types";
import "./eventDetail.css";
import {Modal, Button, InputNumber, Input} from 'antd';
const { TextArea } = Input;
import EventInfo from "../../components/eventDetail/eventInfo";
import EventCount from "../../components/eventDetail/eventCount";
import EventTable from "../../components/eventDetail/inviteeTable";

class InviteesPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inviteeList: {},
            count: 0,
            message:'',
            emailError:''
        }
    }

    validateEmail(email){      
    var emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email); 
    } 

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            if(this.validateEmail(event.target.value)){
                let a = this.state.inviteeList
                a[this.state.count] = event.target.value
                if (new Set(Object.values(a)).size !== Object.values(a).length){
                    delete a[`${this.state.count}`];
                    this.setState({
                        emailError: 'Email already exists in the list',
                        inviteeList: a,
                    })
                    return
                }
                this.setState({
                    count: this.state.count + 1,
                    inviteeList: a,
                    message: ''
                })
            }
            else{
                this.setState({
                    emailError: 'Please enter a valid email address'
                })
            }
        }
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value,
            emailError: ''
        })
    }

    onDelete = (key) => {
        let a =this.state.inviteeList;
        delete a[`${key}`];
        this.setState({
            inviteeList: a,
        })
    }

    render(){
        const { handleSend, handleClose, onDiscountChange } = this.props;
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
                        {Object.keys(this.state.inviteeList).map((key) => {
                            return <span className="email" id={key} key={key}>  {this.state.inviteeList[key]} 
                                <span onClick={() => this.onDelete(key)} className="delete-mark">x</span>
                            </span> 
                        })}
                    </div>
                    Enter Invitee&apos;s Email ID
                    <TextArea 
                        value={this.state.message.length > 0 && this.state.message} 
                        rows={1} 
                        placeholder="Press Enter to add email id"
                        onChange={this.onChange}
                        onKeyPress={this.handleKeyPress} 
                    />
                    {this.state.emailError.length > 0 &&
                        <div className="error">{this.state.emailError}</div>
                    }
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

let data = [];
for (let i = 0; i < 4; i++) {
    data.push({
    key: i,
    email: `priyanka${i}@gmail.com`,
    name: `Edward King${i}${i}${i}`,
    contact: '1234567890',
    discount: '10%'
    });
}
data.push({
    key: 4,
    email: `priyankagmail.com`,
    name: 'King2',
    contact: '1234567890',
    discount: '10%'
    });

class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal: false,
        rows: data,
        searchValue: '',
        filteredRows: []
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


deleteAll = (list) => {
    const deletedList = []
    const data = this.state.rows;
    {list.map((no) => {
        return deletedList.push(data[no]);
    })}
    console.log(deletedList)
}

handleSend = () => {
}

search = (event) => {
    this.setState({
        searchValue: event.target.value,
        filteredRows: this.state.rows.filter((data) => {return data['name'].includes(event.target.value)})
    })
}

  render() {
    console.log(this.state.rows)
    return (
      <div className="sub-content">
        <div className="events-heading">Event detail</div>
        <EventInfo />
        <EventCount />
        <div className="invitee-row">
            <b>Invitees List </b>
            <Button type="primary" onClick={this.inviteButtonClick}>
                Add Invitees
            </Button>
        </div>
        <Input
            placeholder="input search text"
            onChange={event => this.search(event)}
            style={{ width: 200 }}
        />
        <EventTable deleteAll={this.deleteAll} data={this.state.searchValue.length > 0 ? this.state.filteredRows : this.state.rows}/>
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
