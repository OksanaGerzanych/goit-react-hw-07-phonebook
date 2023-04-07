import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://642bcd3e208dfe25471fe088.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data; // При успішному запиті повертаємо проміс із даними
    } catch (event) {
      return thunkAPI.rejectWithValue(event.message); // При помилці запиту повертаємо проміс, який буде відхилений з текстом помилки
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({name, number}, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', {name, number});
      return response.data; 
    } catch (event) {
      return thunkAPI.rejectWithValue(event.message); 
    }
  }
);
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
    async (id, thunkAPI) => {
        try {
          const response = await axios.delete(`/contacts/${id}`);
          console.log(response.data)
          return response.data.id;

       
        } catch (event) {
            return thunkAPI.rejectWithValue(event.message);
        }
    });   
