import express from 'express';
import { 
  initiateYouTubeAuth, 
  handleYouTubeCallback,
  initiateSpotifyAuth,
  handleSpotifyCallback,
  getAuthStatus,
  logout
} from '../controllers/authController.js';

const router = express.Router();

// YouTube authentication
router.get('/youtube', initiateYouTubeAuth);
router.get('/youtube/callback', handleYouTubeCallback);

// Spotify authentication
router.get('/spotify', initiateSpotifyAuth);
router.get('/spotify/callback', handleSpotifyCallback);

// Auth status and logout
router.get('/status', getAuthStatus);
router.post('/logout', logout);

export default router;
