/* eslint-disable no-undef */
/* eslint-env mocha */
import React from "react";
import rootReducer from "../reducers/rootReducer";
import { createStore } from "redux";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Profile from "../containers/profile/profile";
import BackButton from "../components/commonComponents/backButton";
import ProfileForm from "../components/profile/profileForm";

const store = createStore(rootReducer);

const userProfile = {id:12, name:"John Doe", address:"address", email:"abc@xyz.com", contact:"1212121212", organization:"abc"}
const profileComponent = <Profile store={store} history={{push:(text)=>{console.log(text+' called')}}} userProfile={userProfile}/>;

configure({ adapter: new Adapter() });
describe("Profile components", () => {

  it("number of Components", () => {
    const wrapper = shallow(profileComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".create-container")).toHaveLength(1);
  });
  it("number of back button components", () => {
    const wrapper = shallow(profileComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(BackButton)).toHaveLength(1);
  });
  it("number of header field", () => {
    const wrapper = shallow(profileComponent).dive({ context: { store } }).dive();
    expect(wrapper.find(".header")).toHaveLength(1);
  });
  it("number of form div field", () => {
    const wrapper = shallow(profileComponent).dive({ context: { store } }).dive();
    wrapper.setProps({
        userProfile: userProfile
    })
    expect(wrapper.find(".form-div")).toHaveLength(1);
  });
  it("number of Profile form  field", () => {
    const wrapper = shallow(profileComponent).dive({ context: { store } }).dive();
    wrapper.setProps({
        userProfile: userProfile
    })
    expect(wrapper.find(ProfileForm)).toHaveLength(1);
  });
});
