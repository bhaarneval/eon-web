import React, { useState } from "react";
import PropTypes from "prop-types";
import "./eventForm.css";
import { Upload, Button, Form, Input, Switch, DatePicker } from "antd";
import emptyImg from "../../assets/image.svg";
import uploadImg from "../../assets/Upload Image.svg";
import moment from "moment";

import { URLVALIDATION, NUMBERSVALIDATION, MATCH_ANYTHING } from "../../constants/constants";
import { EVENT_NAME,URL_VALID,ONLY_NUMERIC,EVENT_LOCATION,EVENT_DATE,EVENT_TYPE,EVENT_CAPACITY,EVENT_FEES} from '../../constants/messages';

export default function EventForm(props) {
  const { values, handleSubmit, handleCancel,loadType } = props;
  const {
    eventName,
    url,
    eventLocation,
    eventDate,
    fees,
    type,
    isChargeable,
    description,
    capacity,
    eventImage
  } = values;
  const [isChecked, setSwitch] = isChargeable?useState(isChargeable):useState(false);
  const [date, setDate] = eventDate? useState(moment(eventDate,"DD-MM-YYYY  ")) : useState("");
  const [file, setFile] = useState({});
  const [currentImg, setImage] = useState(eventImage);

  function handleSwitchChange(input) {
    setSwitch(input);
  }

  function handleDateChange(date) {
    setDate(date);
  }

  function handleUploadFileChange(uploadedFile) {
    setFile(uploadedFile);
  }

  function stopImageUpload(input) {
    setImage(input.file);
    return false;
  }

  function onFinish(data) {
    data.eventDate = moment(date).format("DD-MM-YYYY");
    data.isChargeable = isChecked ? true : false;
    data.file = file;
    handleSubmit(data);
  }

  return (
    <div className="event-form-container">
      <div>
        <div className="event-image">
          <img
            src={currentImg ? URL.createObjectURL(currentImg) : emptyImg}
            className="image-div"
          />
          <div className="upload-button-container">
            <Upload
              accept=".png,.jpeg,.jpg,.svg,"
              showUploadList={false}
              multiple={false}
              beforeUpload={handleUploadFileChange}
              directory={false}
              customRequest={stopImageUpload}
            >
              <Button type="default">
                <img src={uploadImg} className="upload-icon" /> Add Image
              </Button>
            </Upload>
          </div>
        </div>
      </div>
      <div className="event-form-column">
        <Form
          className="form-main-event"
          name="basicDetails"
          initialValues={{
            eventName: eventName,
            url: url,
            eventLocation: eventLocation,
            eventDate: eventDate,
            isChargeable: isChargeable,
            fees: fees,
            type: type,
            capacity: capacity,
            description: description
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="eventName"
            rules={[{ required: true, message: EVENT_NAME }]}
          >
            <Input size="large" placeholder="Event Name" />
          </Form.Item>
          <Form.Item
            name="url"
            rules={[
              {
                pattern: URLVALIDATION,
                message: URL_VALID
              }
            ]}
          >
            <Input size="large" placeholder="URL" />
          </Form.Item>
          <div className="form-middle-grid">
            <Form.Item
              name="eventLocation"
              rules={[
                {
                  required: true,
                  message: EVENT_LOCATION
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Location"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="eventDate"
              rules={[
                {
                  required: date==="",
                  message: EVENT_DATE
                }
              ]}
            >
              <DatePicker
                allowClear={false}
                placeholder="Select Date"
                format={"DD-MM-YYYY"}
                value={date ? moment(date) : null}
                onChange={handleDateChange}
                disabledDate={current => {
                  return current && current < moment().startOf("day");
                }}
                size="large"
                className="input-style-date"
              />
              <br />
            </Form.Item>
            <div className="input-style-switch">
              Chargeable event?
              <Switch
                checked={isChecked ? isChecked : false}
                onChange={handleSwitchChange}
                size="default"
              />
              <pre>{isChecked ? "Yes" : "No "}</pre>
            </div>
            <Form.Item
              name="fees"
              rules={[
                {
                  pattern:  isChecked?NUMBERSVALIDATION:MATCH_ANYTHING,
                  message: ONLY_NUMERIC
                },
                {
                  required: isChecked,
                  message: EVENT_FEES
                }
              ]}
            >
              <Input
                size="large"
                disabled={isChecked ? !isChecked : true}
                placeholder="Subscription Fees"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                  message: EVENT_TYPE
                }
              ]}
            >
              <Input size="large" placeholder="Type" className="input-style" />
            </Form.Item>
            <Form.Item
              name="capacity"
              rules={[
                {
                  pattern: NUMBERSVALIDATION,
                  message: ONLY_NUMERIC
                },
                {
                  required: true,
                  message: EVENT_CAPACITY
                }
              ]}
            >
              <Input
                size="large"
                placeholder="Number of Tickets"
                className="input-style"
              />
            </Form.Item>
          </div>
          <Form.Item name="description">
            <Input.TextArea
              placeholder="Description"
              autoSize={{ minRows: 4, maxRows: 4 }}
              onResize={false}
            />
          </Form.Item>
          <div className="button-container">
            <Button className="cancel-button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="save-button">
              {loadType==="update"?"Update": "Save"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
EventForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  loadType: PropTypes.string.isRequired,
};
