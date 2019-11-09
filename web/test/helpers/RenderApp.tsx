import React from "react";
import * as ReactDOM from "react-dom";
import AppRoot from "../../src/AppRoot";

export const renderApp = () => {
  let div = document.querySelector("#root");
  if (div) {
    ReactDOM.unmountComponentAtNode(div);
  } else {
    div = document.createElement("div");
    div.id = "root";
    document.querySelector("body").appendChild(div);
  }

  ReactDOM.render(<AppRoot />, div);

  return wait();
};

export const wait = (timeout: number = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

export const find = (selector: string): HTMLElement => {
  const el = document.querySelector(selector) as HTMLElement;
  if (!el) {
    fail(`Could not find element for selector: ${selector}`);
  }
  return el;
};
