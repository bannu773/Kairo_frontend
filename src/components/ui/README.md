# 🎨 UI Components Library

This folder contains reusable UI components for the application.

## 📁 Structure

```
components/ui/
└── kanban.js    - Drag-and-drop Kanban board
```

---

## 🎯 Why `components/ui`?

The `components/ui` folder follows industry best practices for component organization:

### 1. **Separation of Concerns**
- **`ui/`** - Generic, reusable UI components
- **Other folders** - Feature-specific components

### 2. **Scalability**
- Easy to add more UI components
- Clear organization as project grows
- Other developers know where to find reusable components

### 3. **shadcn Compatibility**
- If you ever want to use shadcn/ui components, they go here
- Follows the shadcn convention
- Industry-standard folder structure

### 4. **Reusability**
Components in `ui/` are designed to be:
- Used across multiple features
- Highly customizable via props
- Independent of business logic
- Well-documented

---

## 📦 Current Components

### Kanban Board (`kanban.js`)

**Purpose:** Drag-and-drop task management board

**Features:**
- 3 columns: Pending, In Progress, Completed
- Drag and drop tasks between columns
- Burn barrel for quick deletion
- Quick task creation per column
- Priority visual indicators
- Full Redux integration

**Usage:**
```javascript
import KanbanBoard from '../ui/kanban';

<KanbanBoard
  tasks={tasks}
  loading={loading}
  onTaskUpdated={handleUpdate}
  onTaskDeleted={handleDelete}
/>
```

**Props:**
- `tasks` (array) - Array of task objects
- `loading` (boolean) - Loading state
- `onTaskUpdated` (function) - Callback after task update
- `onTaskDeleted` (function) - Callback after task delete

**Dependencies:**
- lucide-react (icons)
- framer-motion (animations)
- Redux (@reduxjs/toolkit, react-redux)
- date-fns (date formatting)
- react-icons (additional icons)

---

## 🚀 Adding New Components

When adding new UI components to this folder:

### 1. **Create the file**
```
components/ui/your-component.js
```

### 2. **Export the component**
```javascript
export const YourComponent = ({ ...props }) => {
  // Component code
};

export default YourComponent;
```

### 3. **Document it**
Add a section to this README with:
- Component name and purpose
- Features
- Usage example
- Props documentation
- Dependencies

### 4. **Follow conventions**
- Use your existing dark theme colors
- Integrate with Redux if needed
- Use Tailwind CSS for styling
- Add PropTypes for documentation (optional)
- Keep it reusable and generic

---

## 🎨 Styling Guidelines

All UI components should use:

### Colors
```javascript
bg-dark-bg          // Main background
bg-dark-card        // Card backgrounds
bg-dark-cardHover   // Card hover state
border-dark-border  // Borders
text-dark-text      // Primary text
text-dark-textSecondary  // Secondary text
bg-primary-500      // Primary accent
```

### Spacing
```javascript
p-3, p-4, p-6       // Padding
gap-3, gap-4        // Gap
mb-3, mt-4          // Margin
```

### Rounded Corners
```javascript
rounded-lg          // Large radius
rounded-xl          // Extra large
rounded-2xl         // 2X extra large
```

### Shadows
```javascript
shadow-dark         // Default shadow
shadow-dark-lg      // Large shadow
shadow-dark-xl      // Extra large shadow
```

---

## 📚 Best Practices

### 1. **Component Independence**
UI components should:
- Not depend on specific routes or pages
- Accept data via props
- Not make direct API calls (use callbacks)
- Be testable in isolation

### 2. **Prop Validation**
Consider adding PropTypes:
```javascript
import PropTypes from 'prop-types';

YourComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onAction: PropTypes.func
};
```

### 3. **Documentation**
Each component should have:
- Clear purpose description
- Usage examples
- Props documentation
- Dependencies listed

### 4. **Responsive Design**
- Use Tailwind responsive classes (`sm:`, `md:`, `lg:`)
- Test on mobile, tablet, and desktop
- Support touch interactions where appropriate

---

## 🔮 Future Components

Potential UI components to add:

### Data Display
- [ ] `data-table.js` - Sortable, filterable table
- [ ] `card.js` - Reusable card component
- [ ] `badge.js` - Status badges
- [ ] `avatar.js` - User avatars

### Forms
- [ ] `input.js` - Styled input fields
- [ ] `select.js` - Dropdown select
- [ ] `checkbox.js` - Custom checkboxes
- [ ] `radio.js` - Radio buttons

### Feedback
- [ ] `toast.js` - Notification toasts
- [ ] `modal.js` - Modal dialogs
- [ ] `alert.js` - Alert messages
- [ ] `loading.js` - Loading spinners

### Navigation
- [ ] `tabs.js` - Tab navigation
- [ ] `breadcrumb.js` - Breadcrumb navigation
- [ ] `pagination.js` - Page navigation

### Layout
- [ ] `sidebar.js` - Collapsible sidebar
- [ ] `header.js` - App header
- [ ] `footer.js` - App footer

---

## 🎯 Component Template

Use this template when creating new components:

```javascript
import React from 'react';

/**
 * YourComponent - Brief description
 * 
 * @param {Object} props
 * @param {Type} props.propName - Description
 */
export const YourComponent = ({ propName, ...props }) => {
  return (
    <div className="bg-dark-card rounded-lg p-4">
      {/* Component content */}
    </div>
  );
};

export default YourComponent;
```

---

## 📖 Documentation

For complete documentation on existing components:

- **Kanban Board**: See `KANBAN_SETUP_GUIDE.md`
- **Redux Integration**: See `REDUX_IMPLEMENTATION.md`
- **Tailwind Theme**: See `tailwind.config.js`

---

## ✅ Component Checklist

When creating a new UI component:

- [ ] Component is generic and reusable
- [ ] Uses dark theme colors
- [ ] Has clear prop interface
- [ ] Documented in this README
- [ ] Responsive design tested
- [ ] No direct API calls (uses callbacks)
- [ ] Follows project coding style
- [ ] Integrated with Redux if needed

---

## 🎉 Summary

The `ui/` folder is your home for reusable, well-designed UI components. Keep them generic, well-documented, and consistent with the app's design system.

Happy component building! 🚀
