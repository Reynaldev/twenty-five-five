import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faPlay, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const d = new Date();

const timerLabel = {
  Session: "Session",
  Break: "Break"
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timerLabel: timerLabel.Session,
      timeProgress: false,
      timer: "00:00"
    };
  }
  
  render() {
    return (
      <div>
        <div class="display">
            <h5 id="timer-label">{this.state.timerLabel}</h5>
            <h3 id="time-left">{this.state.timer}</h3>
        </div>
        <div class="row">
          <div class="col">
            <h4 id="break-label">Break Length</h4>
            
            <button id="break-increment"><FontAwesomeIcon icon={faAngleUp} /></button>
            <h5 id="break-length" style={{padding: "8px"}}>{this.state.breakTime}</h5>
            <button id="break-decrement"><FontAwesomeIcon icon={faAngleDown} /></button>
          </div>
          <div class="col-sm-2" style={{paddingTop: "4em", paddingBottom: "4em"}}>
            <button id="start_stop"><FontAwesomeIcon icon={faPlay} /></button>
            <button id="reset"><FontAwesomeIcon icon={faRotateLeft} /></button>
          </div>
          <div class="col">
            <h4 id="session-label">Session Length</h4>

            <button id="session-increment"><FontAwesomeIcon icon={faAngleUp} /></button>
            <h5 id="session-length" style={{padding: "8px"}}>{this.state.sessionTime}</h5>
            <button id="session-decrement"><FontAwesomeIcon icon={faAngleDown} /></button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
