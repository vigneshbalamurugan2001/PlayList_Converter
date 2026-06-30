import './PlaylistPreview.css';

function PlaylistPreview({ playlist }) {
  return (
    <div className="playlist-preview">
      <h2>{playlist.title}</h2>
      {playlist.description && <p className="description">{playlist.description}</p>}
      <p className="song-count">{playlist.videoCount} songs found</p>
      
      <div className="songs-list">
        {playlist.items.slice(0, 10).map((item, index) => (
          <div key={index} className="song-item">
            <span className="song-number">{index + 1}</span>
            <div className="song-info">
              <div className="song-title">{item.song}</div>
              <div className="song-artist">{item.artist}</div>
            </div>
          </div>
        ))}
        {playlist.items.length > 10 && (
          <div className="more-songs">
            ... and {playlist.items.length - 10} more songs
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistPreview;
