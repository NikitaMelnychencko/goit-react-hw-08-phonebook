import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
      console.log(contactData);
      const contact = await axios.patch(`/contacts/${contactId}`, contactData);
      return { ...contact.data, id: contactId };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

export default {
  fetchContacts,
  addContacts,
  dellContacts,
  updateContacts,
};
