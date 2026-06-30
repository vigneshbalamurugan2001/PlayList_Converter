import express from 'express';
import { fetchYouTubePlaylist, convertToSpotify } from '../controllers/playlistController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fetch YouTube playlist
router.post('/fetch', requireAuth('youtube'), fetchYouTubePlaylist);

// Convert to Spotify playlist
router.post('/convert', requireAuth('spotify'), convertToSpotify);

export default router;
