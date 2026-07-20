import './Header.css';

function Header() {
  return (
    <header className="header">
      <span className="kicker">🎵 Playlist Converter</span>
      <h1 className="title">
        <span className="youtube-text">YouTube</span>
        <span className="arrow" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12h16M14 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="spotify-text">Spotify</span>
      </h1>
      <p className="subtitle">Convert your YouTube playlists to Spotify, instantly</p>
    </header>
  );
}

export default Header;
