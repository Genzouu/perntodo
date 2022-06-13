import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoListType } from "../../components/TodoList";

const todoListsInitState: TodoListType[] = [];

export const currentTodoListsSlice = createSlice({
   name: "currentTodoEntries",
   initialState: todoListsInitState,
   reducers: {
      setTodoLists: (state, action: PayloadAction<TodoListType[]>) => {
         return (state = action.payload);
      },
   },
});

export const { setTodoLists } = currentTodoListsSlice.actions;
