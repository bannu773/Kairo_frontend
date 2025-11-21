import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tasksAPI } from '../../services/api';

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.getTasks(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.getTask(taskId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.createTask(taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.updateTask(taskId, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await tasksAPI.deleteTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const syncEmails = createAsyncThunk(
  'tasks/syncEmails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.syncEmails();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPollingStatus = createAsyncThunk(
  'tasks/getPollingStatus',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tasksAPI.getPollingStatus();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    currentTask: null,
    filter: {
      status: '',
      priority: '',
    },
    loading: false,
    updating: false, // New: separate loading state for updates
    syncing: false,
    error: null,
    syncResult: null,
    pollingStatus: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearSyncResult: (state) => {
      state.syncResult = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // New: Optimistic update for task status
    optimisticUpdateTaskStatus: (state, action) => {
      const { taskId, status } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks || [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Task
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.updating = true; // Use updating instead of loading
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.updating = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?.id === action.payload.id) {
          state.currentTask = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
        // Optionally: revert optimistic update on error
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
        if (state.currentTask?.id === action.payload) {
          state.currentTask = null;
        }
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sync Emails
      .addCase(syncEmails.pending, (state) => {
        state.syncing = true;
        state.error = null;
      })
      .addCase(syncEmails.fulfilled, (state, action) => {
        state.syncing = false;
        state.syncResult = action.payload;
      })
      .addCase(syncEmails.rejected, (state, action) => {
        state.syncing = false;
        state.error = action.payload;
      })
      // Get Polling Status
      .addCase(getPollingStatus.fulfilled, (state, action) => {
        state.pollingStatus = action.payload;
      });
  },
});

export const { setFilter, clearSyncResult, clearError, optimisticUpdateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
