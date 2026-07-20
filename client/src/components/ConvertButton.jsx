import { useState } from 'react';
import { convertToSpotify } from '../services/api';
import './ConvertButton.css';

function ConvertButton({ isAuthenticated, playlist, onConvertComplete, onError }) {
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!isAuthenticated) {
      onError('Please connect Spotify first');
      return;
    }
    
    setLoading(true);
    try {
      const result = await convertToSpotify(
        playlist.title,
        playlist.description,
        playlist.items
      );
      onConvertComplete(result);
      
      // Open the playlist in Spotify
      if (result.playlistUrl) {
        window.open(result.playlistUrl, '_blank');
      }
    } catch (error) {
      onError(error.message || 'Failed to convert playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="convert-section">
      <button
        className="convert-btn"
        onClick={handleConvert}
        disabled={!isAuthenticated || loading}
      >
        {loading ? (
          <span className="spinner" aria-hidden="true" />
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        )}
        {loading ? 'Converting...' : 'Convert to Spotify'}
      </button>
      {!isAuthenticated && (
        <p className="convert-hint">Please connect Spotify to convert</p>
      )}
    </div>
  );
}

export default ConvertButton;
