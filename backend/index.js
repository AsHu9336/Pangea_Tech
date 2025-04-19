const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadsRoutes');
const teamRoutes = require('./routes/teamRoutes');
const MongoStore = require('connect-mongo');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'http://localhost:5173',
  'https://pangea-tech-frontend.onrender.com'
];


// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'iplmanager-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 14 * 24 * 60 * 60 // 14 days
    })
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./utils/passport');

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend server!' });
});

app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/teams', teamRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => console.error(err));
