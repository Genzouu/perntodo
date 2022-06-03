import { createSlice } from "@reduxjs/toolkit";

const modalInitialState = { addTodoEntryModalState: false, addTodoListModalState: false };

export const modalStateSlice = createSlice({
   name: "modal",
   initialState: modalInitialState,
   reducers: {
      toggleAddTodoEntryModal: (state) => {
         state.addTodoEntryModalState = !state.addTodoEntryModalState;
      },
      toggleAddTodoListModal: (state) => {
         state.addTodoListModalState = !state.addTodoListModalState;
      },
   },
});

export const { toggleAddTodoEntryModal, toggleAddTodoListModal } = modalStateSlice.actions;
