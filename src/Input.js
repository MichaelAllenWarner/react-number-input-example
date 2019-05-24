import React, { Component } from 'react';

export class Input extends Component {
  state = {
    value: ''
  };

  handleInput = event => {
    const inputIsGood =(
      event.target.validity.valid
      && Number.isInteger(+event.target.value)
      && +event.target.value >= 1
      && +event.target.value <= 9
    );

    if (inputIsGood) {
      this.setState({ value: (+event.target.value).toString() });
    } else {
      this.setState({ value: '' });
    }
  };

  render() {
    return (
      <input
        type="number"
        min="1"
        max="9"
        value={this.state.value}
        onInput={this.handleInput}
      />
    );
  }
}