import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faPlay, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import $ from 'jquery';
import './App.css';

// Timer enum
const timerLabel = {
  Session: "Session",
  Break: "Break"
};

let s = new Date();
let timeout, offsetIntv;
let currentMs = 0;
let offsetTime = 0;

// Styling
const timeLabelWhite = {
  'color': 'rgb(200, 200, 200)'
}

const timeLabelRed = {
  'color': 'rgb(200, 0, 0)'
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timerLabel: timerLabel.Session,
      timeProgress: false,
      newTime: true,
      timer: "25:00"
    };
  
    this.stopTime = this.stopTime.bind(this);
    this.startTime = this.startTime.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.clearOffset = this.clearOffset.bind(this);
    this.fmtTimeToStr = this.fmtTimeToStr.bind(this);
    this.setSessionTime = this.setSessionTime.bind(this);
    this.startOffsetCount = this.startOffsetCount.bind(this);
  }
  startTime() {
    this.setState({
      timeProgress: (this.state.timeProgress) ? false : true
    }, () => {
      let t = new Date();

      if (this.state.timeProgress) {
        console.log("Pomodoro start!");

        if (this.state.newTime) {
          s = new Date();
          s.setTime(s.getTime() + (this.state.sessionTime * 60000));

          $(".display").css(timeLabelWhite);

          this.setState({
            newTime: false
          });
        } else {
          s.setTime(s.getTime() + (offsetTime * 1000));
          this.clearOffset();
        }

        timeout = setInterval(() => {
          currentMs = s.getTime() - t.getTime();
          t.setTime(currentMs);
          
          this.fmtTimeToStr(t.getMinutes(), t.getSeconds());

          t = new Date();
          let sec = Math.floor(currentMs / 1000);

          if (sec <= 10) {
            if (sec % 2 === 0) {
              $(".display").css(timeLabelRed);
            } else {
              $(".display").css(timeLabelWhite);
            }
          }

          if (sec <= 0) {
            this.stopTime();

            this.setState({
              timeProgress: false,
              newTime: true
            });
          }
        }, 500);
      } else {   
        console.log(`Pause date: ${t.toTimeString()}`);

        this.stopTime();
        this.startOffsetCount();
      }
    });
  }
  stopTime() {   
    window.clearInterval(timeout);
    
    console.log("Pomodoro stop!");
  }
  startOffsetCount() {
    console.log("Counting offset");

    offsetIntv = setInterval(() => { offsetTime++; }, 1000);
  }
  clearOffset() {
    offsetTime = 0;
    window.clearInterval(offsetIntv);
  }
  resetTimer() {
    this.setState({
      timerLabel: timerLabel.Session,
      timeProgress: false,
      newTime: true
    }, () => {
      currentMs = 0;
      
      $(".display").css(timeLabelWhite);
      window.clearInterval(timeout);

      this.clearOffset();
      this.fmtTimeToStr(this.state.sessionTime);
    });
  }
  setSessionTime() {
    if (this.state.timeProgress) return;

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
    
    this.setState({
      newTime: true
    });
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
            <button id="reset" onClick={this.resetTimer}><FontAwesomeIcon icon={faRotateLeft} /></button>
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
