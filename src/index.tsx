import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {AppRoot} from "./AppRoot";
import rootReducer from "./core/root-reducer";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
  document.getElementById("root"),
);
