import React, { Component } from 'react';
import Month from './Monthly';
import Mark from './Mark';

class Yearly extends Component {
  constructor() {
    super();
    this.year = new Date().getFullYear();
    const dateNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const selectedYear = this.year;
    if (selectedYear % 4 === 0 & selectedYear % 100 !== 0 || selectedYear % 400 === 0) {
      dateNum[1] = 29;
    }
    this.state = {
      dateNum,
      selectedYear
    };
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  makeCalendar() {
    const currentYear = new Date().getFullYear();
    const totalMonth = this.state.dateNum.map((month, i) => {
      const startDay = new Date(this.state.selectedYear, i, 1).getDay();
      const today = new Date().getMonth();
      let isToday = false;
      if (i === today && this.state.selectedYear === currentYear) {
        isToday = true;
      } else {
        isToday = false;
      }

      return (
        <Month
          year={this.state.selectedYear}
          mode={this.state.mode}
          month={i}
          dateNum={month}
          startDay={startDay}
          isToday={isToday}
          key={i}
        />
      );
    })
    return totalMonth
  }

  prevClick(e) {
    e.preventDefault();
    const currentYear = this.state.selectedYear - 1;
    this.setYear(currentYear);
  }

  nextClick(e) {
    e.preventDefault();
    const currentYear = this.state.selectedYear + 1;
    this.setYear(currentYear);
  }

  setYear(year) {
    const { dateNum } = this.state;
    if (year % 4 === 0 & year % 100 !== 0 || year % 400 === 0) {
      dateNum[1] = 29;
    } else {
      dateNum[1] = 28;
    }
    this.setState({
      selectedYear: year,
      dateNum
    })
  }

  changeMode(mode) {
    this.setState({
      ...this.state,
      mode: mode
    });
  }

  render() {
    return (
      <div>
        <header className="head">
          <button type="button" onClick={this.prevClick}>&lt;</button>
          <h1>{this.state.selectedYear}</h1>
          <button type="button" onClick={this.nextClick}>&gt;</button>
        </header>
        <main>
          <Mark changeMode={this.changeMode} />
          <ul className="cal-list">
            {this.makeCalendar()}
          </ul>
        </main>
      </div>
    );
  }
}

export default Yearly;
