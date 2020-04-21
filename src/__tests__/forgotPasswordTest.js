/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ForgotPassword from "../components/forgotPassword/forgotPassword";
import { Form, Input, Button } from "antd";

const store = createStore(rootReducer);

const forgotPassword = () => {
  return (
    <ForgotPassword
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
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(Form)).toHaveLength(1);
  });
  it("number of containers", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(".forgotPasswordContainer")).toHaveLength(1);
  });
  it("number of password input field", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      activeKey: 1,
    });
    expect(wrapper.find(Input.Password)).toHaveLength(2);
  });
  it("number of error message divs at a time", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      hasErrored: true,
    });
    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
  it("number of error message divs at a time", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      activeKey: 1,
      hasErrored: true,
    });
    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
  it("handle change method", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      hasErrored: true,
    });
    expect(wrapper.state("hasErrored")).toBe(true);
    wrapper.instance().handleChange();
    expect(wrapper.state("hasErrored")).toBe(false);
  });

  it("handle back method", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      activeKey: 1,
    });
    expect(wrapper.state("activeKey")).toBe(1);
    wrapper.instance().handleBack();
    expect(wrapper.state("activeKey")).toBe(0);
  });
  it("handle change password", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      hasErrored: true,
    });
    expect(wrapper.state("hasErrored")).toBe(true);
    expect(wrapper.state("passwordPattern")).toBe("");
    wrapper.instance().handlePasswordChange({ target: { value: "mayank" } });
    expect(wrapper.state("hasErrored")).toBe(false);
    expect(wrapper.state("passwordPattern")).toBe("^mayank$");
  });
  it("handle email submit", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("activeKey")).toBe(0);
    wrapper.instance().onFinish({ email: "mayank@gmail.com" });
  });
  it("handle otp and password submit", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    wrapper.setState({
      activeKey: 1,
    });
    expect(wrapper.state("activeKey")).toBe(1);
    wrapper.instance().onFinish({ password: "mayank@gmail.com", otp: 1234 });
  });
  it("handle get verfication code callback method call with error", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("hasErrored")).toBe(false)
    expect(wrapper.state("errorMessage")).toBe("Unable to connect with the server.");
    wrapper.instance().getVerificationCodeCallback("Something went wrong", {email:"mayank@gmail.com"}, 0);
    expect(wrapper.state("hasErrored")).toBe(true)
    expect(wrapper.state("errorMessage")).toBe("Something went wrong");
  });
  it("handle get verfication code callback method call without error", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("activeKey")).toBe(0);
    wrapper.instance().getVerificationCodeCallback(false, {email:"mayank@gmail.com"}, 0);
    expect(wrapper.state("submitData").email).toBe("mayank@gmail.com");
    expect(wrapper.state("activeKey")).toBe(1);
  });
  it("handle post forgot password callback method call with error", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("hasErrored")).toBe(false)
    expect(wrapper.state("errorMessage")).toBe("Unable to connect with the server.");
    wrapper.instance().postForgotPasswordCallback("Something went wrong");
    expect(wrapper.state("hasErrored")).toBe(true)
    expect(wrapper.state("errorMessage")).toBe("Something went wrong");
  });
  it("handle post forgot password callback method call without error", () => {
    const wrapper = shallow(forgotPassword())
      .dive({ context: { store } })
      .dive();
    expect(wrapper.state("hasErrored")).toBe(false);
    wrapper.instance().postForgotPasswordCallback();
    expect(wrapper.state("hasErrored")).toBe(false);
  });
});
