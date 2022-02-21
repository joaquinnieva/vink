import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.session = action.payload;
    },
    logout: (state) => {
      state.session = false;
    },
  },
});

export const { login, logout, setSession } = authSlice.actions;

export default authSlice.reducer;
