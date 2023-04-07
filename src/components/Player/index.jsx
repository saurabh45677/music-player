import { useEffect, useState } from "react";
import useSound from "use-sound";
import harharShambhu from "./../../assets/harharShambhu.mp3";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { MdPauseCircleFilled } from "react-icons/md";
import { IconContext } from "react-icons";
import { HiDotsHorizontal, HiVolumeUp } from "react-icons/hi";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(harharShambhu);
  const [time, setTime] = useState({
    min: 0,
    sec: 0,
  });
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0,
  });
  const [seconds, setSeconds] = useState(0);

  const playingButton = () => {
    if (isPlaying) {
      pause(); // this will pause the audio
      setIsPlaying(false);
    } else {
      play(); // this will play the audio
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying, duration]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  return (
    <>
      <div className="sound-seek">
        <input
          type="range"
          min="0"
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
          <button className="playButton">
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
          <button className="playButton">
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
