/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import UserCards from "../components/eventCards/userEventCards"

const handleOnClick = sinon.spy();

const userCards = (image, isSubscribed, subscriptionFee=500) => {
    return (
        <UserCards event={{images: image, is_subscribed:isSubscribed, subscription_fee: subscriptionFee}} history={{push:(text)=>{console.log(text+' called')}}} onClick={handleOnClick} />
      );
}

configure({ adapter: new Adapter() });
describe("Event cards components", () => {
  it("numer of cardstyle components", () => {
    const wrapper = shallow(userCards("undefined",false));
    expect(wrapper.find(".cards-style")).toHaveLength(1);
  });
  it("numer of img components with image empty", () => {
    const wrapper = shallow(userCards("", true, 0));
    expect(wrapper.find(".cards-style")).toHaveLength(1);
  });
  it("numer of img components with image undefined", () => {
    const wrapper = shallow(userCards());
    expect(wrapper.find(".cards-style")).toHaveLength(1);
    wrapper.find(".cards-style").simulate('click');
  });
  it("numer of img components with image there", () => {
    const wrapper = shallow(userCards("google.png",true));
    expect(wrapper.find(".cards-style")).toHaveLength(1);
  });
});