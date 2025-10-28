import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InfoState {
  lastAction: string | null;
}

const initialState: InfoState = {
  lastAction: null,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setLastAction: (state, action: PayloadAction<string>) => {
      state.lastAction = action.payload;
    },
    resetLastAction: (state) => {
      state.lastAction = null;
    },
  },
});

export const { setLastAction, resetLastAction } = infoSlice.actions;
export { infoSlice };
export default infoSlice.reducer;
