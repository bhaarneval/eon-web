/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ChangePassword from "../components/forgotPassword/changePassword";
import { Form, Input } from "antd";

const store = createStore(rootReducer);

const changePassword = () => {
  return (
    <ChangePassword
      store={store}
      history={{
        push: (text) => {
          console.log(text + " called");
        },
      }}
    />
  );
};

configure({ adapter: new Adapter() });
describe("forgot password components", () => {
  it("number of Form Components", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(Form)).toHaveLength(1);
  });
  it("number of containers", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(".header-buttons")).toHaveLength(1);
  });
  it("number of password input field", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(Input.Password)).toHaveLength(3);
  });
  it("number of error message divs at a time", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      hasErrored: true,
    });
    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
  it("number of error message divs at a time", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      activeKey: 1,
      hasErrored: true,
    });
    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
  it("handle password change method", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("password")).toBe("");
    wrapper.instance().handlePasswordChange({target: {value: "Test@123"}});
    expect(wrapper.state("password")).toBe("Test@123");
  });

  it("handle go back method", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.instance().goBack();
  });
  it("handle logout method", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.instance().logoutCallback();
  });
  it("handle change old password", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("oldPassword")).toBe("");
    wrapper.instance().handleOldPasswordChange({ target: { value: "mayank" } });
    expect(wrapper.state("oldPassword")).toBe("^((?!mayank).)*$");
  });
  it("handle email submit", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.instance().onFinish({ email: "mayank@gmail.com" });
  });
  it("handle post without error", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      postChangePassword: ({callback}) => callback()
    })
    jest.useFakeTimers();
    wrapper.instance().onFinish({ email: "mayank@gmail.com", });
    jest.advanceTimersByTime(1000);
    jest.useRealTimers();
  });
  it("handle post without error", () => {
    const wrapper = shallow(changePassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      postChangePassword: ({callback}) => callback("error")
    })
    expect(wrapper.state("hasErrored")).toBe(false);
    wrapper.instance().onFinish({ email: "mayank@gmail.com", });
    expect(wrapper.state("hasErrored")).toBe(true);
    expect(wrapper.state("errorMessage")).toBe("error");
  });
});
