import './Header.css';

function Header() {
  return (
    <header className="header">
      <h1 className="title">
        <span className="youtube-text">YouTube</span>
        {' → '}
        <span className="spotify-text">Spotify</span>
      </h1>
      <p className="subtitle">Convert your YouTube playlists to Spotify instantly</p>
    </header>
  );
}

export default Header;
