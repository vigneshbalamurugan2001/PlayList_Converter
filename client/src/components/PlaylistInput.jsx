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
        <div className="input-wrap">
          <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            className="url-input"
            placeholder="https://www.youtube.com/playlist?list=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={!isAuthenticated || loading}
          />
        </div>
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
