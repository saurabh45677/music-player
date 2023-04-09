import { useState, useEffect } from "react";
import useSound from "use-sound";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { MdPauseCircleFilled } from "react-icons/md";
import { IconContext } from "react-icons";
import { HiDotsHorizontal, HiVolumeUp } from "react-icons/hi";

const Player = ({ songURL, name }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, duration, sound }] = useSound(
    "https://storage.googleapis.com/similar_sentences/Imagine%20Dragons%20-%20West%20Coast%20(Pendona.com).mp3"
  );
  const [seconds, setSeconds] = useState(0);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <>
      <div className="sound-seek">
        <input
          type="range"
          min={0}
          max={duration / 1000}
          default="0"
          value={seconds}
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div className="component">
        <div>
          <button className="three-dot__button">
            <HiDotsHorizontal className="three-dot" />
          </button>
        </div>
        <div>
          <button className="playButton" onClick={() => playingButton()}>
            <IconContext.Provider value={{ size: "1.6em", color: "#fff" }}>
              <TbPlayerTrackPrevFilled className="prev-button" />
            </IconContext.Provider>
          </button>
          {!isPlaying ? (
            <button className="playButton" onClick={() => playingButton()}>
              <IconContext.Provider value={{ size: "3em", color: "#fff" }}>
                <BsFillPlayCircleFill />
              </IconContext.Provider>
            </button>
          ) : (
            <button className="playButton" onClick={() => playingButton()}>
              <IconContext.Provider value={{ size: "3em", color: "#fff" }}>
                <MdPauseCircleFilled />
              </IconContext.Provider>
            </button>
          )}
          <button className="playButton" onClick={() => playingButton()}>
            <IconContext.Provider value={{ size: "1.6em", color: "#fff" }}>
              <TbPlayerTrackNextFilled className="next-button" />
            </IconContext.Provider>
          </button>
        </div>
        <div>
          <button className="volume__button">
            <HiVolumeUp className="volume-button" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
