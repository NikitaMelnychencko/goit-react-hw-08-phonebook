import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://61ea87adc9d96b0017700bc7.mockapi.io';

const fetchContacts = createAsyncThunk(
  'contacts/fetchItem',
  async (_, { rejectWithValue }) => {
    try {
      const contact = await axios.get('/contacts');
      return contact.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
const fetchContactById = createAsyncThunk(
  'contacts/fetchItemById',
  async (id, { rejectWithValue }) => {
    try {
      const contact = await axios.get(`/contacts/${id}`);
      return contact.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const addContacts = createAsyncThunk(
  'contacts/addItem',
  async (contactData, { rejectWithValue }) => {
    try {
      const contact = await axios.post('/contacts', contactData);
      return contact.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const dellContacts = createAsyncThunk(
  'contacts/dellItem',
  async (id, { rejectWithValue }) => {
    try {
      const contact = await axios.delete(`/contacts/${id}`);
      console.log(contact);
      return id;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const updateContacts = createAsyncThunk(
  'contacts/updateItem',
  async ({ contactData, contactId }, { rejectWithValue }) => {
    try {
      const contact = await axios.put(`/contacts/${contactId}`, contactData);
      return contact.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export default {
  fetchContacts,
  fetchContactById,
  addContacts,
  dellContacts,
  updateContacts,
};
