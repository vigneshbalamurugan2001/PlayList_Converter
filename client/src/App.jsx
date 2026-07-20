import { useState, useEffect } from 'react';
import Header from './components/Header';
import AuthButtons from './components/AuthButtons';
import PlaylistInput from './components/PlaylistInput';
import PlaylistPreview from './components/PlaylistPreview';
import ConvertButton from './components/ConvertButton';
import StatusMessage from './components/StatusMessage';
import { checkAuthStatus } from './services/api';
import './App.css';

function App() {
  const [authStatus, setAuthStatus] = useState({ youtube: false, spotify: false });
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Check authentication status on load
    loadAuthStatus();

    // Check for auth callback in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('youtube') === 'success') {
      setMessage({ type: 'success', text: 'YouTube connected successfully!' });
      loadAuthStatus();
      window.history.replaceState({}, document.title, '/');
    } else if (params.get('spotify') === 'success') {
      setMessage({ type: 'success', text: 'Spotify connected successfully!' });
      loadAuthStatus();
      window.history.replaceState({}, document.title, '/');
    } else if (params.get('error')) {
      setMessage({ type: 'error', text: `Error: ${params.get('error')}` });
      window.history.replaceState({}, document.title, '/');
    }
  }, []);

  const loadAuthStatus = async () => {
    try {
      const status = await checkAuthStatus();
      setAuthStatus(status);
    } catch (error) {
      console.error('Failed to load auth status:', error);
    }
  };

  const handlePlaylistFetched = (fetchedPlaylist) => {
    setPlaylist(fetchedPlaylist);
    setMessage({ type: 'success', text: `Fetched ${fetchedPlaylist.videoCount} songs!` });
  };

  const handleConvertComplete = (result) => {
    setMessage({ 
      type: 'success', 
      text: `Playlist created! Added ${result.tracksAdded} tracks.` +
            (result.tracksNotFound > 0 ? ` ${result.tracksNotFound} tracks not found.` : '')
    });
  };

  const clearMessage = () => setMessage(null);

  return (
    <div className="app">
      <Header />
      
      <div className="container">
        <AuthButtons authStatus={authStatus} onAuthChange={loadAuthStatus} />
        
        {message && (
          <StatusMessage 
            type={message.type} 
            message={message.text} 
            onClose={clearMessage}
          />
        )}
        
        <PlaylistInput 
          isAuthenticated={authStatus.youtube}
          onPlaylistFetched={handlePlaylistFetched}
          onError={(error) => setMessage({ type: 'error', text: error })}
        />
        
        {playlist && (
          <>
            <PlaylistPreview playlist={playlist} />
            <ConvertButton 
              isAuthenticated={authStatus.spotify}
              playlist={playlist}
              onConvertComplete={handleConvertComplete}
              onError={(error) => setMessage({ type: 'error', text: error })}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
