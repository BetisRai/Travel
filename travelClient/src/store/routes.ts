import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface routesProps {
  routes: any[];
}

const initialState: routesProps = {
  routes: [],
};

export const routesSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addRoutes: (state, action: PayloadAction<any>) => {
      state.routes = [...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRoutes } = routesSlice.actions;

export default routesSlice.reducer;
