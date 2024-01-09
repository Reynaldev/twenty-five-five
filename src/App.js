import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faPlay, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const timerLabel = {
  Session: "Session",
  Break: "Break"
};

let d = new Date();
let timeout;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timerLabel: timerLabel.Session,
      timeProgress: false,
      timer: "25:00"
    };
  
    this.startTime = this.startTime.bind(this);
    this.fmtTimeToStr = this.fmtTimeToStr.bind(this);
    this.setSessionTime = this.setSessionTime.bind(this);
  }
  startTime() {
    this.setState({
      timeProgress: (this.state.timeProgress) ? false : true
    }, () => {
      let t = new Date(), s = new Date();

      if (this.state.timeProgress) {
        console.log("Pomodoro start!");

        s.setTime(s.getTime() + (this.state.sessionTime * 60000));

        timeout = setInterval(() => {
            t = new Date();
            var currentMs = s.getTime() - t.getTime();
            t.setTime(currentMs);

            this.fmtTimeToStr(t.getMinutes(), t.getSeconds());
        }, 500);
      } else {      
        console.log("Pomodoro stop!");
        window.clearInterval(timeout);

        this.setState({
          sessionTime: t.getMinutes()
        });
      }
    });
  }
  setSessionTime() {
    var el = document.activeElement;

    switch (el.id) {
      case "session-increment":
        this.setState({
          sessionTime: (this.state.sessionTime >= 60) ? 60 : this.state.sessionTime + 1
        }, () => { this.fmtTimeToStr(this.state.sessionTime); });
        break;
      case "session-decrement":
        this.setState({
          sessionTime: (this.state.sessionTime <= 1) ? 1 : this.state.sessionTime - 1
        }, () => { this.fmtTimeToStr(this.state.sessionTime); });
        break;
      default:
        break;
    }
  }
  fmtTimeToStr(m, s = "00") {
    let minute = m.toString();
    let second = s.toString();

    minute = minute.padStart(2, "0");
    second = second.padStart(2, "0");

    let str = `${minute}:${second}`;

    this.setState({
      timer: str
    })
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
            <button id="start_stop" onClick={this.startTime}><FontAwesomeIcon icon={faPlay} /></button>
            <button id="reset"><FontAwesomeIcon icon={faRotateLeft} /></button>
          </div>
          <div class="col">
            <h4 id="session-label">Session Length</h4>

            <button id="session-increment" onClick={this.setSessionTime}><FontAwesomeIcon icon={faAngleUp} /></button>
            <h5 id="session-length" style={{padding: "8px"}}>{this.state.sessionTime}</h5>
            <button id="session-decrement" onClick={this.setSessionTime}><FontAwesomeIcon icon={faAngleDown} /></button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
