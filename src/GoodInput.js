import React, { Component } from 'react';

export class GoodInput extends Component {
  state = {
    value: ''
  };

  handleInput = event => {
    const inputIsGood = (
      Number.isInteger(+event.target.value)
      && +event.target.value >= 1
      && +event.target.value <= 9
    );

    if (inputIsGood) {
      this.setState({ value: (+event.target.value).toString() });
    } else {
      this.setState({ value: 'df' }); // string is a space (NOT empty)
    }
  };

  render() {
    return (
      <input
        type="number"
        min="1"
        max="9"
        style={{ width: '15em' }}
        value={this.state.value}
        onInput={this.handleInput}
        placeholder="This one works right."
      />
    );
  }
}