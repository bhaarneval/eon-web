/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../components/login/login";
import { Form, Input, Button } from "antd";

const store = createStore(rootReducer);

const loginComponent = <Login store={store} history={{push:(text)=>{console.log(text+' called')}}}/>;

configure({ adapter: new Adapter() });
describe("login components", () => {

  it("number of Form Components", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(Form)).toHaveLength(1);
  });
  it("number of components", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".loginContainer")).toHaveLength(1);
  });
  it("number of input field", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(Input)).toHaveLength(1);
  });
  it("number of password input field", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(Input.Password)).toHaveLength(1);
  });
  it("number of button field", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(Button)).toHaveLength(1);
  });
  it("has errored state handling", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.state('hasErrored')).toBe(false);
    wrapper.setState({
        hasErrored: true,
    });
    expect(wrapper.state('hasErrored')).toBe(true);
    wrapper.find(Input).simulate('change', {
        target: {value: "mayank@gmail.com"}
    });
    expect(wrapper.state('hasErrored')).toBe(false);
    // expect(wrapper.find('.error-message')).toHaveLength(1);
  });
  it("handle forgot-password link click", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".forgot-password-style")).toHaveLength(1);
    wrapper.find(".forgot-password-style").simulate('click');
  });
  it("handle tab change", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    expect(wrapper.state("userType")).toBe("Organizer");
    wrapper.instance().tabChange(2);
    expect(wrapper.state("userType")).toBe(2);
    wrapper.instance().tabChange(1);
    expect(wrapper.state("userType")).toBe(1);

  });
  it("handle form finish failed", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    wrapper.instance().onFinishFailed("Testing form failure");
  });
  it("handle form finish ", () => {
    const wrapper = shallow(loginComponent).dive({ context: { store } }).dive();
    wrapper.instance().onFinish({email:"mayank@gmail.com",password:"Test@123"});
  });
});
