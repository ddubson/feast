import {AppRoot} from "../src/AppRoot";
import React from "react";
import {mount} from "enzyme";

describe("AppRoot", () => {
    it("should load", () => {
        const wrapper = mount(<AppRoot />);
        expect(wrapper).toBeTruthy();
    });
});