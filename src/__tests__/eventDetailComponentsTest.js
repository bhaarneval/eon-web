/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import EventCount from "../components/eventDetail/eventCount";
import {Button} from "antd";

const handleOnClick = sinon.spy();
const eventData =  {
    "id": 11,
    "name": "Lohri",
    "date": "2020-04-10",
    "time": "13:40:00",
    "location": "Panipat",
    "event_type": 1,
    "description": "New Event",
    "no_of_tickets": 200,
    "sold_tickets": 8,
    "subscription_fee": 499,
    "event_status": "upcoming",
    "images": "https://www.google.com/images",
    "external_links": "google.com",
    "invitee_list": [
        {
            "invitation_id": 86,
            "email": "demo101@gmail.com",
            "event": {
                "event_id": 11,
                "event_name": "Lohri"
            },
            "discount_percentage": 0
        }
    ],
   "self_organised": true,
   "feedback_count": 7
};
const eventCountComponent = (
  <EventCount history={{push:(text)=>{console.log(text+' called')}}} eventData={eventData} notifySubscriber={handleOnClick}/>
);

configure({ adapter: new Adapter() });
describe("back button components", () => {
  it("numer of img components", () => {
    const wrapper = shallow(eventCountComponent);
    expect(wrapper.find(".detail-card-count")).toHaveLength(1);
  });
  it("numer of img components", () => {
    const wrapper = shallow(eventCountComponent);
    wrapper.setState({
        updatePopup: true,
        
    });
    wrapper.setProps({
        eventData: {
            event_status: "cancelled"
        }
    })
    expect(wrapper.state("updatePopup")).toBe(true);
    wrapper.instance().handleClose();
    expect(wrapper.state("updatePopup")).toBe(false);
    wrapper.setState({
        updatePopup: true,
        
    });
    expect(wrapper.state("updatePopup")).toBe(true);
    wrapper.instance().type();
    expect(wrapper.state("updatePopup")).toBe(false);
    wrapper.instance().sendUpdate();
    expect(wrapper.state("updatePopup")).toBe(true);
    wrapper.instance().feedbackClick();
    

  });
  it("numer of img components", () => {
    const wrapper = shallow(eventCountComponent);
    
    expect(wrapper.state("message")).toBe("");
    wrapper.instance().onChange({target: {value: "hello"}});
    expect(wrapper.state("message")).toBe("hello");
  });
  it("numer of img components", () => {
    const wrapper = shallow(eventCountComponent);
    
    wrapper.find(".detail-card-container").at(4).simulate("click");
    wrapper.find(".detail-card-container").at(3).simulate("click");
    wrapper.find(Button).at(1).simulate("click");
  });
});
