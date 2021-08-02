import React from "react";
//import "./StartStop.css";

const StartStop = ({ playPause, classNames, isTimerRunning, session, handler }) => {
  return (
    <div
      className="btn-group btn-group-lg mb-2"
      role="group"
      aria-label="Timer controls"
    >
      <button
        type="button"
        className="btn btn-play"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={playPause}
      >
        <span
          className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
          })}
        />
      </button>
      <button
        type="button"
        className="btn btn-stop"
        data-testid="stop"
        title="Stop the session"
        disabled={!session}
        onClick={handler}
      >
        <span className="oi oi-media-stop" />
      </button>
    </div>
  );
};

export default StartStop;
