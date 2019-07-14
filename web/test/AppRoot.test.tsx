import {mount} from "enzyme";
import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {AppRoot} from "../src/AppRoot";
import {initialRecipeStore} from "../src/core/recipe-store";

const store = configureStore()(initialRecipeStore);

describe("AppRoot", () => {
  it("should load", () => {
    const wrapper = mount(<Provider store={store}><AppRoot /></Provider>);
    expect(wrapper).toBeTruthy();
  });
});
