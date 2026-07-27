# YouTube to Spotify Playlist Converter

A web application that converts YouTube playlists to Spotify playlists.

## Features

- Convert YouTube playlists to Spotify playlists
- OAuth authentication for both YouTube and Spotify
- Smart song matching algorithm
- User-friendly interface

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **APIs**: YouTube Data API v3, Spotify Web API

## Prerequisites

- Node.js (v16 or higher)
- YouTube Data API credentials
- Spotify Developer App credentials

## Setup Instructions

### 1. Get API Credentials

#### YouTube API:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (OAuth 2.0 Client ID)
5. Add authorized redirect URIs: `http://localhost:5000/auth/youtube/callback`

#### Spotify API:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Add redirect URI: `http://127.0.0.1:5000/auth/spotify/callback` (Spotify requires the literal `127.0.0.1`, not `localhost`, for HTTP redirect URIs)
4. Note your Client ID and Client Secret

### 2. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

# YouTube API
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
YOUTUBE_REDIRECT_URI=http://localhost:5000/auth/youtube/callback

# Spotify API (127.0.0.1, not localhost — see note above)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://127.0.0.1:5000/auth/spotify/callback

# Session Secret
SESSION_SECRET=your_random_session_secret_here
```

### 4. Run the Application

```bash
# Terminal 1 - Run backend
cd server
npm run dev

# Terminal 2 - Run frontend
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## How to Use

1. Click "Connect YouTube" to authenticate with your YouTube account
2. Enter the YouTube playlist URL you want to convert
3. Review the detected songs
4. Click "Connect Spotify" to authenticate with your Spotify account
5. Click "Convert to Spotify" to create the playlist
6. The playlist will be created in your Spotify account!

## Project Structure

```
PlayList_converter/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── services/         # Business logic
│   ├── middleware/       # Express middleware
│   ├── server.js         # Entry point
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `GET /auth/youtube` - Initiate YouTube OAuth
- `GET /auth/youtube/callback` - YouTube OAuth callback
- `GET /auth/spotify` - Initiate Spotify OAuth
- `GET /auth/spotify/callback` - Spotify OAuth callback
- `GET /auth/status` - Check authentication status
- `POST /auth/logout` - Logout

### Playlist Operations
- `POST /api/playlist/fetch` - Fetch YouTube playlist
- `POST /api/playlist/convert` - Convert to Spotify playlist

## License

MIT
