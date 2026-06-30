export const requireAuth = (service) => {
  return (req, res, next) => {
    if (service === 'youtube') {
      if (!req.session.youtubeAuthenticated) {
        return res.status(401).json({ 
          error: 'YouTube authentication required',
          service: 'youtube'
        });
      }
    } else if (service === 'spotify') {
      if (!req.session.spotifyAuthenticated) {
        return res.status(401).json({ 
          error: 'Spotify authentication required',
          service: 'spotify'
        });
      }
    }
    next();
  };
};
