import React, { useState } from "react";
import PropTypes from "prop-types";
import "./eventForm.css";
import { Upload, Button, Form, Input, Switch, DatePicker, Select } from "antd";
import emptyImg from "../../assets/image.svg";
import uploadImg from "../../assets/Upload Image.svg";
import moment from "moment";

import { URLVALIDATION, NUMBERSVALIDATION, MATCH_ANYTHING } from "../../constants/constants";
import { EVENT_NAME,URL_VALID,ONLY_NUMERIC,EVENT_LOCATION,EVENT_DATE,EVENT_TYPE,EVENT_CAPACITY,EVENT_FEES} from '../../constants/messages';

const {Option}=Select;
export function EventForm(props) {
  const { values, handleSubmit, handleCancel,updateType, hasErrored, errorMessage, eventType } = props;
  const {
    name,
    external_links,
    location,
    date,
    time,
    subscription_fee=0,
    event_type,
    description,
    no_of_tickets,
    images
  } = values;
  let dateTime ="";
  if(date && time){
    dateTime =  date+" "+time;
  }
  const [isChecked, setSwitch] = subscription_fee && subscription_fee!==0?useState(true):useState(false);
  const [eventDate, setDate] = dateTime? useState(moment(dateTime,"YYYY-MM-DD hh:mm:ss")) : useState("");
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
    data.time = moment(eventDate).format("HH:mm");
    data = {...data, imageFile:file};
    if(!isChecked){
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
            rules={[{ required: true, message: EVENT_NAME }]}
          >
            <Input size="large" placeholder="Event Name" />
          </Form.Item>
          <Form.Item
            name="external_links"
            rules={[
              {
                pattern: URLVALIDATION,
                message: URL_VALID,
              },
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
              ]}
            >
              <Input
                size="large"
                placeholder="Location"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: date === "",
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
                size="large"
                showSearch={false}
                showArrow={true}
                style={{ height: "3em" }}
              >
                {eventType?eventType.map(typeObject => {
                    return (
                    <Option key={typeObject.id} value = {typeObject.id}>{typeObject.type}</Option>
                    )
                }):null}
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
          {hasErrored && <div className="error-message">{errorMessage}</div>}
          <div className="button-container">
            <Button className="cancel-button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="save-button">
              {updateType? "Update" : "Save"}
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
  const { values, handleSubmit, handleCancel,updateType, hasErrored, errorMessage, eventType } = props;
  const {
    name,
    external_links,
    location,
    date,
    time,
    subscription_fee=0,
    event_type,
    description,
    no_of_tickets,
    images
  } = values;
  let dateTime ="";
  if(date && time){
    dateTime =  date+" "+time;
  }
  const [isChecked, setSwitch] = subscription_fee && subscription_fee!==0?useState(true):useState(false);
  const [eventDate, setDate] = dateTime? useState(moment(dateTime,"YYYY-MM-DD hh:mm:ss")) : useState("");
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
    data.time = moment(eventDate).format("HH:mm");
    if(!isChecked){
      delete data.subscription_fee;
      data.subscription_fee = 0;
    }
    data = {...data, imageFile:file};
    if(images && images!=""){
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
            rules={[{ required: true, message: EVENT_NAME }]}
          >
            <Input size="large" placeholder="Event Name" />
          </Form.Item>
          <Form.Item
            name="external_links"
            rules={[
              {
                pattern: URLVALIDATION,
                message: URL_VALID,
              },
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
              ]}
            >
              <Input
                size="large"
                placeholder="Location"
                className="input-style"
              />
            </Form.Item>
            <Form.Item
              name="date"
              rules={[
                {
                  required: date === "",
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
                size="large"
                showSearch={false}
                showArrow={true}
                style={{ height: "3em" }}
              >
                {eventType?eventType.map(typeObject => {
                    return (
                    <Option key={typeObject.id} value = {typeObject.id}>{typeObject.type}</Option>
                    )
                }):null}
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
          {hasErrored && <div className="error-message">{errorMessage}</div>}
          <div className="button-container">
            <Button className="cancel-button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" className="save-button">
              {updateType? "Update" : "Save"}
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
