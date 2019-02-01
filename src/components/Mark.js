import React, { Component } from 'react'

class Mark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conditions: ['remove', 'holiday', 'birthday', 'busy', 'aniversary']
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const mode = e.currentTarget.value;
    this.props.changeMode(mode);
  }

  render() {
    return (
      <div className="mark-list">
        <form name="checkcondition">
          <ul>
            {
              this.state.conditions.map((condition, i) => {
                return (
                  <li key={i}>
                    <input type="radio" id={condition} name="spdate" value={condition} onChange={this.onChange} />
                    <label htmlFor={condition}>{condition.toUpperCase()}</label>
                  </li>
                );
              })
            }
          </ul>
        </form>
      </div>
    )
  }
}

export default Mark;