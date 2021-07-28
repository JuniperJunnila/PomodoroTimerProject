import React from "react";
import "./Timers.css";

const BreakDuration = ({ duration, handler, session }) => {
  const { breakDuration } = duration;
  const front0 = breakDuration < 10 ? '0' : ''
  return (
    <div className="float-right">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-break">
          Break Duration: {front0}{breakDuration}:00
        </span>
        <div className="input-group-append">
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
