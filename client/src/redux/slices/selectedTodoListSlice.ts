import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const selectedTodoListSlice = createSlice({
   name: "selectedTodoList",
   initialState: -1,
   reducers: {
      setSelectedTodoList: (state, action: PayloadAction<number>) => {
         state = action.payload;
      },
   },
});

export const { setSelectedTodoList } = selectedTodoListSlice.actions;
export const selectedTodoListReducer = selectedTodoListSlice.reducer;