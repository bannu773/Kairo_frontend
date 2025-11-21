# 🚀 Quick Start Commands

## Installation & Running

### 1. Navigate to Frontend Directory
```powershell
cd "d:\Blog and Marathon_2\frontend"
```

### 2. Install Dependencies (One Time Only)
```powershell
npm install
```

This will install:
- Tailwind CSS v3.3.6
- Autoprefixer
- PostCSS
- All existing dependencies

### 3. Start Development Server
```powershell
npm start
```

The app will automatically open at: http://localhost:3000

## Additional Commands

### Build for Production
```powershell
npm run build
```

### Clear Cache (If Issues Occur)
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

### Check Tailwind is Working
After running `npm start`, check the browser console. If you see styled components with dark theme, Tailwind is working correctly.

## Troubleshooting

### If Tailwind styles don't appear:
1. Stop the server (Ctrl+C)
2. Run: `npm install`
3. Run: `npm start`

### If drag-and-drop doesn't work:
- Ensure you're using a modern browser (Chrome, Firefox, Edge)
- Check browser console for errors

## That's It!

Just run these two commands to get started:
```powershell
cd "d:\Blog and Marathon_2\frontend"
npm install
npm start
```

Then open http://localhost:3000 in your browser! 🎉
