import React from "react";
import AppRoot from "../src/AppRoot";
import {render} from "@testing-library/react";

describe("AppRoot", () => {
  it("should display the app title", () => {
    const { getByText } = render(<AppRoot />);
    expect(getByText("Feast")).toBeTruthy();
  });
});
