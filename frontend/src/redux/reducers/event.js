import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allEvents: [],
};

export const eventReducer = createReducer(initialState, (builder) => {});
