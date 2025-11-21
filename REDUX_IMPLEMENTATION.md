# Redux Store Implementation Guide

## 📦 Installation

First, install the required Redux packages:

```bash
cd "d:\Blog and Marathon_2\frontend"
npm install @reduxjs/toolkit react-redux
```

## 🏗️ Structure

The Redux store has been set up with the following structure:

```
src/
├── store/
│   ├── index.js                 # Store configuration
│   ├── hooks.js                 # Custom hooks for easier usage
│   └── slices/
│       ├── authSlice.js         # Authentication state
│       ├── tasksSlice.js        # Tasks state
│       └── meetingsSlice.js     # Meetings state
```

## 🔧 Store Configuration

The store is configured in `src/store/index.js` with three main slices:
- **auth**: User authentication and profile
- **tasks**: Task management
- **meetings**: Meeting management

## 📝 Usage Examples

### 1. Using Redux in Components

#### Import hooks and actions:
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../store/slices/tasksSlice';
```

#### Access state:
```javascript
function MyComponent() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.auth);
  
  // ... component logic
}
```

### 2. Auth Slice

#### Available Actions:
```javascript
import { fetchCurrentUser, logout, setToken, clearAuth } from '../../store/slices/authSlice';

// Fetch current user
dispatch(fetchCurrentUser());

// Logout
dispatch(logout());

// Set token manually
dispatch(setToken('your-token'));

// Clear auth state
dispatch(clearAuth());
```

#### State Structure:
```javascript
{
  user: null,              // User object
  token: null,             // JWT token
  loading: false,          // Loading state
  error: null,             // Error message
  isAuthenticated: false   // Authentication status
}
```

### 3. Tasks Slice

#### Available Actions:
```javascript
import { 
  fetchTasks, 
  fetchTask, 
  createTask, 
  updateTask, 
  deleteTask, 
  syncEmails,
  setFilter,
  setPagination 
} from '../../store/slices/tasksSlice';

// Fetch all tasks with filters
dispatch(fetchTasks({ status: 'pending', priority: 'high', page: 1 }));

// Fetch single task
dispatch(fetchTask(taskId));

// Create task
dispatch(createTask({ title: 'New Task', description: '...' }));

// Update task
dispatch(updateTask({ taskId: 123, taskData: { status: 'completed' } }));

// Delete task
dispatch(deleteTask(taskId));

// Sync emails
dispatch(syncEmails());

// Set filters
dispatch(setFilter({ status: 'pending', priority: 'high' }));

// Set pagination
dispatch(setPagination({ page: 2 }));
```

#### State Structure:
```javascript
{
  tasks: [],               // Array of tasks
  currentTask: null,       // Single task details
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    per_page: 10
  },
  filter: {
    status: '',
    priority: ''
  },
  loading: false,          // Loading state
  syncing: false,          // Email sync state
  error: null,             // Error message
  syncResult: null,        // Sync result
  pollingStatus: null      // Polling status
}
```

### 4. Meetings Slice

#### Available Actions:
```javascript
import { 
  fetchMeetings, 
  fetchMeeting, 
  fetchTranscript, 
  fetchSummary,
  syncMeetings,
  processMeeting,
  fetchMeetingStats,
  fetchTasksFromMeeting 
} from '../../store/slices/meetingsSlice';

// Fetch all meetings
dispatch(fetchMeetings({ page: 1, per_page: 10 }));

// Fetch single meeting
dispatch(fetchMeeting(meetingId));

// Fetch transcript
dispatch(fetchTranscript(meetingId));

// Fetch summary
dispatch(fetchSummary(meetingId));

// Sync meetings
dispatch(syncMeetings());

// Process meeting
dispatch(processMeeting(meetingId));

// Fetch stats
dispatch(fetchMeetingStats());

// Fetch tasks from meeting
dispatch(fetchTasksFromMeeting(meetingId));
```

#### State Structure:
```javascript
{
  meetings: [],            // Array of meetings
  currentMeeting: null,    // Single meeting details
  transcript: null,        // Meeting transcript
  summary: null,           // Meeting summary
  relatedTasks: [],        // Tasks from meeting
  stats: null,             // Meeting statistics
  pagination: {
    page: 1,
    pages: 1,
    total: 0,
    per_page: 10
  },
  loading: false,          // Loading state
  syncing: false,          // Sync state
  processing: false,       // Processing state
  error: null              // Error message
}
```

## 🎯 Custom Hooks

Use custom hooks for cleaner code:

```javascript
import { useAuth, useTasks, useMeetings } from '../../store/hooks';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  const { tasks, loading } = useTasks();
  const { meetings } = useMeetings();
  
  // ... component logic
}
```

## 🔄 Async Actions with Error Handling

```javascript
const handleCreateTask = async () => {
  try {
    const result = await dispatch(createTask(taskData)).unwrap();
    console.log('Task created:', result);
    // Handle success
  } catch (error) {
    console.error('Failed to create task:', error);
    // Handle error
  }
};
```

## 🎨 Complete Component Example

```javascript
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../store/slices/tasksSlice';

function TaskManager() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Load tasks on mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Create task
  const handleCreateTask = async () => {
    try {
      await dispatch(createTask({
        title: newTaskTitle,
        description: 'Task description'
      })).unwrap();
      setNewTaskTitle('');
      alert('Task created successfully!');
    } catch (error) {
      alert('Failed to create task');
    }
  };

  // Update task status
  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await dispatch(updateTask({
        taskId,
        taskData: { status: newStatus }
      })).unwrap();
    } catch (error) {
      alert('Failed to update task');
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      alert('Task deleted successfully!');
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Tasks</h1>
      
      {/* Create Task */}
      <div>
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
        />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>

      {/* Task List */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            <button onClick={() => handleUpdateStatus(task.id, 'completed')}>
              Mark Complete
            </button>
            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
```

## 🚀 Benefits of Using Redux

1. **Centralized State**: All application state in one place
2. **Predictable**: State changes are predictable and traceable
3. **Debugging**: Redux DevTools for time-travel debugging
4. **Performance**: Optimized re-renders with selectors
5. **Code Organization**: Clear separation of concerns
6. **Async Handling**: Built-in async action handling with createAsyncThunk

## 🔍 Redux DevTools

Install the Redux DevTools browser extension to debug your store:
- [Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

## 📚 Files Modified

The following files have been updated to use Redux:
- ✅ `src/App.js` - Added Redux Provider
- ✅ `src/components/Dashboard/Dashboard.js` - Updated to use Redux hooks and actions

## 🎯 Next Steps

To complete the Redux implementation in your app:

1. **Install packages**:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. **Update other components** to use Redux:
   - `TaskForm.js` - Use `createTask` action
   - `TaskList.js` - Use `updateTask`, `deleteTask` actions
   - `MeetingList.js` - Use `fetchMeetings`, `syncMeetings` actions
   - `MeetingSummary.js` - Use `fetchSummary`, `fetchTranscript` actions
   - `Login.js` - Use `setToken` action
   - `AuthCallback.js` - Use `setToken`, `fetchCurrentUser` actions

3. **Start your development server**:
   ```bash
   npm start
   ```

## 🐛 Troubleshooting

### Common Issues:

1. **"Cannot find module '@reduxjs/toolkit'"**
   - Make sure you ran `npm install @reduxjs/toolkit react-redux`

2. **State not updating**
   - Check if you're dispatching actions correctly
   - Verify the action payload structure

3. **Too many re-renders**
   - Use `useCallback` for event handlers
   - Memoize selectors with `createSelector` from `reselect`

## 📖 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
- [Redux Best Practices](https://redux.js.org/style-guide/style-guide)
