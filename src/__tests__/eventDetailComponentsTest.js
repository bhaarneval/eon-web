/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import EventCount from "../components/eventDetail/eventCount";
import EventInfo from "../components/eventDetail/eventInfo";
import { Button, InputNumber, Table } from "antd";
import InviteesPopup from "../components/eventDetail/inviteePopup";
import EventTable from "../components/eventDetail/inviteeTable";

const handleOnClick = sinon.spy();
const eventData = {
  id: 11,
  name: "Lohri",
  date: "2020-04-10",
  time: "13:40:00",
  location: "Panipat",
  event_type: 1,
  description: "New Event",
  no_of_tickets: 200,
  sold_tickets: 8,
  subscription_fee: 499,
  event_status: "upcoming",
  images: "https://www.google.com/images",
  external_links: "google.com",
  invitee_list: [
    {
      invitation_id: 86,
      email: "demo101@gmail.com",
      event: {
        event_id: 11,
        event_name: "Lohri",
      },
      discount_percentage: 0,
    },
  ],
  self_organised: true,
  feedback_count: 7,
};
const eventType = [
  {
    id: 1,
    type: "Sports",
  },
  {
    id: 2,
    type: "Festival",
  },
];
const eventCountComponent = (
  <EventCount
    history={{
      push: (text) => {
        console.log(text + " called");
      },
    }}
    eventData={eventData}
    notifySubscriber={handleOnClick}
  />
);

configure({ adapter: new Adapter() });
describe("Event Detail components", () => {
  it("numer of detail-card-count components", () => {
    const wrapper = shallow(eventCountComponent);
    expect(wrapper.find(".detail-card-count")).toHaveLength(1);
  });
  it("methods changing upadatePopup", () => {
    const wrapper = shallow(eventCountComponent);
    wrapper.setState({
      updatePopup: true,
    });
    wrapper.setProps({
      eventData: {
        event_status: "cancelled",
      },
    });
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
  it("message change for updates and reminders", () => {
    const wrapper = shallow(eventCountComponent);

    expect(wrapper.state("message")).toBe("");
    wrapper.instance().onChange({ target: { value: "hello" } });
    expect(wrapper.state("message")).toBe("hello");
  });
  it("simulate button click and feedbacks", () => {
    const wrapper = shallow(eventCountComponent);

    wrapper.find(".detail-card-container").at(4).simulate("click");
    wrapper.find(".detail-card-container").at(3).simulate("click");
    wrapper.find(Button).at(1).simulate("click");
  });
});

const eventInfoComponent = (
  <EventInfo
    history={{
      push: (text) => {
        console.log(text + " called");
      },
    }}
    eventData={eventData}
    isOrganizer={"true"}
    handleShare={handleOnClick}
    setEventUpdate={handleOnClick}
    cancelEvent={handleOnClick}
    handleWishlist={handleOnClick}
    eventType={eventType}
  />
);

configure({ adapter: new Adapter() });
describe("Event info components", () => {
  it("numer of detail-card components", () => {
    const wrapper = shallow(eventInfoComponent);
    expect(wrapper.find(".detail-card")).toHaveLength(1);
  });
  it("different conditions", () => {
    const wrapper = shallow(eventInfoComponent);
    wrapper.setProps({
      isOrganizer: false,
      eventData: {
        event_type: undefined,
        type: 1,
        subscription_fee: 0,
      },
    });
  });
  it("take menu action , cancel, handleBookmark, onChange", () => {
    const wrapper = shallow(eventInfoComponent);
    wrapper.setProps({
      isOrganizer: false,
      eventData: {
        event_type: undefined,
        type: undefined,
        subscription_fee: 0,
      },
      cancelEvent: ({ callback }) => callback(),
    });
    wrapper.setState({
      cancelPopup: true,
      bookmarked: true,
    });
    wrapper.instance().takeMenuAction({ key: "1" });
    wrapper.instance().takeMenuAction({ key: "2" });
    wrapper.instance().takeMenuAction({ key: "3" });
    wrapper.instance().handleClose();
    wrapper.instance().onChange({ target: { value: "hello" } });
    wrapper.instance().cancel();
    wrapper.instance().handleBookmark();
  });
  it("handle wishlist, callback with error", () => {
    const wrapper = shallow(eventInfoComponent);
    wrapper.setProps({
      isOrganizer: false,
      eventData: {
        event_type: undefined,
        type: undefined,
        subscription_fee: 0,
      },
      cancelEvent: ({ callback }) => callback("error"),
      handleWishlist: ({ callback }) => callback("error"),
    });
    wrapper.setState({
      cancelPopup: true,
      bookmarked: false,
    });
    wrapper.instance().cancel();
    wrapper.instance().handleBookmark();
  });

  it("numer of img components", () => {
    const wrapper = shallow(eventInfoComponent);
    wrapper.setProps({
      isOrganizer: false,
    });
    expect(wrapper.find(".subscriber-image")).toHaveLength(1);
  });
});

const inviteesPopup = (
  <InviteesPopup
    eventData={eventData}
    isOrganizer={"true"}
    onDiscountChange={handleOnClick}
    handleClose={handleOnClick}
    handleSend={handleOnClick}
    discountPercentage={"10"}
  />
);

configure({ adapter: new Adapter() });
describe("Invitee popup components", () => {
  it("numer of warning components", () => {
    const wrapper = shallow(inviteesPopup);
    expect(wrapper.find(".warning")).toHaveLength(2);
  });
  it("prominent methods", () => {
    const wrapper = shallow(inviteesPopup);
    wrapper.setState({
      emailError: "asasa",
      message: "asasa",
      inviteeList: ["hello", "hello", "hello"],
    });

    wrapper.find(InputNumber).at(0).props().formatter("hello");
    wrapper.find(InputNumber).at(0).props().parser("hello%");
    wrapper.find(Button).at(1).simulate("click");
    wrapper.instance().validateEmail("mayank@gmail.com");
    wrapper.instance().onDelete("hello");
    wrapper.instance().onChange({ target: { value: "hello world" } });
    wrapper.find(".delete-mark").at(0).simulate("click");
    expect(wrapper.find(".warning")).toHaveLength(2);
  });
  it("prominent methods 2", () => {
    const wrapper = shallow(inviteesPopup);
    wrapper.setState({
      emailError: "asasa",
      message: "asasa",
      inviteeList: ["hello", "hello", "hello"],
    });

    wrapper.find(InputNumber).at(0).props().formatter("hello");
    wrapper.find(InputNumber).at(0).props().parser("hello%");
    wrapper.find(Button).at(1).simulate("click");
    wrapper.instance().validateEmail("mayank@gmail.com");
    wrapper.instance().onDelete("hello");
    wrapper.instance().onChange({ target: { value: "hello world" } });
    wrapper.find(".delete-mark").at(0).simulate("click");
    expect(wrapper.find(".warning")).toHaveLength(2);
  });

  it("adding email to list", () => {
    const wrapper = shallow(inviteesPopup);
    wrapper.setState({
      count: 3,
    });
    wrapper
      .instance()
      .handleKeyPress({
        key: "Enter",
        target: { value: "abc@gmail.com,abc@gxyz.com,abc@xyz.com" },
        preventDefault: () => {},
      });
    wrapper.setState({
      count: 0,
    });
    wrapper
      .instance()
      .handleKeyPress({
        key: "Enter",
        target: {
          value:
            "abc@gmail.com,abc@gxyz.com,abc@xyz.com,abc@gmail.com,abc@gxyz.com,abc@xyz.com,abc@gmail.com,abc@gxyz.com,abc@xyz.com,abc@gmail.com,abc@gxyz.com,abc@xyz.com",
        },
        preventDefault: () => {},
      });
    wrapper
      .instance()
      .handleKeyPress({
        key: "Enter",
        target: {
          value: "abc@xyz.com,abc@gmail.com,abc@gxyz.com,abc@xyz.com,abc@",
        },
        preventDefault: () => {},
      });
    wrapper
      .instance()
      .handleKeyPress({
        key: "13",
        target: { value: "abc@gmail.com,abc@gxyz.com,abc@xyz.com" },
        preventDefault: () => {},
      });
  });
});

const inviteeData = [
  {
    invitation_id: 1,
    email: "user12@gmail.com",
    event: {
      event_id: 9,
      event_name: 9,
    },
    discount_percentage: 10,
  },
  {
    invitation_id: 2,
    email: "user11@gmail.com",
    user: {
      user_id: 33,
      name: "Mayank",
      contact_number: "9999911111",
      address: "Bangalore",
      organization: "Eventhigh",
    },
    event: {
      event_id: 9,
      event_name: 9,
    },
    discount_percentage: 10,
  },
];
const inviteeTable = (
  <EventTable
    data = {inviteeData}
    eventStatus={"upcoming"}
    deleteAll = {handleOnClick}
  />
);

configure({ adapter: new Adapter() });
describe("Invitee table components", () => {
  it("numer of Button components", () => {
    const wrapper = shallow(inviteeTable);
    expect(wrapper.find(Table)).toHaveLength(1);
    wrapper.setState({
      hasSelected: true,
    });
    expect(wrapper.find(Button)).toHaveLength(1);
    wrapper.find(Button).simulate("click");
  });
  it("if data undefined", () => {
    const wrapper = shallow(inviteeTable);
    wrapper.setProps({
      data: undefined,
    });
  });
  it("selecting row keys", () => {
    const wrapper = shallow(inviteeTable);
    jest.useFakeTimers();
    expect(wrapper.state("selectedRowKeys")).toStrictEqual([]);
    expect(wrapper.state("hasSelected")).toBe(false);
    wrapper.instance().onSelectChange([1,2,3]);
    expect(wrapper.state("selectedRowKeys")).toStrictEqual([1,2,3]);
    expect(wrapper.state("hasSelected")).toBe(true);

    wrapper.instance().start();
    jest.advanceTimersByTime(1000);
    expect(wrapper.state("selectedRowKeys")).toStrictEqual([]);
    jest.useRealTimers();
  });
});
