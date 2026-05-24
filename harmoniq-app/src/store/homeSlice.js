import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTrendingSongs, searchHomeSongs } from '../api/homeApi';

const SEARCH_CONTINUE_QUERY = 'lofi beats';
const SEARCH_MADE_FOR_YOU_QUERY = 'AI generated playlist';
const SEARCH_NEW_HITS_QUERY = 'new hits';

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (_, thunkAPI) => {
    try {
      const [trending, continueListening, madeForYou, newHits] = await Promise.all([
        fetchTrendingSongs(),
        searchHomeSongs(SEARCH_CONTINUE_QUERY),
        searchHomeSongs(SEARCH_MADE_FOR_YOU_QUERY),
        searchHomeSongs(SEARCH_NEW_HITS_QUERY),
      ]);

      return { trending, continueListening, madeForYou, newHits };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  continueListening: [],
  trending: [],
  madeForYou: [],
  newHits: [],
  status: 'idle',
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchHomeData.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = action.payload.trending;
        const progressValues = [0.58, 0.24, 0.72, 0.35];
        state.continueListening = action.payload.continueListening
          .slice(0, 3)
          .map((item, index) => ({
            id: item.videoId || item.title,
            title: item.title,
            artist: item.artist,
            image: item.thumbnail,
            progress: progressValues[index] ?? 0.42,
          }));
        state.madeForYou = action.payload.madeForYou.slice(0, 4).map(item => ({
          ...item,
          id: item.videoId || item.title,
          image: item.thumbnail,
        }));
        state.newHits = action.payload.newHits.slice(0, 4).map(item => ({
          id: item.videoId || item.title,
          title: item.title,
          artist: item.artist,
          image: item.thumbnail,
        }));
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export default homeSlice.reducer;
