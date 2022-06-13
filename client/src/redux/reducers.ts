import { combineReducers } from "@reduxjs/toolkit";
import { currentTodoEntriesSlice } from "./slices/currentTodoEntriesSlice";
import { currentTodoListsSlice } from "./slices/currentTodoListSlice";
import { modalStateSlice } from "./slices/modalStateSlice";
import { selectedTodoListSlice } from "./slices/selectedTodoListSlice";

const reducers = combineReducers({
   selectedTodoList: selectedTodoListSlice.reducer,
   currentTodoEntries: currentTodoEntriesSlice.reducer,
   currentTodoLists: currentTodoListsSlice.reducer,
   modalState: modalStateSlice.reducer,
});

export default reducers;
export type StateType = ReturnType<typeof reducers>;
