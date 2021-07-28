import React from "react";
import "./Timers.css";

const FocusDuration = ({ duration, handler, session }) => {
  const { focusDuration } = duration;
  const front0 = focusDuration < 10 ? '0' : ''
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        {/* TODO(DONE): Update this text to display the current focus session duration */}
        Focus Duration: {front0}{focusDuration}:00
      </span>
      <div className="input-group-append">
        {/* TODO(DONE): Implement decreasing focus duration and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-timer focusBtn"
          data-testid="decrease-focus"
          name="decreaseFocus"
          disabled={session}
          onClick={handler}
        >
          <span className="oi oi-minus" />
        </button>
        {/* TODO(DONE): Implement increasing focus duration  and disable during a focus or break session */}
        <button
          type="button"
          className="btn btn-timer focusBtn"
          data-testid="increase-focus"
          name="increaseFocus"
          disabled={session}
          onClick={handler}
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
};

export default FocusDuration;
