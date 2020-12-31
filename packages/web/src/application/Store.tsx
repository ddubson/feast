import React from "react";
import {createContext, useReducer} from "react";

type FeastState = {
  color: string;
};

const initialState: FeastState = {
  color: "blue",
}

enum ActionType {
  UPDATE_COLOR = "UPDATE_COLOR"
};

type FeastAction = { type: ActionType.UPDATE_COLOR };

type Store = {
  state: FeastState,
  dispatch?: React.Dispatch<any>
}

const store = createContext<Store>({ state: initialState });
const {Provider} = store;

const StateProvider = ({children}: { children: any }) => {
  const [state, dispatch] = useReducer((state: FeastState, action: FeastAction) => {
    switch (action.type) {
      case 'UPDATE_COLOR':
        return {...state, color: 'black'};
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {store, StateProvider};
