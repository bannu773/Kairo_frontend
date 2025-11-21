# 🎨 Tailwind CSS Classes Reference

This document explains the key Tailwind CSS classes used in the new UI.

## Color Classes

### Background Colors
- `bg-dark-bg` → #0f172a (main background)
- `bg-dark-card` → #1e293b (card backgrounds)
- `bg-dark-cardHover` → #334155 (card hover state)
- `bg-primary-600` → #2563eb (primary blue)
- `bg-gradient-to-r` → Right gradient direction

### Text Colors
- `text-dark-text` → #f1f5f9 (primary text)
- `text-dark-textSecondary` → #94a3b8 (secondary text)
- `text-primary-400` → #60a5fa (blue accent)
- `text-red-400` → #f87171 (errors/warnings)

### Border Colors
- `border-dark-border` → #334155 (borders)
- `border-primary-500` → #3b82f6 (accent borders)

## Layout Classes

### Flexbox
- `flex` → display: flex
- `items-center` → align-items: center
- `justify-between` → justify-content: space-between
- `space-x-4` → gap between horizontal items (1rem)
- `space-y-6` → gap between vertical items (1.5rem)

### Grid
- `grid` → display: grid
- `grid-cols-1` → 1 column
- `grid-cols-3` → 3 columns
- `lg:grid-cols-4` → 4 columns on large screens
- `gap-6` → gap: 1.5rem

## Spacing

### Padding
- `p-4` → padding: 1rem (all sides)
- `px-6` → padding-left, padding-right: 1.5rem
- `py-3` → padding-top, padding-bottom: 0.75rem

### Margin
- `mb-6` → margin-bottom: 1.5rem
- `mt-8` → margin-top: 2rem
- `mx-auto` → margin-left, margin-right: auto

## Typography

### Font Size
- `text-xs` → 0.75rem (12px)
- `text-sm` → 0.875rem (14px)
- `text-base` → 1rem (16px)
- `text-lg` → 1.125rem (18px)
- `text-xl` → 1.25rem (20px)
- `text-2xl` → 1.5rem (24px)
- `text-4xl` → 2.25rem (36px)

### Font Weight
- `font-medium` → 500
- `font-semibold` → 600
- `font-bold` → 700

## Rounded Corners
- `rounded-lg` → border-radius: 0.5rem (8px)
- `rounded-xl` → border-radius: 0.75rem (12px)
- `rounded-2xl` → border-radius: 1rem (16px)
- `rounded-full` → border-radius: 9999px (circle)

## Shadows
- `shadow-dark` → Custom dark shadow
- `shadow-dark-lg` → Larger dark shadow
- `shadow-dark-xl` → Extra large dark shadow

## Effects & Transitions

### Transitions
- `transition-all` → transition all properties
- `duration-300` → 300ms duration
- `ease-in-out` → ease-in-out timing

### Hover States
- `hover:bg-primary-700` → Background on hover
- `hover:scale-105` → Scale up 5% on hover
- `hover:shadow-xl` → Larger shadow on hover

### Focus States
- `focus:outline-none` → Remove default outline
- `focus:ring-2` → 2px ring on focus
- `focus:ring-primary-500` → Blue ring color

## Responsive Design

### Breakpoints
- Default → Mobile (< 640px)
- `sm:` → Small screens (≥ 640px)
- `md:` → Medium screens (≥ 768px)
- `lg:` → Large screens (≥ 1024px)

### Examples
- `hidden sm:block` → Hide on mobile, show on small+
- `grid-cols-1 lg:grid-cols-3` → 1 col mobile, 3 cols large
- `text-sm sm:text-base` → Smaller text on mobile

## Animations

### Built-in
- `animate-spin` → Rotating animation
- `animate-pulse` → Pulsing animation

### Custom
```css
/* In tailwind.config.js */
animation: {
  'fadeIn': 'fadeIn 0.3s ease-in-out'
}
```

## Positioning

### Position Types
- `relative` → position: relative
- `absolute` → position: absolute
- `fixed` → position: fixed
- `sticky` → position: sticky

### Placement
- `top-0` → top: 0
- `inset-0` → top, right, bottom, left: 0
- `z-50` → z-index: 50

## Sizing

### Width
- `w-full` → width: 100%
- `w-12` → width: 3rem (48px)
- `max-w-2xl` → max-width: 42rem (672px)

### Height
- `h-full` → height: 100%
- `h-16` → height: 4rem (64px)
- `min-h-screen` → min-height: 100vh

## Opacity & Backdrop

### Opacity
- `opacity-50` → opacity: 0.5
- `bg-opacity-20` → background opacity: 0.2

### Backdrop
- `backdrop-blur-sm` → Small backdrop blur
- `backdrop-blur-lg` → Large backdrop blur

## Common Patterns Used

### Card Component
```jsx
className="bg-dark-card border border-dark-border rounded-2xl 
           p-6 shadow-dark-lg hover:shadow-dark-xl 
           transition-all duration-300"
```

### Button Component
```jsx
className="px-6 py-3 bg-gradient-to-r from-primary-600 
           to-primary-700 text-white rounded-xl font-semibold 
           hover:from-primary-700 hover:to-primary-800 
           transition-all shadow-lg hover:shadow-xl 
           transform hover:scale-105"
```

### Input Component
```jsx
className="w-full px-4 py-3 bg-dark-bg border 
           border-dark-border rounded-xl text-dark-text 
           focus:outline-none focus:ring-2 
           focus:ring-primary-500 transition-all"
```

### Modal Overlay
```jsx
className="fixed inset-0 bg-black bg-opacity-75 
           backdrop-blur-sm flex items-center 
           justify-center z-50"
```

## Utility Combinations

### Centering
```jsx
// Center horizontally
className="mx-auto"

// Center horizontally and vertically
className="flex items-center justify-center"

// Center text
className="text-center"
```

### Responsive Padding
```jsx
className="px-4 sm:px-6 lg:px-8"
// 1rem mobile, 1.5rem tablet, 2rem desktop
```

### Conditional Styles
```jsx
className={`base-classes ${
  isActive ? 'bg-primary-600' : 'bg-dark-card'
} ${isDragging ? 'opacity-50' : 'opacity-100'}`}
```

## Tips

1. **Chain utilities**: `hover:scale-105 transition-transform duration-300`
2. **Use responsive prefixes**: `hidden lg:block`
3. **Combine with custom classes**: Define in tailwind.config.js
4. **Use @apply in CSS**: For repeated patterns
5. **JIT mode**: Generates classes on-demand (already enabled)

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Tailwind Play](https://play.tailwindcss.com) - Online playground
