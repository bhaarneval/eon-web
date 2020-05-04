/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dashboard from "../containers/dashboard/dashboard";

const store = createStore(rootReducer);

const dashboardComponent = <Dashboard store={store} history={{push:(text)=>{console.log(text+' called')}}} location={{search:{}}}/>;
const eventList =  [
    {
        "id": 9,
        "name": "Test8",
        "date": "2020-04-22",
        "time": "12:38:00",
        "location": "Panipat",
        "event_type": 1,
        "description": "New Event",
        "no_of_tickets": 20,
        "sold_tickets": 5,
        "subscription_fee": 499,
        "images": "https://www.google.com/images",
        "external_links": "google.com",
        "feedback_count": 12
    },
    {
        "id": 8,
        "name": "Test7",
        "date": "2020-04-20",
        "time": "12:38:00",
        "location": "Panipat",
        "event_type": 3,
        "description": "New Event",
        "no_of_tickets": 110,
        "sold_tickets": 24,
        "subscription_fee": 499,
        "images": "https://www.google.com/images",
        "external_links": "google.com",
        "feedback_count": 12
    }];

configure({ adapter: new Adapter() });
describe("dashboard components", () => {

  it("number of sub-content Components", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".sub-content")).toHaveLength(1);
  });
  it("number of dashboard-actions-container components", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".dashboard-actions-container")).toHaveLength(1);
  });
  it("number of filter field", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".filters")).toHaveLength(1);
  });
  it("number of events-container-flex", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".events-container-flex")).toHaveLength(1);
  });
  it("number of create button and checkbox for oraganizer", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setProps({
        userRole:"organizer"
    })
    expect(wrapper.find(".create-button")).toHaveLength(1);
    expect(wrapper.find(".checkbox-style")).toHaveLength(1);
  });
  it("number of events-heading", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        isWishlist: false
    })
    expect(wrapper.find(".events-heading")).toHaveLength(1);
  });
  it("state of wishlist", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        isWishlist: true
    })
  });
  it("go back method dashboard", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.instance().goBack();
  });
  it("handle create event method dashboard", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.instance().handleCreateEvent();
  });
  it("handleCheckChange method dashboard", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("isChecked")).toBe(false);
    wrapper.instance().handleCheckChange();
    expect(wrapper.state("isChecked")).toBe(true);
  });
  it("handle key press method dashboard", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("searchText")).toBe("");
    wrapper.instance().handleKeyPress({target:{value:"hello"}});
    expect(wrapper.state("searchText")).toBe("hello");
  });
  it("date selection simulation", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("startDate")).toBe("");
    expect(wrapper.state("endDate")).toBe("");
    wrapper.instance().handleDateChange({},["07-08-1996","07-03-1998"]);
    expect(wrapper.state("startDate")).toBe("1996-08-07");
    expect(wrapper.state("endDate")).toBe("1998-03-07");
    wrapper.instance().handleDateChange({},["",""]);
    expect(wrapper.state("startDate")).toBe("");
    expect(wrapper.state("endDate")).toBe("");
  });
  it("fee type filter change", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("feeType")).toBe("");
    wrapper.instance().handleFeeFilterChange(1);
    expect(wrapper.state("feeType")).toBe("free");
  });
  it("status filter change", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("statusType")).toBe("upcoming");
    wrapper.instance().handleStatusFilterChange(2);
    expect(wrapper.state("statusType")).toBe("cancelled");
  });
  it("event type filter change", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("eventType")).toBe("");
    wrapper.instance().handleFilterChange(1);
    expect(wrapper.state("eventType")).toBe(1);
  });
  it("remove filters", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        isChecked: true,
        searchText: "hello",
        startDate:"2020-09-05",
        endDate: "2020-09-08",
        eventType: 6,
        statusType: "cancelled",
        feeType:"paid"
    })
    expect(wrapper.state("eventType")).toBe(6);
    expect(wrapper.state("isChecked")).toBe(true);
    expect(wrapper.state("searchText")).toBe("hello");
    expect(wrapper.state("startDate")).toBe("2020-09-05");
    expect(wrapper.state("endDate")).toBe("2020-09-08");
    expect(wrapper.state("statusType")).toBe("cancelled");
    expect(wrapper.state("feeType")).toBe("paid");
    wrapper.instance().removeFilters();
    expect(wrapper.state("eventType")).toBe("");
    expect(wrapper.state("isChecked")).toBe(false);
    expect(wrapper.state("searchText")).toBe("");
    expect(wrapper.state("startDate")).toBe("");
    expect(wrapper.state("endDate")).toBe("");
    expect(wrapper.state("statusType")).toBe("upcoming");
    expect(wrapper.state("feeType")).toBe("");
  });
  it("remove filters", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        isChecked: true,
        searchText: "hello",
        startDate:"2020-09-05",
        endDate: "2020-09-08",
        eventType: 6,
        statusType: "cancelled",
        feeType:"paid",
        isWishlist: true,
    })
    expect(wrapper.state("eventType")).toBe(6);
    expect(wrapper.state("isChecked")).toBe(true);
    expect(wrapper.state("searchText")).toBe("hello");
    expect(wrapper.state("startDate")).toBe("2020-09-05");
    expect(wrapper.state("endDate")).toBe("2020-09-08");
    expect(wrapper.state("statusType")).toBe("cancelled");
    expect(wrapper.state("feeType")).toBe("paid");
    wrapper.instance().removeFilters();
    expect(wrapper.state("eventType")).toBe("");
    expect(wrapper.state("isChecked")).toBe(false);
    expect(wrapper.state("searchText")).toBe("");
    expect(wrapper.state("startDate")).toBe("");
    expect(wrapper.state("endDate")).toBe("");
    expect(wrapper.state("statusType")).toBe("upcoming");
    expect(wrapper.state("feeType")).toBe("");
  });
  it("apply filters", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setState({
        isChecked: true,
        searchText: "hello",
        startDate:"2020-09-05",
        endDate: "2020-09-08",
        eventType: 6,
        statusType: "cancelled",
        feeType:"paid",
        isWishlist: true,
    })
    wrapper.instance().applyFilters();
  });
  it("splice array", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.instance().spliceArray(eventList);
  }); 
  it("event click", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setProps({
        getEventData: ({callback}) =>{callback()} 
    })
    wrapper.instance().handleEventClick(23);
    wrapper.setProps({
        getEventData: ({callback}) =>{callback("something went wrong")} 
    })
    wrapper.instance().handleEventClick(23);
  });  
  it("fetch events for wishlist", () => {
    const wrapper = shallow(dashboardComponent).dive({ context: { store } }).dive();
    wrapper.setProps({
        location: {
            search: "type=wishlist"
        } 
    })
    wrapper.instance().fetchEventsList();
    wrapper.setState({
        feeType: "paid"
    })
    wrapper.setProps({
        location: {
            search: ""
        }
    })
    wrapper.instance().fetchEventsList();
  }); 
});
