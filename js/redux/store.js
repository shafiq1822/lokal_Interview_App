import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://testapi.getlokalapp.com/common/jobs';

const CACHE_KEY = 'job_cache';
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { getState }) => {
  const state = getState().jobs;
  
  const cachedData = await AsyncStorage.getItem(CACHE_KEY);
  if (cachedData) {
    const parsedCache = JSON.parse(cachedData);
    if (Date.now() - parsedCache.timestamp < CACHE_EXPIRATION_TIME) {
      return { data: parsedCache.data, fromCache: true };
    }
  }

  const response = await axios.get(`${API_URL}?page=${state.page}`);
  const newData = [...state.jobs, ...response.data.data];

  await AsyncStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ data: newData, timestamp: Date.now() })
  );

  return { data: newData, fromCache: false };
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    page: 1,
    expandedItem: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    expandItem: (state, action) => {
      state.expandedItem = state.expandedItem === action.payload ? null : action.payload;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetPage: (state) => {
      state.page = 1;
      state.jobs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.data;
        state.isLoading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { expandItem, incrementPage, resetPage } = jobsSlice.actions;

const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
  },
});

export default store;
