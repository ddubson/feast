import React from "react";
import AppRoot from "../src/AppRoot";
import {render} from "@testing-library/react";
import {buildComponent} from "./helpers/RenderApp";

describe("AppRoot", () => {
  it("should display the app title", () => {
    const {getByText} = render(buildComponent(<AppRoot/>));

    expect(getByText("Feast")).toBeTruthy();
  });
});
