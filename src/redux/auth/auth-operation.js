import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';
const token = {
  set(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common['Authorization'] = ``;
  },
};

const signUp = createAsyncThunk('auth/signUp', async credentials => {
  try {
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (error) {}
});

const signIn = createAsyncThunk('auth/signIn', async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {}
});

const logOut = createAsyncThunk('auth/logOut', async credentials => {
  try {
    const { data } = await axios.post('/users/logout');
    token.unset();
    return data;
  } catch (error) {}
});
const refreshCurrentUser = createAsyncThunk(
  'auth/refreshCurrentUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const persistedToken = state.auth.token;
    console.log(persistedToken);
    if (persistedToken === null) return;
    token.set(persistedToken);
    try {
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {}
  },
);

export default {
  signUp,
  signIn,
  logOut,
  refreshCurrentUser,
};
