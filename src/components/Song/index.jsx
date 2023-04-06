import SongPic from "./../../assets/song-pic.png";

const Song = ({ title, artist, duration }) => {
  return (
    <div className="song">
      <div className="song__container">
        <img src={SongPic} alt="Song Pic" />
        <div className="song__info">
          <h4>{title}</h4>
          <p>{artist}</p>
        </div>
      </div>
      <p className="song__duration">{duration}</p>
    </div>
  );
};

export default Song;
