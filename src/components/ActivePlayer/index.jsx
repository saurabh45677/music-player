import Player from "../Player";

const ActivePlayer = ({ song }) => {
  return (
    <div className="right-section">
      <div className="right-section__content">
        <h2>{song?.title}</h2>
        <p>{song?.artist}</p>
        <div>
          <img
            src={song?.photo}
            alt="Song Cover Pic"
            className="right-section__pic"
          />
          <Player songURL={song?.url} name={song?.title} />
        </div>
      </div>
    </div>
  );
};

export default ActivePlayer;
