import './AuthButtons.css';

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.5 6.2a2.8 2.8 0 0 0-2-2C18.7 3.7 12 3.7 12 3.7s-6.7 0-8.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.8 2.8 2.8 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.8ZM9.8 15.5v-7l6.4 3.5-6.4 3.5Z" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.6.6 0 0 1-.83.2c-2.27-1.39-5.13-1.7-8.5-.93a.6.6 0 1 1-.27-1.17c3.69-.85 6.86-.48 9.4 1.08.3.18.39.56.2.82Zm1.22-2.7a.75.75 0 0 1-1.03.25c-2.6-1.6-6.56-2.06-9.63-1.13a.75.75 0 1 1-.44-1.44c3.52-1.07 7.9-.55 10.85 1.28.36.22.47.68.25 1.04Zm.1-2.82C14.9 9.03 9.6 8.85 6.56 9.78a.9.9 0 1 1-.52-1.72c3.5-1.07 9.31-.86 12.98 1.34a.9.9 0 0 1-.93 1.54Z" />
    </svg>
  );
}

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
        {authStatus.youtube ? <CheckIcon /> : <YouTubeIcon />}
        {authStatus.youtube ? 'YouTube Connected' : 'Connect YouTube'}
      </button>

      <button
        className={`auth-btn spotify-btn ${authStatus.spotify ? 'connected' : ''}`}
        onClick={handleSpotifyAuth}
        disabled={authStatus.spotify}
      >
        {authStatus.spotify ? <CheckIcon /> : <SpotifyIcon />}
        {authStatus.spotify ? 'Spotify Connected' : 'Connect Spotify'}
      </button>
    </div>
  );
}

export default AuthButtons;
