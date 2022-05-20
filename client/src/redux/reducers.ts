import { combineReducers } from "@reduxjs/toolkit";
import { selectedTodoListReducer } from "./slices/selectedTodoListSlice";

const reducers = combineReducers({
   selectedTodoList: selectedTodoListReducer,
});

export default reducers;
export type StateType = ReturnType<typeof reducers>;
