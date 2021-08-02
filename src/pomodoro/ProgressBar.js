import React from "react";

const ProgressBar = ({ session, duration }) => {
  if (!session) return null
  const timeTotal = (session.label === 'Focusing'? duration.focusDuration : duration.breakDuration) * 60
  const timeElapsed = timeTotal - session.timeRemaining
  const timePercent = (timeElapsed/timeTotal) * 100
  let minutes = Math.floor(session && session.timeRemaining/60)
  minutes = minutes < 10 ? minutes='0'+minutes:minutes=minutes
  let seconds = session && session.timeRemaining-(minutes*60)
  seconds = seconds === 0 ? seconds = '00' : seconds
  seconds = (seconds < 10 && seconds > 0) ? seconds = '0' + seconds : seconds
  const focusDuration = duration.focusDuration < 10 ? `0${duration.focusDuration.toString()}:00` : `${duration.focusDuration.toString()}:00`
  const breakDuration = duration.breakDuration < 10 ? `0${duration.breakDuration.toString()}:00` : `${duration.breakDuration.toString()}:00`

  return (
    <React.Fragment>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">
            {session && session.label} for {session && session.label === 'Focusing' ? focusDuration : breakDuration} minutes
          </h2>
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
              aria-valuenow={timePercent}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProgressBar;
