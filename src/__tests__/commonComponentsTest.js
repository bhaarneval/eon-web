/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import { shallow, configure } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import BackButton from "../components/commonComponents/backButton";
import Range from "../components/commonComponents/rangePicker";
import { DatePicker, Input, Select, Button } from "antd";
import moment from "moment";
import SearchBox from "../components/commonComponents/searchBox";
import SelectDropDown from "../components/commonComponents/selectDropdown";
import PDF from "../components/commonComponents/ticketPdf";
const { RangePicker } = DatePicker;

const handleOnClick = sinon.spy();
const backButton = (
  <BackButton handleOnClick={handleOnClick} text={"Sample Header"} />
);

configure({ adapter: new Adapter() });
describe("back button components", () => {
  it("numer of img components", () => {
    const wrapper = shallow(backButton);
    expect(wrapper.find("styles.header")).toHaveLength(0);
  });
});

const rangePicker = (startDate, endDate) => {
  return (
    <Range
      handleChange={handleOnClick}
      values={{ startDate: startDate, endDate: endDate }}
    />
  );
};
describe("RangePicker components", () => {
  it("numer of RangePicker components", () => {
    const wrapper = shallow(rangePicker("", ""));
    expect(wrapper.find(RangePicker)).toHaveLength(1);
    wrapper.find(RangePicker).simulate("change", {
      target: {
        value: [
          moment("12-03-2020", "DD-MM-YYYY"),
          moment("12-04-2020", "DD-MM-YYYY"),
        ],
      },
    });
  });
  it("startdate not null", () => {
    const wrapper = shallow(rangePicker("2020-03-12", "2020-04-25"));
    expect(wrapper.find(RangePicker)).toHaveLength(1);
  });
});

const searchBox = (
  <SearchBox
    handleKeyPress={handleOnClick}
    values={""}
    placeholder={"enter text here"}
  />
);

describe("SearchBox components", () => {
  it("numer of Input components", () => {
    const wrapper = shallow(searchBox);
    expect(wrapper.find(Input)).toHaveLength(1);
    wrapper.find(Input).simulate("change", {
      target: { value: "asfgasj" },
    });
    wrapper.find(Input).simulate("keypress", { key: "Enter" });
  });
});

const selectDropDown = (optionsList, value) => {
  return (
    <SelectDropDown
      optionsList={optionsList}
      handleChange={handleOnClick}
      placeholder={"some text"}
      value={value}
    />
  );
};
describe("Select Drop down components", () => {
  it("numer of Select components", () => {
    const wrapper = shallow(selectDropDown(["mayank", "kumar"], "some"));
    expect(wrapper.find(Select)).toHaveLength(1);
  });
  it("option list empty not null", () => {
    const wrapper = shallow(selectDropDown(null, ""));
    expect(wrapper.find(Select)).toHaveLength(1);
  });
});

const ticketPdf = (
  <PDF
    eventData={{
      date: "",
      time: "",
      location: "Banglore",
      name: "Mayank",
      subscription_details: {
        no_of_tickets_bought: 4,
        amount_paid: 12,
        created_on: "",
      },
    }}
    userData={{}}
  />
);

describe("Select Drop down components", () => {
  it("numer of Select components", () => {
    const wrapper = shallow(ticketPdf);
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
