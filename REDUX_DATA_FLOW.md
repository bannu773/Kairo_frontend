# Redux Data Flow Visualization

## 🔄 How Data Flows with Redux

```
┌─────────────────────────────────────────────────────────────────┐
│                         COMPONENT                                │
│                                                                  │
│  ┌────────────┐                              ┌────────────┐    │
│  │  Dispatch  │ ──────────────────────────>  │ useSelector│    │
│  │  Action    │                              │   (read)   │    │
│  └────────────┘                              └────────────┘    │
│        │                                            ▲           │
└────────│────────────────────────────────────────────│───────────┘
         │                                            │
         │                                            │
         ▼                                            │
┌─────────────────────────────────────────────────────────────────┐
│                      REDUX STORE                                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Auth Slice  │  │  Tasks Slice │  │Meetings Slice│         │
│  │              │  │              │  │              │         │
│  │ • user       │  │ • tasks[]    │  │ • meetings[] │         │
│  │ • token      │  │ • loading    │  │ • summary    │         │
│  │ • loading    │  │ • filter     │  │ • transcript │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         │                  │                  │                 │
└─────────│──────────────────│──────────────────│─────────────────┘
          │                  │                  │
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API SERVICE                                 │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   authAPI    │  │   tasksAPI   │  │ meetingsAPI  │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
│         │                  │                  │                 │
└─────────│──────────────────│──────────────────│─────────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
    ┌────────────────────────────────────────────┐
    │         BACKEND API ENDPOINTS              │
    │                                            │
    │  • /api/auth/me                           │
    │  • /api/tasks                             │
    │  • /api/meetings                          │
    └────────────────────────────────────────────┘
```

---

## 📊 Example: Fetching Tasks

### Step-by-Step Flow:

```javascript
// 1. Component dispatches action
function Dashboard() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchTasks());  // ← Start here
  }, [dispatch]);
}
```

```javascript
// 2. Action goes to Redux Store → tasksSlice.js
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params) => {
    const response = await tasksAPI.getTasks(params);  // ← API call
    return response.data;  // ← Return data
  }
);
```

```javascript
// 3. API service makes HTTP request → api.js
export const tasksAPI = {
  getTasks: async (params) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  }
};
```

```javascript
// 4. Reducer updates state → tasksSlice.js
extraReducers: (builder) => {
  builder
    .addCase(fetchTasks.pending, (state) => {
      state.loading = true;  // ← Update loading
    })
    .addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload.tasks;  // ← Update tasks
    })
}
```

```javascript
// 5. Component re-renders with new data
function Dashboard() {
  const { tasks, loading } = useSelector(state => state.tasks);  // ← Read state
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </div>
  );
}
```

---

## 🎯 Example: Creating a Task

### Complete Flow:

```javascript
// COMPONENT: TaskForm.js
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/slices/tasksSlice';

function TaskForm() {
  const dispatch = useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Dispatch action with data
      await dispatch(createTask({
        title: 'New Task',
        description: 'Task description',
        priority: 'high'
      })).unwrap();
      
      // 2. Success!
      alert('Task created!');
      
    } catch (error) {
      // 3. Handle error
      alert('Failed to create task');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

```
Flow Diagram:

User clicks Submit
     │
     ▼
dispatch(createTask(data))
     │
     ▼
Redux Store → tasksSlice
     │
     ▼
API Call → POST /api/tasks
     │
     ▼
Backend processes request
     │
     ▼
Response received
     │
     ▼
Redux updates state.tasks
     │
     ▼
All components with useSelector re-render
     │
     ▼
UI shows new task
```

---

## 🔍 State Access Pattern

### Reading State:
```javascript
// ANYWHERE in your app:
import { useSelector } from 'react-redux';

function AnyComponent() {
  // Access any state from anywhere!
  const { user } = useSelector(state => state.auth);
  const { tasks } = useSelector(state => state.tasks);
  const { meetings } = useSelector(state => state.meetings);
}
```

### Updating State:
```javascript
// ANYWHERE in your app:
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/slices/tasksSlice';

function AnyComponent() {
  const dispatch = useDispatch();
  
  const handleUpdate = () => {
    dispatch(updateTask({ taskId: 1, taskData: { status: 'completed' } }));
  };
}
```

---

## 🎨 Complete Example: Dashboard Component

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchTasks, 
  updateTask, 
  deleteTask,
  syncEmails 
} from '../../store/slices/tasksSlice';
import { fetchCurrentUser } from '../../store/slices/authSlice';

function Dashboard() {
  const dispatch = useDispatch();
  
  // ─────────────────────────────────────────
  // READ STATE (automatically re-renders when state changes)
  // ─────────────────────────────────────────
  const { user, loading: authLoading } = useSelector(state => state.auth);
  const { 
    tasks, 
    loading: tasksLoading, 
    syncing 
  } = useSelector(state => state.tasks);
  
  // ─────────────────────────────────────────
  // LOAD DATA ON MOUNT
  // ─────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchTasks());
  }, [dispatch]);
  
  // ─────────────────────────────────────────
  // HANDLERS - Update state by dispatching actions
  // ─────────────────────────────────────────
  const handleSync = async () => {
    try {
      await dispatch(syncEmails()).unwrap();
      await dispatch(fetchTasks()); // Refresh list
      alert('Sync successful!');
    } catch (error) {
      alert('Sync failed');
    }
  };
  
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await dispatch(updateTask({ 
        taskId, 
        taskData: { status: newStatus } 
      })).unwrap();
    } catch (error) {
      alert('Update failed');
    }
  };
  
  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      alert('Task deleted!');
    } catch (error) {
      alert('Delete failed');
    }
  };
  
  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  if (authLoading || tasksLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      
      <button onClick={handleSync} disabled={syncing}>
        {syncing ? 'Syncing...' : 'Sync Emails'}
      </button>
      
      <div>
        {tasks.map(task => (
          <div key={task.id}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
            
            <button onClick={() => handleStatusChange(task.id, 'completed')}>
              Complete
            </button>
            
            <button onClick={() => handleDelete(task.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
```

---

## 🌟 Key Concepts

### 1. Single Source of Truth
All app state lives in **one Redux store**. No more scattered state!

### 2. State is Read-Only
You can't modify state directly. Must dispatch actions.

### 3. Changes via Pure Functions
Reducers are pure functions that return new state.

### 4. Automatic Re-renders
Components using `useSelector` automatically re-render when state changes.

---

## 📦 What Each File Does

```
src/store/
├── index.js              ← Creates store, combines slices
├── hooks.js              ← Custom hooks for convenience
└── slices/
    ├── authSlice.js      ← Auth state + actions
    ├── tasksSlice.js     ← Tasks state + actions
    └── meetingsSlice.js  ← Meetings state + actions
```

### index.js (Store Setup)
```javascript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import meetingsReducer from './slices/meetingsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,     // ← state.auth
    tasks: tasksReducer,   // ← state.tasks
    meetings: meetingsReducer  // ← state.meetings
  }
});
```

### Slice File (e.g., tasksSlice.js)
```javascript
// 1. Define async actions
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await tasksAPI.getTasks();
  return response.data;
});

// 2. Create slice with reducers
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], loading: false },
  reducers: {
    // Sync actions
  },
  extraReducers: (builder) => {
    // Async actions
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  }
});

// 3. Export
export default tasksSlice.reducer;
```

---

## ✨ Benefits Recap

| Without Redux | With Redux |
|--------------|------------|
| State scattered across components | Centralized state |
| Prop drilling | Direct access anywhere |
| Manual loading states | Automatic from slices |
| Hard to debug | Redux DevTools |
| Repetitive code | Reusable actions |
| Complex state updates | Simple dispatch |

---

## 🎯 Quick Commands

### Read State
```javascript
const { tasks } = useSelector(state => state.tasks);
```

### Update State
```javascript
dispatch(updateTask({ taskId, taskData }));
```

### Handle Loading
```javascript
const { loading } = useSelector(state => state.tasks);
if (loading) return <Spinner />;
```

### Handle Errors
```javascript
try {
  await dispatch(createTask(data)).unwrap();
} catch (error) {
  alert(error);
}
```

---

## 🚀 You're Ready!

1. Install packages: `npm install @reduxjs/toolkit react-redux`
2. Start app: `npm start`
3. Open Redux DevTools in browser
4. Watch the magic happen! ✨
