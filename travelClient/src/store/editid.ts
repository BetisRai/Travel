import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface editId {
  id: string;
}

const initialState: editId = {
  id: "",
};

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    added: (state, action: PayloadAction<any>) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { added } = editSlice.actions;

export default editSlice.reducer;
