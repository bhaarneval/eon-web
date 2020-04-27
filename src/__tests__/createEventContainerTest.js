/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import CreateEvent from "../containers/createEvent/createEvent";
import cloneDeep from 'lodash/cloneDeep'
import {EventForm, UpdateEventForm} from "../components/eventCreation/eventForm";
import Form from "antd/lib/form/Form";
import moment from "moment";
import { Input, DatePicker, Button, Select, Switch, Upload } from "antd";

const store = createStore(rootReducer);

const createEventContainer = <CreateEvent store={store} history={{push:(text)=>{console.log(text+' called')}}} userRole = {"organizer"} location={{search: ""}}/>;
const eventData = {
        "name": "Diwali",
        "event_type": 1,
        "date": "2020-04-09",
        "description":"New Event",
        "external_links":"google.com",
        "time": "12:38:00" ,
        "location": "Panipat",
        "images": "image",
        "subscription_fee": 499 ,
        "no_of_tickets": 200,
}

configure({ adapter: new Adapter() });
describe("Create components", () => {

  it("number of Form Components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    expect(wrapper.find(".create-container")).toHaveLength(1);
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    expect(wrapper.find(".form-div")).toHaveLength(1);
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        userRole: "organizer",
        location: {
            search: "?type=edit"
        },
        eventData: {
            id: 1,
        }
    })
    expect(wrapper.find(".form-div")).toHaveLength(1);
    wrapper.instance().componentDidMount();
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        userRole: "organizer",
        location: {
            search: "?type=edit"
        },
        getEventData: ({callback}) => callback()
    })
    expect(wrapper.find(".form-div")).toHaveLength(1);
    wrapper.instance().componentDidMount();
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        userRole: "organizer",
        location: {
            search: "?type=edit"
        },
        getEventData: ({callback}) => callback("error")
    })
    expect(wrapper.find(".form-div")).toHaveLength(1);
    wrapper.instance().componentDidMount();
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        createNewEvent: ({callback}) => callback({error:true}),
        userData: {
            user_id: 1
        }
    })
    wrapper.setState({
        updateType: false
    })
    expect(wrapper.state("hasErrored")).toBe(false);
    wrapper.instance().handleSubmit({});
    expect(wrapper.state("hasErrored")).toBe(true);
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        createNewEvent: ({callback}) => callback({error:false, id: 23}),
        userData: {
            user_id: 1
        }
    })
    wrapper.setState({
        updateType: false
    })
    expect(wrapper.state("hasErrored")).toBe(false);
    wrapper.instance().handleSubmit({});
    expect(wrapper.state("hasErrored")).toBe(false);
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        updateEventData: ({callback}) => callback({error:true, id: 23}),
        userData: {
            user_id: 1
        },
        eventData: cloneDeep(eventData),
    })
    wrapper.setState({
        updateType: true
    })
    expect(wrapper.state("hasErrored")).toBe(false);
    let event = cloneDeep(eventData);
    event.location = "sample name change";
    event.imageFile = {};
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state("hasErrored")).toBe(true);
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        updateEventData: ({callback}) => callback({error:false, id: 23}),
        userData: {
            user_id: 1
        },
        eventData: cloneDeep(eventData),
    })
    wrapper.setState({
        updateType: true
    })
    expect(wrapper.state("hasErrored")).toBe(false);
    let event = cloneDeep(eventData);
    event.location = "sample name change";
    event.imageFile = {};
    wrapper.instance().handleSubmit(event);
    expect(wrapper.state("hasErrored")).toBe(false);
  });
  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.setProps({
        userData: {
            user_id: 1
        },
        eventData: cloneDeep(eventData),
    })
    wrapper.setState({
        updateType: true
    })
    let event = cloneDeep(eventData);
    event.time = "12:38 PM";
    event.imageFile = {};
    wrapper.instance().handleSubmit(event);
  });

  it("number of components", () => {
    const wrapper = shallow(createEventContainer).dive({ context: { store } }).dive();
    wrapper.instance().goBack("goBack",1);
  });
});


const eventDataForm =  {
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
   "self_organised": true/false,
   "feedback_count": 6,
}
const handleOnClick = sinon.spy();
const eventForm = (
        <EventForm values = {eventDataForm} handleCancel={handleOnClick} handleSubmit={handleOnClick} updateType={false} />
      );
const noDataEventForm =  <EventForm values = {{}} handleCancel={handleOnClick} handleSubmit={handleOnClick} updateType={false} />

configure({ adapter: new Adapter() });
describe("event form components", () => {
  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    expect(wrapper.find(Form)).toHaveLength(1);
  });
  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    expect(wrapper.find(Input)).toHaveLength(5);
  });
  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    expect(wrapper.find(Select)).toHaveLength(1);
    wrapper.find(DatePicker).simulate('click');
  });
  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    wrapper.setProps({
        hasErrored: true,
        errorMessage: "helloWorld"
    })
    expect(wrapper.find(".error-message")).toHaveLength(1);
  });

  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    wrapper.find(Switch).simulate("change", false)
    wrapper.find(Form).props().onFinish({});
  });

  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    wrapper.find(DatePicker).simulate("change", "12-08-2020")
  });
  it("numer of img components", () => {
    const wrapper = shallow(eventForm);
    wrapper.find(Upload).props().beforeUpload({target: {
        files: [
          'dummyValue.jpg'
        ]}});
        wrapper.find(Upload).props().customRequest({file: {}});
        wrapper.find(DatePicker).props().disabledDate(moment("12-02-2020", "DD-MM-YYYY"));
        wrapper.find(Form).props().onFinish({});
  });

  
  it("numer of img components", () => {
    const wrapper = shallow(noDataEventForm);
    expect(wrapper.find(Form)).toHaveLength(1);
  });
  it("numer of img components", () => {
    const wrapper = shallow(noDataEventForm);
    expect(wrapper.find(Input)).toHaveLength(5);
  });
  it("numer of img components", () => {
    const wrapper = shallow(noDataEventForm);
    expect(wrapper.find(Select)).toHaveLength(1);
    wrapper.find(DatePicker).simulate('click');
  });
  it("numer of img components", () => {
    const wrapper = shallow(noDataEventForm);
    expect(wrapper.find(Button)).toHaveLength(3);
  });
  it("numer of img components", () => {
    const wrapper = shallow(noDataEventForm);
    wrapper.setProps({
        eventType: [
            {
                "id": 1,
                "type": "Sports"
            },
            {
                "id": 2,
                "type": "Festival"
            }
        ],
        updateType: true,
    })
    expect(wrapper.find(Button)).toHaveLength(3);
  });



});

const updateEventForm = (
    <UpdateEventForm values = {eventDataForm} handleCancel={handleOnClick} handleSubmit={handleOnClick} updateType={false} />
  );
const noDataUpdateEventForm =  <UpdateEventForm values = {{}} handleCancel={handleOnClick} handleSubmit={handleOnClick} updateType={false} />

configure({ adapter: new Adapter() });
describe("event form components", () => {
it("numer of img components", () => {
const wrapper = shallow(updateEventForm);
expect(wrapper.find(Form)).toHaveLength(1);
});
it("numer of img components", () => {
const wrapper = shallow(updateEventForm);
expect(wrapper.find(Input)).toHaveLength(5);
});
it("numer of img components", () => {
const wrapper = shallow(updateEventForm);
expect(wrapper.find(Select)).toHaveLength(1);
wrapper.find(DatePicker).simulate('click');
});
it("numer of img components", () => {
const wrapper = shallow(updateEventForm);
expect(wrapper.find(Button)).toHaveLength(3);
});

it("numer of img components", () => {
const wrapper = shallow(noDataUpdateEventForm);
expect(wrapper.find(Form)).toHaveLength(1);
});
it("numer of img components", () => {
const wrapper = shallow(noDataUpdateEventForm);
expect(wrapper.find(Input)).toHaveLength(5);
});
it("numer of img components", () => {
const wrapper = shallow(noDataUpdateEventForm);
expect(wrapper.find(Select)).toHaveLength(1);
wrapper.find(DatePicker).simulate('click');
});
it("numer of img components", () => {
const wrapper = shallow(noDataUpdateEventForm);
expect(wrapper.find(Button)).toHaveLength(3);
});
it("numer of img components", () => {
const wrapper = shallow(noDataUpdateEventForm);
wrapper.setProps({
    eventType: [
        {
            "id": 1,
            "type": "Sports"
        },
        {
            "id": 2,
            "type": "Festival"
        }
    ],
    updateType: true,
})
expect(wrapper.find(Button)).toHaveLength(3);
});

it("numer of img components", () => {
    const wrapper = shallow(updateEventForm);
    wrapper.find(Switch).simulate("change", false)
    wrapper.find(Form).props().onFinish({});
  });

  it("numer of img components", () => {
    const wrapper = shallow(updateEventForm);
    wrapper.find(DatePicker).simulate("change", "12-08-2020")
  });
  it("numer of img components", () => {
    const wrapper = shallow(updateEventForm);
    wrapper.find(Upload).props().beforeUpload({target: {
        files: [
          'dummyValue.jpg'
        ]}});
        wrapper.find(Upload).props().customRequest({file: {}});
        wrapper.find(DatePicker).props().disabledDate(moment("12-02-2020", "DD-MM-YYYY"));
        wrapper.find(Form).props().onFinish({});
  });
  it("numer of img components", () => {
    const wrapper = shallow(updateEventForm);
    wrapper.setProps({
        hasErrored: true,
        errorMessage: "helloWorld"
    })
    expect(wrapper.find(".error-message")).toHaveLength(1);
  });

});
