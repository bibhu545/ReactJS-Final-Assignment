import { createStore } from "redux";
import { commonReducer } from "./Reducer";

export const store = createStore(commonReducer)