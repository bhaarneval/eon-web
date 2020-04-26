/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import sinon from "sinon";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EventDetail from "../containers/event/eventDetail";
import { Form, Input, Button } from "antd";

const store = createStore(rootReducer);

const eventDetailsComponent = (
  <EventDetail
    store={store}
    history={{
      push: (text) => {
        console.log(text + " called");
      },
    }}
    location={{ search: {} }}
  />
);

configure({ adapter: new Adapter() });
describe("login components", () => {
  it("number of Form Components", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(".sub-content")).toHaveLength(1);
  });
  it("number of components", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(".invitee-row")).toHaveLength(0);
    wrapper.setProps({
      userRole: "organizer",
      callback: () => expect(wrapper.find(".invitee-row")).toHaveLength(1),
    });
  });
  it("number of input field", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(Input)).toHaveLength(0);
    wrapper.setProps({
      userRole: "organizer",
      callback: () => expect(wrapper.find(Input)).toHaveLength(1),
    });
  });
  it("number of password input field", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showPaymentSuccess: true,
    });
    expect(wrapper.find(".payment-success")).toHaveLength(2);
  });
  it("number of button field", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showPaymentSuccess: true,
    });
    expect(wrapper.find(".payment-success-button")).toHaveLength(1);
  });
  it("number of button field", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showPaymentSuccess: true,
    });
    expect(wrapper.find(Button)).toHaveLength(1);
  });
  it("handle showModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("showModal")).toBe(false);
    wrapper.instance().inviteButtonClick();
    expect(wrapper.state("showModal")).toBe(true);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showModal: true,
    });
    expect(wrapper.state("showModal")).toBe(true);
    wrapper.instance().handleModalClose();
    expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.instance().deleteAll();
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      discountPercentage: 0,
    });
    expect(wrapper.state("discountPercentage")).toBe(0);
    wrapper.instance().onDiscountChange(10);
    expect(wrapper.state("discountPercentage")).toBe(10);
  });
  it("handle send", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showModal: true,
    });
    expect(wrapper.state("showModal")).toBe(true);
    wrapper.instance().handleSend([12, 13]);
    expect(wrapper.state("showModal")).toBe(false);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      eventData: {
        invitee_list: [
          { name: "hello", email: "hello@gmail.com", user: { name: "hello" } },
        ],
      },
    });
    wrapper.instance().search({ target: { value: "hello" } });
    wrapper.setProps({
      eventData: {
        invitee_list: [{ name: "hello", email: "hello@gmail.com" }],
      },
    });
    wrapper.instance().search({ target: { value: "hello" } });
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      eventData: {
        subscription_details: {
          no_of_tickets_bought: 8,
        },
      },
    });
    expect(wrapper.state("showPayment")).toBe(false);
    expect(wrapper.state("finalSeats")).toBe("");
    expect(wrapper.state("finalAmount")).toBe("");
    expect(wrapper.state("totalAmount")).toBe("");

    wrapper.instance().payNow(3, 1200, 1500);

    expect(wrapper.state("showPayment")).toBe(true);
    expect(wrapper.state("finalSeats")).toBe(-5);
    expect(wrapper.state("finalAmount")).toBe(1200);
    expect(wrapper.state("totalAmount")).toBe(1500);

    wrapper.setProps({
      eventData: {
        subscription_details: {},
      },
    });
    wrapper.instance().payNow(3, 1200, 1500);

    expect(wrapper.state("showPayment")).toBe(false);
    expect(wrapper.state("finalSeats")).toBe(3);
    expect(wrapper.state("finalAmount")).toBe(1200);
    expect(wrapper.state("totalAmount")).toBe(1500);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();

    wrapper.instance().onBankSubmit("12345678", "12-2020");
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showPayment: true,
    });
    expect(wrapper.state("showPayment")).toBe(true);
    expect(wrapper.state("showPaymentSuccess")).toBe(false);
    wrapper.instance().subscriptionPaidEventCallback();
    expect(wrapper.state("showPayment")).toBe(false);
    expect(wrapper.state("showPaymentSuccess")).toBe(true);
    wrapper.instance().subscriptionPaidEventCallback("error");
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("showPaymentSuccess")).toBe(false);
    wrapper.instance().subscriptionFreeEventCallback();
    expect(wrapper.state("showPaymentSuccess")).toBe(true);
    wrapper.instance().subscriptionFreeEventCallback("error");
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.instance().handleFreeTicket(2);
    expect(wrapper.state("showUpdateSeatsModal")).toBe(false);
    expect(wrapper.state("newSeats")).toBe(0);
    wrapper.setProps({
      eventData: {
        subscription_details: {
          no_of_tickets_bought: 8,
        },
      },
    });
    wrapper.instance().handleFreeTicket(-2);
    expect(wrapper.state("showUpdateSeatsModal")).toBe(true);
    expect(wrapper.state("newSeats")).toBe(6);

    wrapper.instance().handleFreeTicket(0);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showPayment: true,
    });
    wrapper.instance().goBack();
    expect(wrapper.state("showPayment")).toBe(true);
    wrapper.instance().handlePaymentsBack();
    expect(wrapper.state("showPayment")).toBe(false);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showPaymentSuccess: true,
      showCancelModal: false,
    });
    expect(wrapper.state("showPaymentSuccess")).toBe(true);
    expect(wrapper.state("showCancelModal")).toBe(false);
    wrapper.instance().handleClose();
    wrapper.instance().handleCancel();
    expect(wrapper.state("showPaymentSuccess")).toBe(false);
    expect(wrapper.state("showCancelModal")).toBe(true);
    wrapper.instance().confirmCancel();
    expect(wrapper.state("showCancelModal")).toBe(false);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      showShareModal: false,
    });
    expect(wrapper.state("showShareModal")).toBe(false);
    wrapper.instance().handleShare();
    expect(wrapper.state("showShareModal")).toBe(true);
    wrapper.instance().shareSubmit("example message");
    expect(wrapper.state("showShareModal")).toBe(false);
  });

  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      eventData: {
        subscription_fee: 500,
        subscription_details: {
          amount_paid: 1500,
          no_of_tickets_bought: 3,
          discount_given: 0,
        },
      },
    });
    expect(wrapper.state("newSeats")).toBe(0);
    expect(wrapper.state("paidAmount")).toBe(0);
    expect(wrapper.state("refundAmount")).toBe(0);
    expect(wrapper.state("showUpdateSeatsModal")).toBe(false);
    wrapper.instance().handleRefund(2);
    expect(wrapper.state("newSeats")).toBe(2);
    expect(wrapper.state("paidAmount")).toBe(1500);
    expect(wrapper.state("refundAmount")).toBe(500);
    expect(wrapper.state("showUpdateSeatsModal")).toBe(true);
    wrapper.instance().handleRefundConfirm();
    expect(wrapper.state("showUpdateSeatsModal")).toBe(false);
    expect(wrapper.state("noOfSeats")).toBe(1);
    expect(wrapper.state("showPaymentSuccess")).toBe(false);
    wrapper.instance().refundConfirmCallback();
    expect(wrapper.state("noOfSeats")).toBe(2);
    expect(wrapper.state("showPaymentSuccess")).toBe(true);
    wrapper.instance().refundConfirmCallback("some error");

    wrapper.setState({ showUpdateSeatsModal: true });
    wrapper.setProps({
      eventData: {
        subscription_fee: 0,
        subscription_details: {
          no_of_tickets_bought: 3,
        },
      },
    });
    wrapper.instance().handleRefundConfirm();
    wrapper.setState({
      showUpdateSeatsModal: true,
      noOfSeats: 3,
      showPaymentSuccess: false,
    });

    expect(wrapper.state("showUpdateSeatsModal")).toBe(true);
    expect(wrapper.state("noOfSeats")).toBe(3);
    expect(wrapper.state("showPaymentSuccess")).toBe(false);
    wrapper.instance().freeSeatsUpdateCallback();
    expect(wrapper.state("showUpdateSeatsModal")).toBe(false);
    expect(wrapper.state("noOfSeats")).toBe(2);
    expect(wrapper.state("showPaymentSuccess")).toBe(true);
    wrapper.instance().freeSeatsUpdateCallback("some error");
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.instance().handleNotifySubscriber("some Message", 8);
  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setProps({
          eventData:{
              id: 1,
              event_status: "upcoming",
              is_subscribed: false,
              self_organised: true,
          },
          userRole: "organizer",
      });

      wrapper.setState({
          showModal: true,
          searchValue: "hello",
      })

  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setProps({
          eventData:{
              id: 1,
              event_status: "upcoming",
              is_subscribed: true,
              self_organised: true,
              subscription_details: {
                  no_of_tickets_bought: 4
              }
          },
          userRole: "subscriber",
      });

      wrapper.setState({
          showModal: true,
          searchValue: "hello",
          showPayment: true,
      })

  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setProps({
          eventData:{
              id: 1,
              event_status: "upcoming",
              is_subscribed: true,
              self_organised: true,
              subscription_details: {
              }
          },
          userRole: "subscriber",
      });

      wrapper.setState({
          showModal: true,
          searchValue: "hello",
          showPayment: true,
      })

  });
  it("handle closeModal", () => {
    const wrapper = shallow(eventDetailsComponent)
      .dive({ context: { store } })
      .dive();
      wrapper.setProps({
          eventData:{
              id: 1,
              event_status: "upcoming",
              is_subscribed: true,
              self_organised: true,
          },
          userRole: "subscriber",
      });

      wrapper.setState({
          showModal: true,
          searchValue: "hello",
          showPayment: true,
      })

  });
});
