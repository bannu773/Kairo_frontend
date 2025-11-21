# Redux Migration Guide - Update Remaining Components

This guide will help you migrate the remaining components to use Redux.

---

## 📝 Components to Update

- [ ] `TaskForm.js`
- [ ] `TaskList.js`
- [ ] `MeetingList.js`
- [ ] `MeetingSummary.js`
- [ ] `Login.js`
- [ ] `AuthCallback.js`

---

## 1️⃣ TaskForm Component

### Current Pattern (API calls):
```javascript
// OLD - Direct API call
import { tasksAPI } from '../../services/api';

const handleSubmit = async () => {
  const response = await tasksAPI.createTask(taskData);
};
```

### New Pattern (Redux):
```javascript
// NEW - Redux dispatch
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/slices/tasksSlice';

function TaskForm({ onClose, onTaskCreated }) {
  const dispatch = useDispatch();
  
  const handleSubmit = async () => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      onTaskCreated();
      onClose();
    } catch (error) {
      alert('Failed to create task');
    }
  };
}
```

---

## 2️⃣ TaskList Component

### Current Pattern:
```javascript
// OLD
import { tasksAPI } from '../../services/api';

const handleUpdate = async (taskId, data) => {
  await tasksAPI.updateTask(taskId, data);
  onTaskUpdated();
};
```

### New Pattern:
```javascript
// NEW
import { useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../../store/slices/tasksSlice';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const dispatch = useDispatch();
  
  const handleUpdate = async (taskId, data) => {
    try {
      await dispatch(updateTask({ taskId, taskData: data })).unwrap();
      onTaskUpdated();
    } catch (error) {
      alert('Failed to update task');
    }
  };
  
  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      onTaskDeleted();
    } catch (error) {
      alert('Failed to delete task');
    }
  };
}
```

---

## 3️⃣ MeetingList Component

### Migration Steps:

```javascript
// 1. Add imports
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeetings, syncMeetings } from '../../store/slices/meetingsSlice';

// 2. Replace state with Redux
function MeetingList() {
  const dispatch = useDispatch();
  const { meetings, loading, syncing } = useSelector((state) => state.meetings);
  
  // 3. Load meetings on mount
  useEffect(() => {
    dispatch(fetchMeetings());
  }, [dispatch]);
  
  // 4. Handle sync
  const handleSync = async () => {
    try {
      await dispatch(syncMeetings()).unwrap();
      dispatch(fetchMeetings()); // Refresh list
    } catch (error) {
      alert('Sync failed');
    }
  };
}
```

---

## 4️⃣ MeetingSummary Component

### Migration Steps:

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { 
  fetchMeeting, 
  fetchSummary, 
  fetchTranscript,
  fetchTasksFromMeeting 
} from '../../store/slices/meetingsSlice';

function MeetingSummary() {
  const { meetingId } = useParams();
  const dispatch = useDispatch();
  const { 
    currentMeeting, 
    summary, 
    transcript, 
    relatedTasks,
    loading 
  } = useSelector((state) => state.meetings);
  
  useEffect(() => {
    if (meetingId) {
      dispatch(fetchMeeting(meetingId));
      dispatch(fetchSummary(meetingId));
      dispatch(fetchTranscript(meetingId));
      dispatch(fetchTasksFromMeeting(meetingId));
    }
  }, [meetingId, dispatch]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>{currentMeeting?.title}</h1>
      <div>{summary?.content}</div>
      <div>{transcript?.content}</div>
      <div>
        <h2>Related Tasks</h2>
        {relatedTasks.map(task => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
    </div>
  );
}
```

---

## 5️⃣ Login Component

### Migration Steps:

```javascript
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/slices/authSlice';

function Login() {
  const dispatch = useDispatch();
  
  // If you handle token manually
  const handleLoginSuccess = (token) => {
    dispatch(setToken(token));
    navigate('/dashboard');
  };
  
  // OR redirect to Google OAuth (existing pattern)
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/login`;
  };
}
```

---

## 6️⃣ AuthCallback Component

### Migration Steps:

```javascript
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setToken, fetchCurrentUser } from '../../store/slices/authSlice';

function AuthCallback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Save token to Redux and localStorage
      dispatch(setToken(token));
      
      // Fetch user data
      dispatch(fetchCurrentUser())
        .unwrap()
        .then(() => {
          navigate('/dashboard');
        })
        .catch(() => {
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [searchParams, dispatch, navigate]);
  
  return <div>Loading...</div>;
}
```

---

## 🎯 General Migration Pattern

### Before (Direct API):
```javascript
import { useState, useEffect } from 'react';
import { someAPI } from '../../services/api';

function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await someAPI.getData();
      setData(response.data);
      setLoading(false);
    };
    loadData();
  }, []);
}
```

### After (Redux):
```javascript
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../store/slices/someSlice';

function Component() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.some);
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
}
```

---

## ✅ Migration Checklist

For each component:

1. [ ] Import `useDispatch` and `useSelector`
2. [ ] Import required actions from slices
3. [ ] Replace `useState` for API data with `useSelector`
4. [ ] Replace API calls with `dispatch(action())`
5. [ ] Remove loading/error state management (use Redux state)
6. [ ] Update error handling to use `.unwrap()` and try/catch
7. [ ] Test the component

---

## 🧪 Testing After Migration

1. **Check data loading:**
   - Open Redux DevTools
   - Trigger action
   - Verify state updates

2. **Check error handling:**
   - Simulate API error
   - Verify error is shown

3. **Check UI updates:**
   - Verify UI reflects Redux state
   - Check loading states

---

## 🚀 Benefits After Migration

✅ No more prop drilling  
✅ Centralized state management  
✅ Better debugging with Redux DevTools  
✅ Easier testing  
✅ Consistent data flow  
✅ Automatic re-renders on state change  

---

## 💡 Tips

1. **Start small**: Migrate one component at a time
2. **Test thoroughly**: After each migration
3. **Use DevTools**: Redux DevTools browser extension
4. **Keep API service**: Still useful for direct calls if needed
5. **Error handling**: Always use try/catch with `.unwrap()`

---

## 🐛 Common Issues

### Issue: Component not re-rendering
**Solution**: Make sure you're using `useSelector` correctly

### Issue: State not updating
**Solution**: Check if action is dispatched correctly in DevTools

### Issue: Too many API calls
**Solution**: Add proper dependencies to `useEffect`

### Issue: Stale data
**Solution**: Dispatch fetch action in `useEffect` when component mounts
