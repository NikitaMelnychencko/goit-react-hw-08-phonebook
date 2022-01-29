import { createSlice } from '@reduxjs/toolkit';
import operation from './auth-operation';

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    //====signUp====//
    //[operation.signUp.pending]: (state, action) => {},
    [operation.signUp.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    //[operation.signUp.rejected]: (state, action) => {},
    //====signIn====//
    //[operation.signIn.pending]: (state, action) => {},
    [operation.signIn.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isLoggedIn = true;
    },
    //[operation.signIn.rejected]: (state, action) => {},
    //====logOut====//
    //[operation.logOut.pending]: (state, action) => {},
    [operation.logOut.fulfilled]: (state, { payload }) => {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    //[operation.logOut.rejected]: (state, action) => {},
    //====refreshCurrentUser====//
    //[operation.refreshCurrentUser.pending]: (state, action) => {},
    [operation.refreshCurrentUser.fulfilled]: (state, { payload }) => {
      state.user = { ...payload };
      state.isLoggedIn = true;
    },
    //[operation.refreshCurrentUser.rejected]: (state, action) => {},
  },
});
export default authSlice.reducer;
