import { useState } from 'react';
import { fetchYouTubePlaylist } from '../services/api';
import './PlaylistInput.css';

function PlaylistInput({ isAuthenticated, onPlaylistFetched, onError }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onError('Please connect YouTube first');
      return;
    }
    
    if (!url.trim()) {
      onError('Please enter a playlist URL');
      return;
    }
    
    setLoading(true);
    try {
      const playlist = await fetchYouTubePlaylist(url);
      onPlaylistFetched(playlist);
      setUrl('');
    } catch (error) {
      onError(error.message || 'Failed to fetch playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="playlist-input">
      <h2>Enter YouTube Playlist URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="url-input"
          placeholder="https://www.youtube.com/playlist?list=..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={!isAuthenticated || loading}
        />
        <button 
          type="submit" 
          className="fetch-btn"
          disabled={!isAuthenticated || loading || !url.trim()}
        >
          {loading ? 'Fetching...' : 'Fetch Playlist'}
        </button>
      </form>
    </div>
  );
}

export default PlaylistInput;
