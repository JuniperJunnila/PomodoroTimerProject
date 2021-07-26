import React from "react";
import "./Timers.css";

const BreakDuration = ({ duration, handler, session }) => {
  const { breakDuration } = duration;
  return (
    <div className="float-right">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-break">
          {/* TODO(DONE): Update this text to display the current break session duration */}
          Break Duration: {breakDuration}:00
        </span>
        <div className="input-group-append">
          {/* TODO(DONE): Implement decreasing break duration and disable during a focus or break session*/}
          <button
            type="button"
            className="btn btn-timer"
            data-testid="decrease-break"
            name="decreaseBreak"
            disabled={session}
            onClick={handler}
          >
            <span className="oi oi-minus" />
          </button>
          {/* TODO(DONE): Implement increasing break duration and disable during a focus or break session*/}
          <button
            type="button"
            className="btn btn-timer"
            data-testid="increase-break"
            name="increaseBreak"
            disabled={session}
            onClick={handler}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakDuration;
