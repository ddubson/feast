import React from "react";
import AppRoot from "../src/AppRoot";
import {find, renderApp, textOf} from "./helpers/RenderApp";

describe("AppRoot", () => {
  beforeEach(() => {
    renderApp();
  });

  it("should display the app title", () => {
    expect(textOf(find("[data-test='app-title']"))).toEqual("Feast");
  });
});
