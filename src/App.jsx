import "./App.css";
import SpotifyIcon from "./assets/spotify-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePic from "./assets/profile-pic.png";
import { FiSearch } from "react-icons/fi";
import Song from "./components/Song";
import SongPic from "./assets/song-cover.png";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import Player from "./components/Player";

function App() {
  return (
    <div className="app">
      <div className="container-fluid">
        <div className="left-section">
          <div>
            <div className="logo__container">
              <img src={SpotifyIcon} alt="Spotify Icon" />
            </div>
            <ul className="left-nav">
              <a href="/">For You</a>
              <a href="/">For Tracks</a>
              <a href="/">Favourites</a>
              <a href="/">Recently Played</a>
            </ul>
          </div>

          <img src={ProfilePic} className="profile-pic" alt="Profile Pic" />
        </div>
        <div className="mid-section">
          <div className="mid-section__top-part">
            <h2>For You</h2>
            <div className="search">
              <input placeholder="Search song, artist" />
              <FiSearch className="search__icon" />
            </div>
          </div>
          <div className="playlist">
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
            <Song title="Starboy" artist="The Weekend" duration="4:16" />
          </div>
        </div>
        <div className="right-section">
          <div className="right-section__content">
            <h2>Ghost Stories</h2>
            <p>Artist</p>
            <div>
              <img
                src={SongPic}
                alt="Song Cover Pic"
                className="right-section__pic"
              />
              <Player />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
