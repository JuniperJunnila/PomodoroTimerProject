import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import FocusDuration from "./Focus";
import BreakDuration from "./Break";
import StartStop from "./StartStop";
import ProgressBar from "./ProgressBar";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession({ focusDuration, breakDuration }) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // ToDo(DONE): Allow the user to adjust the focus and break duration.
  const defaultDurationState = {
    focusDuration: 25,
    breakDuration: 5,
  };
  const [duration, setDuration] = useState({ ...defaultDurationState });

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/0477.mp3").play();
        return setSession(nextSession(duration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: duration.focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  const timerHandler = (event) => {
    let press =
      event.target.attributes.length > 1
        ? event.target.attributes
        : event.target.parentNode.attributes;
    press = press.name.value;
    switch (press) {
      case "increaseFocus":
        setDuration({ ...duration, focusDuration: Math.min(60, duration.focusDuration + 5) });
        break;
      case "decreaseFocus":
        setDuration({ ...duration, focusDuration: Math.max(5, duration.focusDuration - 5) });
        break;
      case "increaseBreak":
        setDuration({ ...duration, breakDuration: Math.min(15, duration.breakDuration + 1) });
        break;
      case "decreaseBreak":
        setDuration({ ...duration, breakDuration: Math.max(1, duration.breakDuration - 1) });
        break;
      default:
        break;
    }
  };

  const stopHandler = (event) =>{
    setSession(null)
    setIsTimerRunning(false)
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <FocusDuration
            duration={duration}
            handler={timerHandler}
            session={session}
          />
        </div>
        <div className="col">
          <BreakDuration
            duration={duration}
            handler={timerHandler}
            session={session}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <StartStop
            playPause={playPause}
            classNames={classNames}
            isTimerRunning={isTimerRunning}
            session={session}
            handler={stopHandler}
          />
        </div>
      </div>
      <div>
        {/* TODO(DONE): This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <ProgressBar session={session} duration={duration} />
      </div>
    </div>
  );
}

export default Pomodoro;
