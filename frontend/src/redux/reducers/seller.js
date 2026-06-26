import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  seller: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {});
