/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import sinon from "sinon"
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavBar from "../components/nav/navbar";
import NotificationRender from "../components/nav/notificationRender";
import { Badge, Dropdown, Empty } from "antd";

const store = createStore(rootReducer);

const navComponent = (
  <NavBar
    store={store}
    history={{
      push: (text) => {
        console.log(text + " called");
      },
    }}
    location={{ pathname: "/login" }}
  />
);
const notifications = [
  {
    id: 2,
    event_id: 1,
    event: "Hallowen",
    created_on: "2020-04-21T04:19:27.976877Z",
    message:
      "Your subscribed event 'Hallowen' is deleted by the organizer because Cancel. Your amount is initiated for refund.",
  },
  {
    id: 3,
    event_id: 13,
    event: "Hallowen",
    created_on: "2020-04-21T06:49:46.481905Z",
    message:
      "Reminder for 'Hallowen' event from the organizer with a note for you.\n'Hey'.",
  },
  {
    id: 4,
    event_id: 14,
    event: "Hallowen",
    created_on: "2020-04-21T06:50:13.145503Z",
    message:
      "Update for 'Hallowen' event from the event organizer with a note for you.\n'Get ready to hallowen'.",
  },
];
configure({ adapter: new Adapter() });
describe("NavBar components", () => {
  it("number of .nav-conatiner Components", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();

    expect(wrapper.find(".nav-container")).toHaveLength(1);
  });
  it("number of different Components", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();
    wrapper.setState({
      openNotification: true,
    });
    wrapper.setProps({
      userRole: "subscriber",
      notifications: notifications,
      accessToken: "asasasasasasas",
    });
    expect(wrapper.find(NotificationRender)).toHaveLength(1);
    expect(wrapper.find(Badge)).toHaveLength(1);
  });
  it("number of differen Components", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();
    wrapper.setState({
      openNotification: true,
    });
    wrapper.setProps({
      userRole: "subscriber",
      notifications: notifications,
      accessToken: "asasasasasasas",
    });
    localStorage.setItem("token","asjhagajhsg");
    expect(wrapper.find(NotificationRender)).toHaveLength(1);
    expect(wrapper.find(Badge)).toHaveLength(1);
    expect(wrapper.find(Dropdown)).toHaveLength(1);
    localStorage.removeItem("token");
    expect(wrapper.find(Dropdown)).toHaveLength(1);
  });
  it("handle clear all", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();
    wrapper.instance().goBack();
    wrapper.setProps({
        userRole: "subscriber",
        notifications: notifications,
        accessToken: "asasasasasasas",
      });
      wrapper.setState({
          openNotification: true
      })
      expect(wrapper.state("openNotification")).toBe(true);
      wrapper.instance().clearAll();
      expect(wrapper.state("openNotification")).toBe(false);
      wrapper.setProps({
        userRole: "subscriber",
        notifications: [],
        accessToken: "asasasasasasas",
      });
      wrapper.instance().clearAll();
      wrapper.instance().handleChange();
  });
  it("methods updating openModal state", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();
      expect(wrapper.state("openNotification")).toBe(false);
      wrapper.instance().openNotificationWithIcon();
      expect(wrapper.state("openNotification")).toBe(true);
      wrapper.instance().openNotificationWithIcon();
      expect(wrapper.state("openNotification")).toBe(false);

      wrapper.setState({
          openMenu: false
      });
      expect(wrapper.state("openMenu")).toBe(false);
      wrapper.instance().handleClick();
      expect(wrapper.state("openMenu")).toBe(true);
      wrapper.instance().handleClosePopover();
      expect(wrapper.state("openMenu")).toBe(false);

      wrapper.instance().menu();
      wrapper.instance().menuSidebar();

      wrapper.setProps({
          userRole: "subscriber"
      });
      wrapper.instance().menuSidebar();
  });
  it("takeMenu action", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();
    wrapper.instance().takeMenuAction({key:"1"});
    wrapper.instance().takeMenuAction({key:"2"});
    wrapper.instance().takeMenuAction({key:"3"});
    wrapper.instance().takeMenuAction({key:"4"});
    wrapper.instance().takeMenuAction({key:"5"});
    wrapper.instance().takeMenuAction({key:"6"});
  });
  it("handle logout and clear one notification", () => {
    const wrapper = shallow(navComponent).dive({ context: { store } }).dive();
    wrapper.setProps({
        logOutUser: ({callback}) => callback(),
        notifications: notifications
    })
    wrapper.instance().logout();
    wrapper.instance().handleClearOneNotification(14);
  });
});

const handleClearOneNotification = sinon.spy()
const notificationRender = (
    <NotificationRender notifications={notifications} handleClearOneNotification={handleClearOneNotification}/>
  );
  configure({ adapter: new Adapter() });
  describe("Noto=ificationRenderer components", () => {
    it("numer of div components", () => {
      const wrapper = shallow(notificationRender);
      wrapper.find("div").at(8).simulate("click");
    });
    it("numer of Empty components", () => {
        const wrapper = shallow(notificationRender);
        wrapper.setProps({
            notifications: []
        })
        expect(wrapper.find(Empty)).toHaveLength(1);
      });
  });
