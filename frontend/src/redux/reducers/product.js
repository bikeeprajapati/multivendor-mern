import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
};

export const productReducer = createReducer(initialState, (builder) => {});
