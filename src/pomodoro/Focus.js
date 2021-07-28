import React from "react";
import "./Timers.css";

const FocusDuration = ({ duration, handler, session }) => {
  const { focusDuration } = duration;
  const front0 = focusDuration < 10 ? '0' : ''
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-focus">
        Focus Duration: {front0}{focusDuration}:00
      </span>
      <div className="input-group-append">
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
