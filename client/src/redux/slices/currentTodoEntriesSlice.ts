import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../../components/Todo";

const todoEntriesInitState: TodoType[] = [];

export const currentTodoEntriesSlice = createSlice({
   name: "currentTodoEntries",
   initialState: todoEntriesInitState,
   reducers: {
      setTodoEntries: (state, action: PayloadAction<TodoType[]>) => {
         return (state = action.payload);
      },
   },
});

export const { setTodoEntries } = currentTodoEntriesSlice.actions;
