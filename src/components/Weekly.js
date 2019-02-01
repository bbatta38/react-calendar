import React, { Component } from 'react';

class Weekly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: []
    }
    this.dateClick = this.dateClick.bind(this);
  }

  dateClick(e) {
    e.preventDefault();
    const pressedDate = e.currentTarget.text;
    const { mode } = this.props;
    let nameofclass = '';
    switch (mode) {
      case 'remove':
        nameofclass = '';
        break;
      case 'holiday':
        nameofclass = 'holiday';
        break;
      case 'birthday':
        nameofclass = 'birthday';
        break;
      case 'busy':
        nameofclass = 'busy';
        break;
      case 'aniversary':
        nameofclass = 'aniversary';
        break;
      default:
        break;
    }
    this.props.pressDate({ nameofclass, pressedDate });
  }

  getWeek() {
    const { dateTable, year } = this.props;
    const dates = dateTable.map((dateNum, i) => {
      return (
        <td key={i} className={dateNum.classes}>
          <a href="#" onClick={this.dateClick} data-index={dateNum.count} data-date={`${year}/${dateNum.month + 1}/${dateNum.count}`}>{dateNum.count}</a>
        </td>
      );
    });
    return dates;
  }

  render() {
    return (
      <tr>
        {this.getWeek()}
      </tr>
    );
  }
}

export default Weekly;
