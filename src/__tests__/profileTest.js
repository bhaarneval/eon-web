/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import Profile from "../containers/profile/profile";
import BackButton from "../components/commonComponents/backButton";
import ProfileForm from "../components/profile/profileForm";

const store = createStore(rootReducer);

const userProfile = {
  id: 12,
  name: "John Doe",
  address: "address",
  email: "abc@xyz.com",
  contact: "1212121212",
  organization: "abc",
  interest:[
    {
      id: 1,
      type: "Sports",
    },
    {
      id: 2,
      type: "festival",
    },
  ]
};
const profileComponent = (
  <Profile
    store={store}
    history={{
      push: (text) => {
        console.log(text + " called");
      },
    }}
    userProfile={userProfile}
  />
);

configure({ adapter: new Adapter() });
describe("Profile components", () => {
  it("number of Components", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(".create-container")).toHaveLength(1);
  });
  it("number of back button components", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(BackButton)).toHaveLength(1);
  });
  it("number of header field", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    expect(wrapper.find(".header")).toHaveLength(1);
  });
  it("number of form div field", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      userProfile: userProfile,
    });
    expect(wrapper.find(".form-div")).toHaveLength(1);
  });
  it("number of Profile form  field", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      userProfile: userProfile,
    });
    expect(wrapper.find(ProfileForm)).toHaveLength(1);
  });
  it("handle submit", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();

    wrapper
      .instance()
      .handleSubmit({
        name: "abc",
        email: "abc@xyz.com",
        contact_number: "1234567890",
        address: "address",
        organization: "xyz",
      });
  });
  it("handle submit without error", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      updateUserProfile: ({ callback }) => callback(),
    });
    wrapper.setState({
      disableButton: true,
    });
    expect(wrapper.state("disableButton")).toBe(true);
    wrapper
      .instance()
      .handleSubmit({
        name: "abc",
        email: "abc@xyz.com",
        contact_number: "1234567890",
        address: "address",
        organization: "xyz",
      });
    expect(wrapper.state("disableButton")).toBe(false);
  });
  it("handle submit without error", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();
    wrapper.setProps({
      updateUserProfile: ({ callback }) => callback("error"),
    });
    wrapper.setState({
      disableButton: true,
    });
    expect(wrapper.state("disableButton")).toBe(true);
    wrapper
      .instance()
      .handleSubmit({
        name: "abc",
        email: "abc@xyz.com",
        contact_number: "1234567890",
        address: "address",
        organization: "xyz",
      });
    expect(wrapper.state("disableButton")).toBe(true);
  });
  it("handle go back", () => {
    const wrapper = shallow(profileComponent)
      .dive({ context: { store } })
      .dive();

    wrapper.instance().goBack();
  });
});

const handleSubmit = sinon.spy();
const profileForm = (
  <ProfileForm
    values={userProfile}
    handleSubmit={handleSubmit}
    handleCancel={handleSubmit}
    role={"organizer"}
    interestList={[
      {
        id: 1,
        type: "Sports",
      },
      {
        id: 2,
        type: "festival",
      },
    ]}
    disableButton={false}
  />
);
describe("Profile components", () => {
  it("number of form conatiner for organizer", () => {
    const wrapper = shallow(profileForm)
    expect(wrapper.find(".changePasswordContainer")).toHaveLength(1);
  });
  it("number of form conatiner for subscribers", () => {
    const wrapper = shallow(profileForm)
    wrapper.setProps({
      role: "subscriber"
    })
    expect(wrapper.find(".event-form-container")).toHaveLength(1);
  });
});
