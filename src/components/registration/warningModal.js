import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import "./termsAndCondition.css";

export default function WarningModal(props) {
  const { handleAccept } = props;

  return (
    <Modal
      visible
      onCancel={handleAccept}
      title={<div className="modal-header">Registration Succesful</div>}
      footer={null}
      width={660}
    >
      <div className="warning-message">
        Your registration was succesfull.<br/> Please ask a <b>Admin</b> to activate
        your account
      </div>
      <div className = 'accept-button-warning'>
        <Button className = 'accept-button' onClick = {handleAccept}>Accept</Button>
      </div>
    </Modal>
  );
}

WarningModal.propTypes = {
  handleAccept: PropTypes.func.isRequired,
};
