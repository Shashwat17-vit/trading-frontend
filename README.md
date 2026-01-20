# Infostock - React + Express Project

## Project Structure

```
trading-frontend/
  ├── client/              # React Frontend
  │   ├── src/
  │   │   ├── components/  # React components (Navbar, Hero, Features, Footer)
  │   │   ├── styles/      # CSS for each component
  │   │   ├── App.js       # Main React app
  │   │   └── index.js     # React entry point
  │   ├── build/           # Production build (generated)
  │   └── package.json
  │
  └── server/              # Express Backend
      ├── Controllers/     # Route controllers
      ├── Models/          # Database models
      ├── utils/           # Database connection
      ├── Views/           # Old HTML views (can be removed)
      ├── app.js           # Express server
      └── package.json
```

## How to Run

### Option 1: Production Mode (Recommended - One Server)

**Step 1: Build React app**
```bash
cd "C:\Users\Shashwat\Desktop\Node Project\trading-frontend\client"
npm run build
```

**Step 2: Start Express server**
```bash
cd "C:\Users\Shashwat\Desktop\Node Project\trading-frontend\server"
node app.js
```

**Step 3: Open browser**
- Go to: `http://localhost:3000`
- Your React app (from App.js) will be served! ✅

---

### Option 2: Development Mode (Hot Reload)

**Terminal 1 - Express Backend:**
```bash
cd "C:\Users\Shashwat\Desktop\Node Project\trading-frontend\server"
node app.js
```
Backend runs on port 3000

**Terminal 2 - React Frontend:**
```bash
cd "C:\Users\Shashwat\Desktop\Node Project\trading-frontend\client"
npm start
```
React opens automatically on port 3001 with hot reload!

---

## How It Works

### Express (server/app.js):
1. Serves static files from `client/build/`
2. Handles API routes: `/signup`, `/stock`
3. Catches all other routes and serves `index.html` (React app)

### React (client/src/):
- `App.js` imports all components:
  - `<Navbar />` - Navigation
  - `<Hero />` - Hero section
  - `<Features />` - Features grid
  - `<Footer />` - Footer
- Each component has its own CSS file in `styles/`

### Flow:
```
Browser → http://localhost:3000
    ↓
Express serves client/build/index.html
    ↓
index.html loads React JavaScript
    ↓
React renders App.js → Components display!
```

---

## Making Changes to React

1. **Edit React files in `client/src/`**
   - Modify `App.js`, components, or styles

2. **Rebuild**
   ```bash
   cd client
   npm run build
   ```

3. **Restart backend**
   ```bash
   cd server
   node app.js
   ```

4. **Refresh browser** - See changes!

---

## Tips

✅ **Always rebuild** React after making changes (`npm run build`)
✅ **Use dev mode** (`npm start` in client/) for faster development
✅ **Keep components organized** - one component per file
✅ **API routes** work at `/signup`, `/stock` alongside React

---

## Current Setup

✅ React app built and ready
✅ Express configured to serve React
✅ Reusable components created
✅ All CSS organized by component

**Just run:** `cd server && node app.js`

Enjoy! 🚀

