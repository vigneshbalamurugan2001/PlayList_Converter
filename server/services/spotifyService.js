import axios from 'axios';

// Get user's Spotify profile
const getUserProfile = async (accessToken) => {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  return response.data;
};

// Create a new Spotify playlist
export const createSpotifyPlaylist = async (accessToken, name, description) => {
  try {
    const user = await getUserProfile(accessToken);
    
    const response = await axios.post(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        name: name,
        description: description || 'Converted from YouTube playlist',
        public: false
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating Spotify playlist:', error.response?.data || error);
    throw new Error('Failed to create Spotify playlist');
  }
};

// Search for a track on Spotify
const searchTrack = async (accessToken, artist, song) => {
  try {
    // Create search query
    const query = `track:${song} artist:${artist}`;
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track',
        limit: 1
      },
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    if (response.data.tracks.items.length > 0) {
      return response.data.tracks.items[0].uri;
    }
    
    // If not found with both artist and song, try just the song
    const fallbackQuery = song;
    const fallbackResponse = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: fallbackQuery,
        type: 'track',
        limit: 1
      },
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    
    if (fallbackResponse.data.tracks.items.length > 0) {
      return fallbackResponse.data.tracks.items[0].uri;
    }
    
    return null;
  } catch (error) {
    console.error('Error searching track:', error);
    return null;
  }
};

// Add tracks to Spotify playlist
const addTracksToPlaylist = async (accessToken, playlistId, trackUris) => {
  if (trackUris.length === 0) return;
  
  // Spotify allows max 100 tracks per request
  const chunkSize = 100;
  for (let i = 0; i < trackUris.length; i += chunkSize) {
    const chunk = trackUris.slice(i, i + chunkSize);
    
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { uris: chunk },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  }
};

// Search and add all tracks to playlist
export const searchAndAddTracks = async (accessToken, playlistId, songs) => {
  const trackUris = [];
  const notFoundList = [];
  
  for (const song of songs) {
    console.log(`Searching for: ${song.artist} - ${song.song}`);
    const trackUri = await searchTrack(accessToken, song.artist, song.song);
    
    if (trackUri) {
      trackUris.push(trackUri);
    } else {
      notFoundList.push(`${song.artist} - ${song.song}`);
      console.log(`Not found: ${song.artist} - ${song.song}`);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Add all found tracks to playlist
  await addTracksToPlaylist(accessToken, playlistId, trackUris);
  
  return {
    tracksAdded: trackUris.length,
    tracksNotFound: notFoundList.length,
    notFoundList
  };
};
