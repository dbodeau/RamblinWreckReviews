import { getCurrentUser } from '@aws-amplify/auth';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userGroups: [],
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateUserGroups: (state, action) => {
      state.userGroups = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.userGroups = [];
    }
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateUserGroups, clearUser } = authSlice.actions;

export default authSlice.reducer;