import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSearchSongs } from '../api/searchApi';

export const searchSongsAsync = createAsyncThunk(
  'search/fetchSongs',
  async (query, thunkAPI) => {
    const response = await fetchSearchSongs(query);
    if (!response.success) {
      return thunkAPI.rejectWithValue(response.error || 'Search failed');
    }
    return response.data || [];
  },
);

const initialState = {
  results: [],
  status: 'idle',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.results = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchSongsAsync.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(searchSongsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(searchSongsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
