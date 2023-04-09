import "./App.css";
import SpotifyIcon from "./assets/spotify-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePic from "./assets/profile-pic.png";
import { FiSearch } from "react-icons/fi";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { BiMenuAltRight } from "react-icons/bi";
import "react-jinke-music-player/assets/index.css";
// import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import ActivePlayer from "./components/ActivePlayer";
import { RxCrossCircled } from "react-icons/rx";
import { useQuery } from "react-query";
import axios from "axios";

// const ALL_SONGS = gql`
//   query {
//     getSongs(playlistId: 1) {
//       _id
//       artist
//       duration
//       photo
//       title
//       url
//     }
//   }
// `;

const endpoint = "https://api.ss.dev/resource/api";

const ALL_SONGS = `
  query {
    getSongs(playlistId: 1) {
      _id
      artist
      duration
      photo
      title
      url
    }
  }
`;

function App() {
  const [fetchedSongs, setfetchedSongs] = useState([]);
  const [activeSong, setActiveSong] = useState();
  const [searchterm, setSearchterm] = useState(" ");
  const [showMobileNav, setShowMobileNav] = useState(false);

  const { data, isLoading, error } = useQuery("launches", () => {
    return axios({
      url: endpoint,
      method: "POST",
      data: {
        query: ALL_SONGS,
      },
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    }).then((response) => setfetchedSongs(response.data.data.getSongs));
  });

  // const result = useQuery(ALL_SONGS);

  // useEffect(() => {
  //   if (result.loading === false) {
  //     setfetchedSongs(result.data.getSongs);
  //   }
  // }, [result]);

  const durationInSeconds = (duration) => {
    let formattedDuration = duration / 60;
    let finalDuration = Math.trunc(formattedDuration);
    let minute = duration - finalDuration * 60;
    return `${finalDuration}:${minute}`;
  };

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

          <BiMenuAltRight
            className="mobile-nav"
            onClick={() => setShowMobileNav((prevState) => !prevState)}
          />
        </div>
        <div className="mid-section">
          <div className="mid-section__top-part">
            <h2>For You</h2>
            <div className="search">
              <input
                placeholder="Search song, artist"
                onChange={({ target }) => setSearchterm(target.value)}
              />
              <FiSearch className="search__icon" />
            </div>
          </div>
          <div className="playlist">
            {fetchedSongs
              .filter((val) => {
                if (searchterm == " ") {
                  return val.title;
                } else if (
                  val.title.toLowerCase().includes(searchterm.toLowerCase())
                ) {
                  return val.title;
                }
              })
              .map((el, idx) => (
                <div
                  className="song"
                  key={idx}
                  onClick={() => setActiveSong(el)}
                >
                  <div className="song__container">
                    <img src={el.photo} alt="Song Pic" className="song--pic" />
                    <div className="song__info">
                      <h4>{el.title}</h4>
                      <p>{el.artist}</p>
                    </div>
                  </div>
                  <p className="song__duration">
                    {durationInSeconds(el.duration)}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <ActivePlayer song={activeSong ? activeSong : fetchedSongs[0]} />
      </div>

      {showMobileNav ? (
        <div className="mobile-navigation">
          <div className="mid-section__top-part">
            <div className="mobile-navigation__title-container">
              <h2>For You</h2>
              <RxCrossCircled
                className="close-nav"
                onClick={() => setShowMobileNav(false)}
              />
            </div>
            <div className="search">
              <input
                placeholder="Search song, artist"
                onChange={({ target }) => setSearchterm(target.value)}
              />
              <FiSearch className="search__icon" />
            </div>
          </div>
          <div className="playlist">
            {fetchedSongs
              .filter((val) => {
                if (searchterm == " ") {
                  return val.title;
                } else if (
                  val.title.toLowerCase().includes(searchterm.toLowerCase())
                ) {
                  return val.title;
                }
              })
              .map((el, idx) => (
                <div
                  className="song"
                  key={idx}
                  onClick={() => {
                    setActiveSong(el);
                    setShowMobileNav(false);
                  }}
                >
                  <div className="song__container">
                    <img src={el.photo} alt="Song Pic" className="song--pic" />
                    <div className="song__info">
                      <h4>{el.title}</h4>
                      <p>{el.artist}</p>
                    </div>
                  </div>
                  <p className="song__duration">{el.duration}</p>
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
