import './AuthButtons.css';

function AuthButtons({ authStatus }) {
  const handleYouTubeAuth = () => {
    window.location.href = 'http://localhost:5000/auth/youtube';
  };

  const handleSpotifyAuth = () => {
    window.location.href = 'http://localhost:5000/auth/spotify';
  };

  return (
    <div className="auth-buttons">
      <button
        className={`auth-btn youtube-btn ${authStatus.youtube ? 'connected' : ''}`}
        onClick={handleYouTubeAuth}
        disabled={authStatus.youtube}
      >
        {authStatus.youtube ? '✓ YouTube Connected' : 'Connect YouTube'}
      </button>
      
      <button
        className={`auth-btn spotify-btn ${authStatus.spotify ? 'connected' : ''}`}
        onClick={handleSpotifyAuth}
        disabled={authStatus.spotify}
      >
        {authStatus.spotify ? '✓ Spotify Connected' : 'Connect Spotify'}
      </button>
    </div>
  );
}

export default AuthButtons;
