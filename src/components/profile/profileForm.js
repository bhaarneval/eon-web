import React from "react";
import PropTypes from "prop-types";
import "./profile.css";
import { Button, Form, Input, Checkbox } from "antd";
import organisationImg from "../../assets/Organisation Name.svg";
import emailImg from "../../assets/Email ID.svg";
import phoneImg from "../../assets/Phone - .svg";
import {ORGANISATION_NAME,ORGANISATION_ADDRESS, CONTACT_NO, INVALID_CONATCT} from '../../constants/messages';
import { PHONE_VALIDATION} from '../../constants/constants';

export default function ProfileForm(props) {
  const { values, handleSubmit, handleCancel, role } = props;

  function onFinish(data) {
    handleSubmit(data);
  }
  function handleCheckboxChange (value){
    console.log(value);
  }

  return role !== "user" ? (
    <div className="changePasswordContainer">
      <div className="contentCenter">
        <h1>Profile</h1>
        <FormComponent
          values={values}
          handleCancel={handleCancel}
          onFinish={onFinish}
        />
      </div>
    </div>
  ) : (
    <div className="event-form-container">
      <div className="formCenter">
        <h1>Profile</h1>
        <FormComponent
          values={values}
          handleCancel={handleCancel}
          onFinish={onFinish}
        />
      </div>
      <div>
        <div className="formCenter">
          <h1>Select Interests</h1>
          <div className="interests-div">
            {interestsList.map(interest=>{
              return <Interests key ={name} name={interest} handleCheckboxChange={handleCheckboxChange} isChecked={true}/>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
ProfileForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

function Interests(props){
  const {handleCheckboxChange, isChecked, name} = props;
  return (
    <div className="checkbox-div">
      <Checkbox defaultChecked={isChecked} onChange={handleCheckboxChange} value={name}>{name}</Checkbox>      
    </div>
  )

}
Interests.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  isChecked: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

function FormComponent(props) {
  const { values, onFinish, handleCancel } = props;
  const {organizationName, contactNumber, email, address} =values;
  return (
    <Form
          name="profile"
          initialValues={{
            organizationName: organizationName,
            contactNumber: contactNumber,
            email: email,
            address: address
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="organizationName"
            rules={[
              { required: true, message: ORGANISATION_NAME  }
            ]}
          >
            <Input size = "large"  prefix = {<img src={organisationImg}/>} placeholder = "Organisation Name" className = 'input-style'/>
          </Form.Item>
          <Form.Item
            name="email"
          >
            <Input disabled prefix={<img src={emailImg} />} size = "large" placeholder = "Email" className = 'input-style'/>
          </Form.Item>
          <Form.Item
            name="contactNumber"
            rules={[
              { required: true, message: CONTACT_NO },
              {
                pattern:PHONE_VALIDATION,
                min: 10,
                message: INVALID_CONATCT
              }
              
            ]}
          >
            <Input prefix={<img src = {phoneImg} />} size = "large" minLength = {10}
              maxLength = {10}
            placeholder = "Contact No." className = 'input-style'/>
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: ORGANISATION_ADDRESS
              }
            ]}
          >
            <Input.TextArea placeholder = "Enter Address" autoSize = {false} className = 'input-style'/>
          </Form.Item>
          <div className="button-container">
            <Button className="cancel-button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="save-button">
              Update
            </Button>
          </div>
        </Form>
  );
}

FormComponent.propTypes = {
  values: PropTypes.object.isRequired,
  handleCancel: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
}

const interestsList= ["Festival","Conference", "Ceremonies","Concerts","Seminars","Conventions","Trade Fairs","Formal Parties","Conventions"];