import { google } from 'googleapis';
import axios from 'axios';

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

// YouTube Authentication
export const initiateYouTubeAuth = (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];
  
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
  
  res.redirect(authUrl);
};

export const handleYouTubeCallback = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect(`${process.env.CLIENT_URL}?error=no_code`);
  }
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    
    // Store tokens in session
    req.session.youtubeTokens = tokens;
    req.session.youtubeAuthenticated = true;
    
    res.redirect(`${process.env.CLIENT_URL}?youtube=success`);
  } catch (error) {
    console.error('YouTube auth error:', error);
    res.redirect(`${process.env.CLIENT_URL}?error=youtube_auth_failed`);
  }
};

// Spotify Authentication
export const initiateSpotifyAuth = (req, res) => {
  const scopes = [
    'playlist-modify-public',
    'playlist-modify-private',
    'user-library-read'
  ];
  
  const authUrl = 'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scopes.join(' '),
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    });
  
  res.redirect(authUrl);
};

export const handleSpotifyCallback = async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.redirect(`${process.env.CLIENT_URL}?error=no_code`);
  }
  
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
      }),
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
          ).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    // Store tokens in session
    req.session.spotifyTokens = response.data;
    req.session.spotifyAuthenticated = true;
    
    res.redirect(`${process.env.CLIENT_URL}?spotify=success`);
  } catch (error) {
    console.error('Spotify auth error:', error);
    res.redirect(`${process.env.CLIENT_URL}?error=spotify_auth_failed`);
  }
};

// Get authentication status
export const getAuthStatus = (req, res) => {
  res.json({
    youtube: req.session.youtubeAuthenticated || false,
    spotify: req.session.spotifyAuthenticated || false
  });
};

// Logout
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
};
