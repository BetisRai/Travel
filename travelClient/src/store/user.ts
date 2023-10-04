import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface userInfoState {
  userid: string;
}

const initialState: userInfoState = {
  userid: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<any>) => {
      state.userid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setuser } = counterSlice.actions;

export default counterSlice.reducer;
