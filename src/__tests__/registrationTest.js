/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import UserDetails from "../components/registration/userRegistration/forms";
import {
  BasicDetails,
  PasswordDetails,
} from "../components/registration/organiserRegistration/forms";
import StyledButtons from "../components/registration/styledButtons";
import FormSteps from "../components/registration/formSteps";
import TermsAndConditions from "../components/registration/termsAndConditions";
import { Form, Input, Button, Modal } from "antd";

const handleSubmit = sinon.spy();
const handleChangePassword = sinon.spy();
const userDetails = (hasErrored) => {
  return (
    <UserDetails
      values={{}}
      handleSubmit={handleSubmit}
      handlePasswordChange={handleChangePassword}
      currentPassword={""}
      hasErrored={hasErrored ? hasErrored : false}
      errorMessage={""}
    />
  );
};
configure({ adapter: new Adapter() });
describe("User Registration components", () => {
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

const basicDetails = () => {
  return <BasicDetails values={{}} handleSubmit={handleSubmit} />;
};

const handleBack = sinon.spy();
const passwordDetails = (hasErrored) => {
  return (
    <PasswordDetails
      handleSubmit={handleSubmit}
      values={{}}
      handleBack={handleBack}
      handlePasswordChange={handleChangePassword}
      currentPassword={""}
      hasErrored={hasErrored ? hasErrored : false}
      errorMessage={""}
    />
  );
};
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
  it("Number of password input div", () => {
    const wrapper = shallow(passwordDetails());

    expect(wrapper.find(Input.Password)).toHaveLength(2);
  });
  it("Number of error message div", () => {
    const wrapper = shallow(passwordDetails(true));

    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
});

const styledButtons = () => {
  return <StyledButtons content={<div>Next</div>} onClick={handleSubmit} />;
};
describe("styledButtons components", () => {
  it("number of button components", () => {
    const wrapper = shallow(styledButtons());
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});

const formSteps = () => {
  return <FormSteps stepList={["Basic", "Advanced"]} activeKey={0} />;
};
describe("FormSteps components", () => {
  it("number of components", () => {
    const wrapper = shallow(formSteps());
    expect(wrapper.find(".multistep-style")).toHaveLength(1);
  });
});

const handleModalClose = sinon.spy();
const handleCheckBoxChnage = sinon.spy();
const termsAndConditionModal = (isChecked) => {
  return (
    <TermsAndConditions
      isChecked={isChecked ? isChecked : false}
      handleClose={handleModalClose}
      handleAccept={handleSubmit}
      handleCheckChange={handleCheckBoxChnage}
    />
  );
};
describe("Terms and condition modal components", () => {
  it("number of components", () => {
    const wrapper = shallow(termsAndConditionModal());
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
});