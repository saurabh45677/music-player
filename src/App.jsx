import "./App.css";
import SpotifyIcon from "./assets/spotify-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePic from "./assets/profile-pic.png";
import { FiSearch } from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
import "react-jinke-music-player/assets/index.css";
// import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import ActivePlayer from "./components/ActivePlayer";
import { RxCrossCircled } from "react-icons/rx";
import { useQuery } from "react-query";
import axios from "axios";
import imageToGradient from "image-to-gradient";

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
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [activeSong, setActiveSong] = useState();
  const [searchterm, setSearchterm] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [gradient, setGradient] = useState("");
  const [activeCurrentPic, setActiveCurrentPic] = useState("");

  var options = {
    angle: 10, // gradient angle in degrees
    steps: 64, // number of steps
  };

  useQuery("launches", () => {
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
    }).then((response) => {
      setfetchedSongs(response.data.data.getSongs);
      setFilteredSongs(response.data.data.getSongs);
    });
  });

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = fetchedSongs.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase().trimStart()
          : "".toUpperCase().trimStart();
        const textData = text.toUpperCase().trimStart();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredSongs(newData);
      setSearchterm(text);
    } else {
      setFilteredSongs(fetchedSongs);
      setSearchterm(text);
    }
  };

  useEffect(() => {
    setActiveCurrentPic(activeSong?.photo);

    let activePic = activeCurrentPic
      ? activeCurrentPic
      : "https://images.genius.com/e95f361c27487088fd9dddf8c967bf89.500x500x1.jpg";
    imageToGradient(activePic, options, function (err, cssGradient) {
      setGradient(cssGradient);
    });
  }, [activeCurrentPic, activeSong]);

  const durationInSeconds = (duration) => {
    let formattedDuration = duration / 60;
    let finalDuration = Math.trunc(formattedDuration);
    let minute = duration - finalDuration * 60;
    return `${finalDuration}:${minute}`;
  };

  return (
    <div
      className="app"
      style={{
        background: `${gradient}`,
      }}
    >
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
                onChange={({ target }) => searchFilterFunction(target.value)}
              />
              <FiSearch className="search__icon" />
            </div>
          </div>
          <div className="playlist">
            {filteredSongs.map((el, idx) => (
              <div
                className="song"
                key={idx}
                onClick={() => {
                  setActiveSong(el);
                }}
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
        <ActivePlayer
          song={activeSong ? activeSong : fetchedSongs[0]}
          data={fetchedSongs}
        />
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
