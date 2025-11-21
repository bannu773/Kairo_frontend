import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { meetingsAPI } from '../../services/api';

// Async thunks
export const fetchMeetings = createAsyncThunk(
  'meetings/fetchMeetings',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.getMeetings(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMeeting = createAsyncThunk(
  'meetings/fetchMeeting',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.getMeeting(meetingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTranscript = createAsyncThunk(
  'meetings/fetchTranscript',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.getTranscript(meetingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchSummary = createAsyncThunk(
  'meetings/fetchSummary',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.getSummary(meetingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const syncMeetings = createAsyncThunk(
  'meetings/syncMeetings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.syncMeetings();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const processMeeting = createAsyncThunk(
  'meetings/processMeeting',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.processMeeting(meetingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMeetingStats = createAsyncThunk(
  'meetings/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.getStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTasksFromMeeting = createAsyncThunk(
  'meetings/fetchTasksFromMeeting',
  async (meetingId, { rejectWithValue }) => {
    try {
      const response = await meetingsAPI.getTasksFromMeeting(meetingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const meetingsSlice = createSlice({
  name: 'meetings',
  initialState: {
    meetings: [],
    currentMeeting: null,
    transcript: null,
    summary: null,
    relatedTasks: [],
    stats: null,
    pagination: {
      page: 1,
      pages: 1,
      total: 0,
      per_page: 10,
    },
    loading: false,
    syncing: false,
    processing: false,
    error: null,
  },
  reducers: {
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMeeting: (state) => {
      state.currentMeeting = null;
      state.transcript = null;
      state.summary = null;
      state.relatedTasks = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Meetings
      .addCase(fetchMeetings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.loading = false;
        state.meetings = action.payload.meetings || [];
        state.pagination = action.payload.pagination || state.pagination;
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Meeting
      .addCase(fetchMeeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMeeting = action.payload;
      })
      .addCase(fetchMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Transcript
      .addCase(fetchTranscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTranscript.fulfilled, (state, action) => {
        state.loading = false;
        state.transcript = action.payload;
      })
      .addCase(fetchTranscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Summary
      .addCase(fetchSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sync Meetings
      .addCase(syncMeetings.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncMeetings.fulfilled, (state, action) => {
        state.syncing = false;
      })
      .addCase(syncMeetings.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.payload;
      })
      // Process Meeting
      .addCase(processMeeting.pending, (state) => {
        state.processing = true;
        state.error = null;
      })
      .addCase(processMeeting.fulfilled, (state, action) => {
        state.processing = false;
      })
      .addCase(processMeeting.rejected, (state, action) => {
        state.processing = false;
        state.error = action.payload;
      })
      // Fetch Stats
      .addCase(fetchMeetingStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      // Fetch Tasks from Meeting
      .addCase(fetchTasksFromMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksFromMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedTasks = action.payload;
      })
      .addCase(fetchTasksFromMeeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPagination, clearError, clearCurrentMeeting } = meetingsSlice.actions;
export default meetingsSlice.reducer;
