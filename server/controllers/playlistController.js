import { fetchPlaylistFromYouTube } from '../services/youtubeService.js';
import { createSpotifyPlaylist, searchAndAddTracks } from '../services/spotifyService.js';

export const fetchYouTubePlaylist = async (req, res) => {
  try {
    const { playlistUrl } = req.body;
    
    if (!playlistUrl) {
      return res.status(400).json({ error: 'Playlist URL is required' });
    }
    
    // Extract playlist ID from URL
    const playlistIdMatch = playlistUrl.match(/[?&]list=([^&]+)/);
    if (!playlistIdMatch) {
      return res.status(400).json({ error: 'Invalid YouTube playlist URL' });
    }
    
    const playlistId = playlistIdMatch[1];
    const tokens = req.session.youtubeTokens;
    
    const playlist = await fetchPlaylistFromYouTube(playlistId, tokens);
    
    res.json({
      title: playlist.title,
      description: playlist.description,
      videoCount: playlist.items.length,
      items: playlist.items
    });
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error);
    res.status(500).json({ 
      error: 'Failed to fetch YouTube playlist',
      details: error.message 
    });
  }
};

export const convertToSpotify = async (req, res) => {
  try {
    const { playlistTitle, playlistDescription, songs } = req.body;
    
    if (!songs || songs.length === 0) {
      return res.status(400).json({ error: 'No songs provided' });
    }
    
    const tokens = req.session.spotifyTokens;
    
    // Create Spotify playlist
    const spotifyPlaylist = await createSpotifyPlaylist(
      tokens.access_token,
      playlistTitle,
      playlistDescription
    );
    
    // Search and add tracks to playlist
    const result = await searchAndAddTracks(
      tokens.access_token,
      spotifyPlaylist.id,
      songs
    );
    
    res.json({
      success: true,
      playlistUrl: spotifyPlaylist.external_urls.spotify,
      playlistId: spotifyPlaylist.id,
      tracksAdded: result.tracksAdded,
      tracksNotFound: result.tracksNotFound,
      notFoundList: result.notFoundList
    });
  } catch (error) {
    console.error('Error converting to Spotify:', error);
    res.status(500).json({ 
      error: 'Failed to convert playlist',
      details: error.message 
    });
  }
};
