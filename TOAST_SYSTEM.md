# Toast Notification System

## Overview
The application now uses a modern toast notification system instead of browser alerts. This provides a better user experience with non-blocking, dismissible notifications that automatically disappear.

## Features
- ✅ **Non-blocking**: Notifications don't interrupt user workflow
- ✅ **Auto-dismiss**: Automatically disappears after 5 seconds (configurable)
- ✅ **Multiple types**: Success, Error, Warning, Info
- ✅ **Dismissible**: Users can manually close notifications
- ✅ **Animated**: Smooth slide-in/slide-out animations
- ✅ **Stacked**: Multiple notifications stack vertically
- ✅ **Modern UI**: Beautiful design matching the dark theme

## Usage

### 1. Import the hook
```javascript
import { useToast } from '../ui/Toast';
```

### 2. Use in your component
```javascript
function MyComponent() {
  const toast = useToast();
  
  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };
  
  const handleError = () => {
    toast.error('Something went wrong!');
  };
  
  const handleWarning = () => {
    toast.warning('Please be careful!');
  };
  
  const handleInfo = () => {
    toast.info('Here is some information');
  };
  
  // Custom duration (in milliseconds)
  const handleCustomDuration = () => {
    toast.success('This will stay for 10 seconds', 10000);
  };
}
```

## Available Methods

### `toast.success(message, duration?)`
Shows a green success notification with a checkmark icon.
- **message**: String - The message to display
- **duration**: Number (optional) - How long to show the toast in milliseconds (default: 5000)

### `toast.error(message, duration?)`
Shows a red error notification with an X icon.
- **message**: String - The message to display
- **duration**: Number (optional) - How long to show the toast in milliseconds (default: 5000)

### `toast.warning(message, duration?)`
Shows a yellow warning notification with an alert icon.
- **message**: String - The message to display
- **duration**: Number (optional) - How long to show the toast in milliseconds (default: 5000)

### `toast.info(message, duration?)`
Shows a blue info notification with an info icon.
- **message**: String - The message to display
- **duration**: Number (optional) - How long to show the toast in milliseconds (default: 5000)

## Examples in the App

### Dashboard.js
```javascript
// Email sync success
toast.success(`Sync completed! ${result.new_tasks_created} new tasks created.`);

// Email sync error
toast.error('Error syncing emails. Please try again.');
```

### Kanban Board (kanban.js)
```javascript
// Task deletion success
toast.success('Task deleted successfully');

// Task deletion error
toast.error('Failed to delete task');

// Task creation success
toast.success('Task created successfully');

// Task creation error
toast.error('Failed to create task');
```

### Meeting List (MeetingList.js)
```javascript
// Meeting sync success
toast.success(`Synced ${response.data.new_meetings} new meetings!`);

// Meeting sync error
toast.error('Failed to sync meetings');

// Meeting processing started
toast.info('Meeting processing started. This may take a few minutes.');
```

## Styling

The toast notifications automatically match your dark theme with:
- Dark background with opacity
- Colored borders and icons based on type
- Smooth animations
- Responsive design
- Hover effects

### Colors by Type
- **Success**: Green (#22c55e)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#eab308)
- **Info**: Blue (#3b82f6)

## Technical Details

### Location
- Component: `frontend/src/components/ui/Toast.js`
- Context Provider: Wraps the entire app in `App.js`
- Animations: Defined in `frontend/src/index.css`

### Provider Setup
The `ToastProvider` is wrapped around the entire app in `App.js`:
```javascript
<Provider store={store}>
  <ToastProvider>
    <Router>
      {/* App content */}
    </Router>
  </ToastProvider>
</Provider>
```

### Position
Toasts appear in the **top-right corner** of the screen and stack vertically if multiple notifications are shown.

## Migration from Alerts

All previous `alert()` calls have been replaced with appropriate toast notifications:

| Old Code | New Code |
|----------|----------|
| `alert('Success!')` | `toast.success('Success!')` |
| `alert('Error occurred')` | `toast.error('Error occurred')` |
| `alert('Warning message')` | `toast.warning('Warning message')` |
| `alert('Info message')` | `toast.info('Info message')` |

## Best Practices

1. **Use appropriate types**: Match the toast type to the message context
   - Success: For successful operations
   - Error: For failures and errors
   - Warning: For cautionary messages
   - Info: For general information

2. **Keep messages concise**: Toast messages should be brief and clear

3. **Don't overuse**: Only show toasts for important user feedback

4. **Consider duration**: For critical information, use longer durations

5. **User actions**: For operations requiring user acknowledgment, consider using modals instead

## Accessibility

- Toasts are keyboard accessible
- Screen readers will announce the messages
- Users can dismiss toasts manually
- Non-blocking design doesn't interrupt workflow

## Future Enhancements

Potential improvements:
- [ ] Add sound effects (optional)
- [ ] Position customization (top-left, bottom-right, etc.)
- [ ] Custom icons
- [ ] Action buttons within toasts
- [ ] Progress indicators for long operations
- [ ] Queue management for many simultaneous notifications
