import React, { Component } from 'react';
import Week from './Weekly';

class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthName: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      modeAndDate: []
    };

    this.pressDate = this.pressDate.bind(this);
  }

  pressDate(obj) {
    this.setState({
      ...this.state,
      modeAndDate: [...this.state.modeAndDate, obj]
    });
  }

  getWeeks() {
    const table = [],
      weekNum = 7,
      today = new Date().getDate();
    let total = 0,
      count = 0,
      rows = 5,
      dateTable = [],
      classNames = '';
    const { dateNum, startDay, isToday, month, year, mode } = this.props;
    const { modeAndDate } = this.state;
    if ((startDay === 5 && dateNum === 31) || (startDay === 6 && dateNum > 29)) {
      rows = 6;
    }
    for (let i = 0; i < rows; i++) {
      dateTable = [];
      for (let j = 0; j < weekNum; j++) {
        total++;
        if (total <= startDay) {
          dateTable.push('');
        } else {
          count++;
          if (count > dateNum) {
            dateTable.push('');
          } else {
            if (isToday && today === count) {
              classNames = 'today';
            } else {
              classNames = '';
            }

            for (let k = 0; k < modeAndDate.length; k++) {
              if (Number(modeAndDate[k].pressedDate) === count) {
                if (classNames.indexOf('today') !== -1) {
                  classNames = `today ${modeAndDate[k].nameofclass}`;
                } else {
                  classNames = modeAndDate[k].nameofclass;
                }
              }
            }

            dateTable.push({ count, classes: classNames, month });

          }
        }
      }
      table.push(
        <Week
          dateTable={dateTable}
          key={total}
          mode={mode}
          year={year}
          pressDate={this.pressDate}
        />
      );
    }
    return table;
  }

  render() {
    const { monthName } = this.state;
    const { month } = this.props;
    return (
      <li>
        <div className="calendar-wrap">
          <table className="calendar-table">
            <caption>{monthName[month]}</caption>
            <thead>
              <tr>
                <th>Su</th>
                <th>M</th>
                <th>Tu</th>
                <th>W</th>
                <th>Th</th>
                <th>F</th>
                <th>Sa</th>
              </tr>
            </thead>
            <tbody>
              {this.getWeeks()}
            </tbody>
          </table>
        </div>
      </li>
    );
  }
}

export default Monthly;
