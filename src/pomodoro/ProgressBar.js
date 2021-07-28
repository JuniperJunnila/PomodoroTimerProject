import React from "react";

const ProgressBar = ({ session, duration }) => {
  if (!session) return null
  const timeTotal = (session.label === 'Focusing'? duration.focusDuration : duration.breakDuration) * 60
  const timeElapsed = timeTotal - session.timeRemaining
  const timePercent = (timeElapsed/timeTotal) * 100
  let minutes = Math.floor(session?.timeRemaining/60)
  minutes = minutes < 10 ? minutes='0'+minutes:minutes=minutes
  let seconds = session?.timeRemaining-(minutes*60)
  seconds = seconds === 0 ? seconds = '00' : seconds
  seconds = (seconds < 10 && seconds > 0) ? seconds = '0' + seconds : seconds
  const focusDuration = duration.focusDuration < 10 ? `0${duration.focusDuration.toString()}:00` : `${duration.focusDuration.toString()}:00`
  const breakDuration = duration.breakDuration < 10 ? `0${duration.breakDuration.toString()}:00` : `${duration.breakDuration.toString()}:00`

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          {/* TODO(DONE): Update message below to include current session (Focusing or On Break) total duration */}
          <h2 data-testid="session-title">
            {session?.label} for {session?.label === 'Focusing' ? focusDuration : breakDuration} minutes
          </h2>
          {/* TODO(DONE): Update message below correctly format the time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {`${minutes}:${seconds}`} remaining
          </p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={timePercent} // TODO(DONE): Increase aria-valuenow as elapsed time increases
              style={{ width: `${timePercent}%` }} // TODO(DONE): Increase width % as elapsed time increases
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
