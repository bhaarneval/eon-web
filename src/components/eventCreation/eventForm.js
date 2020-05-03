import React, { useState } from "react";
import PropTypes from "prop-types";
import "./eventForm.css";
import { Upload, Button, Form, Input, Switch, DatePicker, Select } from "antd";
import emptyImg from "../../assets/image.svg";
import uploadImg from "../../assets/Upload Image.svg";
import moment from "moment";

import {
  URLVALIDATION,
  NUMBERSVALIDATION,
  MATCH_ANYTHING,
  WHITESPACE_VALIDATION,
} from "../../constants/constants";
import {
  EVENT_NAME,
  URL_VALID,
  ONLY_NUMERIC,
  EVENT_LOCATION,
  EVENT_DATE,
  EVENT_TYPE,
  EVENT_CAPACITY,
  EVENT_FEES,
  ONLY_WHITESPACE,
} from "../../constants/messages";

const { Option } = Select;
export function EventForm(props) {
  const {
    values,
    handleSubmit,
    handleCancel,
    updateType,
    hasErrored,
    errorMessage,
    eventType,
  } = props;
  const {
    name,
    external_links,
    location,
    date,
    time,
    subscription_fee = 0,
    event_type,
    description,
    no_of_tickets,
    images,
  } = values;
  let dateTime = "";
  if (date && time) {
    dateTime = date + " " + time;
  }
  const [isChecked, setSwitch] =
    subscription_fee && subscription_fee !== 0
      ? useState(true)
      : useState(false);
  const [eventDate, setDate] = dateTime
    ? useState(moment(dateTime, "YYYY-MM-DD hh:mm:ss"))
    : useState("");
  const [file, setFile] = useState({});
  const [currentImg, setImage] = useState({});

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
    data.date = moment(eventDate).format("YYYY-MM-DD");
    data.time = moment(eventDate).format("HH:mm:ss");
    data = { ...data, imageFile: file };
    if (!isChecked) {
      data.subscription_fee = 0;
    }
    handleSubmit(data);
  }

  return (
    <div className="event-form-container">
      <div>
        <div className="event-image">
          <img
            src={
              currentImg.name
                ? URL.createObjectURL(currentImg)
                : images && images !== ""
                ? images
                : emptyImg
            }
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
            name: name,
            external_links: external_links,
            location: location,
            date: date,
            subscription_fee: subscription_fee,
            event_type: event_type,
            no_of_tickets: no_of_tickets,
            description: description,
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: EVENT_NAME },
              { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
            ]}
          >
            <Input size="large" maxLength={32} placeholder="Event Name" />
          </Form.Item>
          <Form.Item
            name="external_links"
            rules={[
              {
                pattern: URLVALIDATION,
                message: URL_VALID,
              },
              { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
            ]}
          >
            <Input size="large" placeholder="URL" />
          </Form.Item>
          <div className="form-middle-grid">
            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: EVENT_LOCATION,
                },
                { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
              ]}
            >
              <Input
                size="large"
                maxLength={255}
                placeholder="Location"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: eventDate === "",
                  message: EVENT_DATE,
                },
              ]}
            >
              <DatePicker
                allowClear={false}
                showTime
                placeholder="Select Date & Time"
                format={"DD-MM-YYYY hh:mm A"}
                value={eventDate ? moment(eventDate) : null}
                onChange={handleDateChange}
                disabledDate={(current) => {
                  return current && current < moment().startOf("day");
                }}
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
              name="subscription_fee"
              rules={[
                {
                  pattern: isChecked ? NUMBERSVALIDATION : MATCH_ANYTHING,
                  message: ONLY_NUMERIC,
                },
                {
                  required: isChecked,
                  message: EVENT_FEES,
                },
              ]}
            >
              <Input
                size="large"
                maxLength={255}
                disabled={isChecked ? !isChecked : true}
                placeholder="Subscription Fees"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="event_type"
              rules={[
                {
                  required: true,
                  message: EVENT_TYPE,
                },
              ]}
            >
              <Select
                placeholder="Event Type"
                showSearch={false}
                showArrow={true}
                size="middle"
              >
                {eventType
                  ? eventType.map((typeObject) => {
                      return (
                        <Option key={typeObject.id} value={typeObject.id}>
                          {typeObject.type}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </Form.Item>
            <Form.Item
              name="no_of_tickets"
              rules={[
                {
                  pattern: NUMBERSVALIDATION,
                  message: ONLY_NUMERIC,
                },
                {
                  required: true,
                  message: EVENT_CAPACITY,
                },
              ]}
            >
              <Input
                size="large"
                maxLength={255}
                placeholder="Number of Tickets"
                className="input-style"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please provide a description for the event!",
              },
              { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
            ]}
          >
            <Input.TextArea
              placeholder="Description"
              maxLength={255}
              autoSize={{ minRows: 4, maxRows: 4 }}
              className="input-textarea"
            />
          </Form.Item>
          {hasErrored && <div className="error-message">{errorMessage}</div>}
          <div className="button-container">
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="save-button">
              {updateType ? "Update" : "Save"}
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
  updateType: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool,
  errorMessage: PropTypes.string,
  eventType: PropTypes.array,
};
export function UpdateEventForm(props) {
  const {
    values,
    handleSubmit,
    handleCancel,
    updateType,
    hasErrored,
    errorMessage,
    eventType,
  } = props;
  const {
    name,
    external_links,
    location,
    date,
    time,
    subscription_fee = 0,
    event_type,
    description,
    no_of_tickets,
    images,
    sold_tickets,
  } = values;
  const ifSubscribed = sold_tickets > 0 ? true : false;
  let dateTime = "";
  if (date && time) {
    dateTime = date + " " + time;
  }
  const [isChecked, setSwitch] =
    subscription_fee && subscription_fee !== 0
      ? useState(true)
      : useState(false);
  const [eventDate, setDate] = dateTime
    ? useState(moment(dateTime, "YYYY-MM-DD hh:mm:ss"))
    : useState("");
  const [file, setFile] = useState({});
  const [currentImg, setImage] = useState({});

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
    data.date = moment(eventDate).format("YYYY-MM-DD");
    data.time = moment(eventDate).format("HH:mm:ss");
    if (!isChecked) {
      delete data.subscription_fee;
      data.subscription_fee = 0;
    }
    data = { ...data, imageFile: file };
    if (images && images != "") {
      data.images = images;
    }
    handleSubmit(data);
  }

  return (
    <div className="event-form-container">
      <div>
        <div className="event-image">
          <img
            src={
              currentImg.name
                ? URL.createObjectURL(currentImg)
                : images && images !== ""
                ? images
                : emptyImg
            }
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
            name: name,
            external_links: external_links,
            location: location,
            date: date,
            subscription_fee: subscription_fee,
            event_type: event_type,
            no_of_tickets: no_of_tickets,
            description: description,
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: EVENT_NAME },
              { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
            ]}
          >
            <Input size="large" maxLength={32} placeholder="Event Name" />
          </Form.Item>
          <Form.Item
            name="external_links"
            rules={[
              {
                pattern: URLVALIDATION,
                message: URL_VALID,
              },
              { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
            ]}
          >
            <Input size="large" placeholder="URL" />
          </Form.Item>
          <div className="form-middle-grid">
            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: EVENT_LOCATION,
                },
                { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
              ]}
            >
              <Input
                size="large"
                maxLength={255}
                placeholder="Location"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: eventDate === "",
                  message: EVENT_DATE,
                },
              ]}
            >
              <DatePicker
                allowClear={false}
                showTime
                placeholder="Select Date & Time"
                format={"DD-MM-YYYY hh:mm A"}
                value={eventDate ? moment(eventDate) : null}
                onChange={handleDateChange}
                disabledDate={(current) => {
                  return current && current < moment().startOf("day");
                }}
                className="input-style-date"
              />
              <br />
            </Form.Item>
            <div className="input-style-switch">
              Chargeable event?
              <Switch
                checked={isChecked ? isChecked : false}
                onChange={handleSwitchChange}
                disabled={ifSubscribed}
                size="default"
              />
              <pre>{isChecked ? "Yes" : "No "}</pre>
            </div>
            <Form.Item
              name="subscription_fee"
              rules={[
                {
                  pattern: isChecked ? NUMBERSVALIDATION : MATCH_ANYTHING,
                  message: ONLY_NUMERIC,
                },
                {
                  required: isChecked,
                  message: EVENT_FEES,
                },
              ]}
            >
              <Input
                size="large"
                maxLength={255}
                disabled={!isChecked || ifSubscribed}
                placeholder="Subscription Fees"
                className="input-style"
              />
            </Form.Item>
            {ifSubscribed && (
              <div className="fees-error">
                * Fee cannot be updated because users have already subscribed to
                the event.
              </div>
            )}
            <Form.Item
              name="event_type"
              rules={[
                {
                  required: true,
                  message: EVENT_TYPE,
                },
              ]}
            >
              <Select
                placeholder="Event Type"
                showSearch={false}
                showArrow={true}
                size="middle"
              >
                {eventType
                  ? eventType.map((typeObject) => {
                      return (
                        <Option key={typeObject.id} value={typeObject.id}>
                          {typeObject.type}
                        </Option>
                      );
                    })
                  : null}
              </Select>
            </Form.Item>
            <Form.Item
              name="no_of_tickets"
              rules={[
                {
                  pattern: NUMBERSVALIDATION,
                  message: ONLY_NUMERIC,
                },
                {
                  required: true,
                  message: EVENT_CAPACITY,
                },
              ]}
            >
              <Input
                size="large"
                maxLength={255}
                placeholder="Number of Tickets"
                className="input-style"
              />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
            rules={[
              {
                required: true,
                message: "Please provide a description for the event!",
              },
              { pattern: WHITESPACE_VALIDATION, message: ONLY_WHITESPACE },
            ]}
          >
            <Input.TextArea
              placeholder="Description"
              maxLength={255}
              autoSize={{ minRows: 4, maxRows: 4 }}
              className="input-textarea"
            />
          </Form.Item>
          {hasErrored && <div className="error-message">{errorMessage}</div>}
          <div className="button-container">
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="save-button">
              {updateType ? "Update" : "Save"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
UpdateEventForm.propTypes = {
  values: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  updateType: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool,
  errorMessage: PropTypes.string,
  eventType: PropTypes.array,
};
