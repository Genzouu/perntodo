import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListType } from "../../components/TodoList";

export const selectedTodoListSlice = createSlice({
   name: "selectedTodoList",
   initialState: { id: -1, date: "" },
   reducers: {
      setSelectedTodoList: (state, action: PayloadAction<TodoListType>) => {
         return (state = action.payload);
      },
   },
});

export const { setSelectedTodoList } = selectedTodoListSlice.actions;
