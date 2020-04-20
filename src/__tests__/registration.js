/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import UserDetails from "../components/registration/userRegistration/forms";
import {BasicDetails} from "../components/registration/organiserRegistration/forms";
import {Form, Input} from "antd"

const handleSubmit = sinon.spy();
const handleChangePassword = sinon.spy();
const userDetails = (hasErrored) =>{return (
  <UserDetails
    values={{}}
    handleSubmit={handleSubmit}
    handlePasswordChange={handleChangePassword}
    currentPassword={""}
    hasErrored={hasErrored? hasErrored: false}
    errorMessage={""}
  />
);}
configure({ adapter: new Adapter() });
describe("<UserDetails /> components", () => {
  it("find the numer of Form components", () => {
    const wrapper = shallow(userDetails());
    expect(wrapper.find(".form-main")).toHaveLength(1);
  });
  it("numer of Input field", () => {
    const wrapper = shallow(userDetails());
    expect(wrapper.find(".input-style")).toHaveLength(5);
  });
  it("number of error message div", () => {
    const wrapper = shallow(userDetails(true));

    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
  it("Number of password info div", () => {
    const wrapper = shallow(userDetails());

    expect(wrapper.find(".password-info")).toHaveLength(1);
  });
  it("Number of input components", () => {
    const wrapper = shallow(userDetails());
    
    expect(wrapper.find(Form.Item)).toHaveLength(5);
  });
  it("Number of password input div", () => {
    const wrapper = shallow(userDetails());
    
    expect(wrapper.find(Input.Password)).toHaveLength(2);
  });

});


const basicDetails = () =>{return (
  <BasicDetails
    values={{}}
    handleSubmit={handleSubmit}
  />
);}

describe("Organizer registration form components", () => {
  it("find the numer of Form components", () => {
    const wrapper = shallow(basicDetails());
    expect(wrapper.find(".form-main")).toHaveLength(1);
  });
  it("numer of Input field", () => {
    const wrapper = shallow(basicDetails());
    expect(wrapper.find(".input-style")).toHaveLength(4);
  });
  it("Number of input components", () => {
    const wrapper = shallow(basicDetails());
    
    expect(wrapper.find(Form.Item)).toHaveLength(4);
  });

});
