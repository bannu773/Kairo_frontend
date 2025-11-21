# Redux Quick Reference Cheat Sheet

## 🎯 Quick Start

### 1. Install Redux (Run this first!)
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Import in Component
```javascript
import { useDispatch, useSelector } from 'react-redux';
```

### 3. Use in Component
```javascript
const dispatch = useDispatch();
const { tasks, loading } = useSelector((state) => state.tasks);
```

---

## 📋 Common Patterns

### Fetching Data
```javascript
import { fetchTasks } from '../../store/slices/tasksSlice';

useEffect(() => {
  dispatch(fetchTasks());
}, [dispatch]);
```

### Creating Data
```javascript
import { createTask } from '../../store/slices/tasksSlice';

const handleCreate = async () => {
  try {
    await dispatch(createTask({ title: 'New Task' })).unwrap();
    alert('Success!');
  } catch (error) {
    alert('Error: ' + error);
  }
};
```

### Updating Data
```javascript
import { updateTask } from '../../store/slices/tasksSlice';

dispatch(updateTask({ 
  taskId: 123, 
  taskData: { status: 'completed' } 
}));
```

### Deleting Data
```javascript
import { deleteTask } from '../../store/slices/tasksSlice';

dispatch(deleteTask(taskId));
```

---

## 🔑 All Available Actions

### Auth Actions
```javascript
import { fetchCurrentUser, logout, setToken, clearAuth } from './store/slices/authSlice';

dispatch(fetchCurrentUser())
dispatch(logout())
dispatch(setToken('token-string'))
dispatch(clearAuth())
```

### Task Actions
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
} from './store/slices/tasksSlice';

dispatch(fetchTasks({ status: 'pending', page: 1 }))
dispatch(fetchTask(taskId))
dispatch(createTask({ title: 'Task' }))
dispatch(updateTask({ taskId, taskData: {...} }))
dispatch(deleteTask(taskId))
dispatch(syncEmails())
dispatch(setFilter({ status: 'pending' }))
dispatch(setPagination({ page: 2 }))
```

### Meeting Actions
```javascript
import { 
  fetchMeetings, 
  fetchMeeting, 
  fetchTranscript, 
  fetchSummary,
  syncMeetings,
  processMeeting 
} from './store/slices/meetingsSlice';

dispatch(fetchMeetings({ page: 1 }))
dispatch(fetchMeeting(meetingId))
dispatch(fetchTranscript(meetingId))
dispatch(fetchSummary(meetingId))
dispatch(syncMeetings())
dispatch(processMeeting(meetingId))
```

---

## 🎨 Component Template

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask } from '../../store/slices/tasksSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreate = async () => {
    try {
      await dispatch(createTask({ title: 'New' })).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
}
```

---

## 🔍 State Selectors

### Auth State
```javascript
const { user, token, isAuthenticated, loading } = useSelector((state) => state.auth);
```

### Tasks State
```javascript
const { 
  tasks, 
  currentTask, 
  loading, 
  syncing, 
  filter, 
  pagination 
} = useSelector((state) => state.tasks);
```

### Meetings State
```javascript
const { 
  meetings, 
  currentMeeting, 
  transcript, 
  summary, 
  loading 
} = useSelector((state) => state.meetings);
```

---

## ⚡ Performance Tips

### Use Custom Hooks
```javascript
import { useAuth, useTasks, useMeetings } from '../../store/hooks';

const { user } = useAuth();
const { tasks, loading } = useTasks();
```

### Select Specific Fields
```javascript
// ❌ Don't select entire state
const tasks = useSelector((state) => state.tasks);

// ✅ Select only what you need
const tasks = useSelector((state) => state.tasks.tasks);
const loading = useSelector((state) => state.tasks.loading);
```

### Memoize Callbacks
```javascript
import { useCallback } from 'react';

const handleCreate = useCallback(async () => {
  await dispatch(createTask({ title: 'New' }));
}, [dispatch]);
```

---

## 🚨 Error Handling

```javascript
const handleAction = async () => {
  try {
    const result = await dispatch(someAction()).unwrap();
    // Success - result contains the payload
    console.log('Success:', result);
  } catch (error) {
    // Error - error contains the rejection value
    console.error('Error:', error);
    alert('Operation failed: ' + error);
  }
};
```

---

## 📦 File Structure Summary

```
src/
├── store/
│   ├── index.js              # Store setup
│   ├── hooks.js              # Custom hooks
│   └── slices/
│       ├── authSlice.js      # Auth state & actions
│       ├── tasksSlice.js     # Tasks state & actions
│       └── meetingsSlice.js  # Meetings state & actions
```

---

## 🎯 Remember

1. ✅ Always wrap app with `<Provider store={store}>`
2. ✅ Use `useSelector` to read state
3. ✅ Use `useDispatch` to dispatch actions
4. ✅ Use `.unwrap()` for error handling with try/catch
5. ✅ Install Redux DevTools extension for debugging
