import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import session from 'cookie-session';
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration (signed cookie; serverless-safe)
const isProd = process.env.NODE_ENV === 'production';
app.set('trust proxy', 1);
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'your-secret-key-change-in-production'],
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax'
}));

// Routes
app.use('/auth', authRoutes);
app.use('/api/playlist', playlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root — this is an API server; the app itself lives on the client dev server
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Playlist Converter API is running.',
    frontend: process.env.CLIENT_URL || 'http://localhost:5173'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server locally; Vercel imports the app instead
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

export default app;
