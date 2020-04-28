/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import {
  BasicDetails,
  PasswordDetails,
} from "../components/registration/organiserRegistration/forms";
import {
  BasicDetails as BasicDetailsForm,
  PasswordDetails as PasswordDetailsForm,
} from "../components/registration/userRegistration/forms";
import StyledButtons from "../components/registration/styledButtons";
import FormSteps from "../components/registration/formSteps";
import TermsAndConditions from "../components/registration/termsAndConditions";
import { Form, Input, Button, Modal } from "antd";
import WarningModal from "../components/registration/warningModal";

const handleSubmit = sinon.spy();
const handleChangePassword = sinon.spy();

configure({ adapter: new Adapter() });
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
    expect(wrapper.find(".input-style")).toHaveLength(3);
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

const warningModal = () => {
  return (
    <WarningModal handleAccept={handleModalClose}/>
  );
};
describe("Terms and condition modal components", () => {
  it("number of components", () => {
    const wrapper = shallow(warningModal());
    expect(wrapper.find(Modal)).toHaveLength(1);
  });
});

//userRegistration forms 

const basicDetailsUser = () => {
  return <BasicDetailsForm values={{}} handleSubmit={handleSubmit} />;
};

const passwordDetailsUser = (hasErrored) => {
  return (
    <PasswordDetailsForm
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
    const wrapper = shallow(basicDetailsUser());
    expect(wrapper.find(".form-main")).toHaveLength(1);
  });
  it("numer of Input field", () => {
    const wrapper = shallow(basicDetailsUser());
    expect(wrapper.find(".input-style")).toHaveLength(3);
  });
  it("Number of input components", () => {
    const wrapper = shallow(basicDetailsUser());

    expect(wrapper.find(Form.Item)).toHaveLength(4);
  });
  it("Number of password input div", () => {
    const wrapper = shallow(passwordDetailsUser());

    expect(wrapper.find(Input.Password)).toHaveLength(2);
  });
  it("Number of error message div", () => {
    const wrapper = shallow(passwordDetailsUser(true));

    expect(wrapper.find(".error-message")).toHaveLength(1);
  });
});
