import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export const userReducer = createReducer(initialState, (builder) => {});
