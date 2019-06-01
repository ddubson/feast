import {combineReducers, Reducer} from "redux";
import {recipeStoreReducer} from "./recipe-store-reducer";

const rootReducer: Reducer = combineReducers({
  recipeStore: recipeStoreReducer,
});

export default rootReducer;
