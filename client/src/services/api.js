import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/auth/status');
    return response.data;
  } catch (error) {
    console.error('Auth status check failed:', error);
    return { youtube: false, spotify: false };
  }
};

// Fetch YouTube playlist
export const fetchYouTubePlaylist = async (playlistUrl) => {
  try {
    const response = await api.post('/api/playlist/fetch', { playlistUrl });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to fetch YouTube playlist';
    throw new Error(message);
  }
};

// Convert to Spotify playlist
export const convertToSpotify = async (title, description, songs) => {
  try {
    const response = await api.post('/api/playlist/convert', {
      playlistTitle: title,
      playlistDescription: description,
      songs: songs
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Failed to convert playlist';
    throw new Error(message);
  }
};
