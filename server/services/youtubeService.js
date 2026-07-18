import { google } from 'googleapis';

export const fetchPlaylistFromYouTube = async (playlistId, tokens) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URI
  );
  oauth2Client.setCredentials(tokens);
  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });
  
  try {
    // Get playlist details
    const playlistResponse = await youtube.playlists.list({
      part: ['snippet'],
      id: [playlistId]
    });
    
    if (!playlistResponse.data.items || playlistResponse.data.items.length === 0) {
      throw new Error('Playlist not found');
    }
    
    const playlistInfo = playlistResponse.data.items[0].snippet;
    
    // Get all playlist items (videos)
    let allVideos = [];
    let nextPageToken = null;
    
    do {
      const response = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: playlistId,
        maxResults: 50,
        pageToken: nextPageToken
      });
      
      allVideos = allVideos.concat(response.data.items);
      nextPageToken = response.data.nextPageToken;
    } while (nextPageToken);
    
    // Extract song information
    const songs = allVideos.map(item => {
      const title = item.snippet.title;
      const channelTitle = item.snippet.channelTitle;
      
      // Try to parse artist and song name from title
      const parsed = parseVideoTitle(title);
      
      return {
        originalTitle: title,
        artist: parsed.artist || channelTitle,
        song: parsed.song || title,
        videoId: item.snippet.resourceId.videoId
      };
    });
    
    return {
      title: playlistInfo.title,
      description: playlistInfo.description || '',
      items: songs
    };
  } catch (error) {
    console.error('YouTube API error:', error);
    throw new Error(`Failed to fetch YouTube playlist: ${error.message}`);
  }
};

// Helper function to parse video title into artist and song
function parseVideoTitle(title) {
  // Common patterns: "Artist - Song", "Artist: Song", "Song by Artist"
  let artist = null;
  let song = null;
  
  // Try "Artist - Song" or "Artist – Song"
  if (title.includes(' - ') || title.includes(' – ')) {
    const separator = title.includes(' - ') ? ' - ' : ' – ';
    const parts = title.split(separator);
    if (parts.length >= 2) {
      artist = parts[0].trim();
      song = parts.slice(1).join(separator).trim();
    }
  }
  // Try "Artist: Song"
  else if (title.includes(': ')) {
    const parts = title.split(': ');
    if (parts.length >= 2) {
      artist = parts[0].trim();
      song = parts.slice(1).join(': ').trim();
    }
  }
  // Try "Song by Artist"
  else if (title.toLowerCase().includes(' by ')) {
    const parts = title.split(/by/i);
    if (parts.length >= 2) {
      song = parts[0].trim();
      artist = parts[1].trim();
    }
  }
  
  // Clean up common additions like (Official Video), [Official Audio], etc.
  if (song) {
    song = song
      .replace(/\(.*?(official|video|audio|lyrics|lyric|music video).*?\)/gi, '')
      .replace(/\[.*?(official|video|audio|lyrics|lyric|music video).*?\]/gi, '')
      .trim();
  }
  
  return { artist, song };
}
