
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// ⚠️ IMPORTANT: Connect to database FIRST before importing models
const mongoConnect = require('./utils/database'); // Connect to MongoDB

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URI = 'mongodb+srv://root:Laxman!171717@cluster.y7reemk.mongodb.net/infostock';

// Now import things that use models (after DB connection)
const userController = require('./Controllers/userController');
const stockController = require('./Controllers/stockController');
const passport = require('./config/passport');
const authRoutes = require('./routes/auth');

const app = express();
const path = require('path');
const store = new MongoDBStore({
    uri: MONGO_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 24 * 1 // 1 day
});

store.on('error', (error) => {
    console.log(error);
});

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Serve React build files (client folder is one level up from server)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());

// API Routes (POST only)
app.use('/auth', authRoutes);

// Catch-all: Serve React app for any other request (must be last)
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.listen(5000, () => {
        console.log('✅ Server is running on http://localhost:5000');        
});