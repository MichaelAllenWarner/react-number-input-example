import React, { Component } from 'react';
import { BadInput } from './BadInput';
import { GoodInput } from './GoodInput';

export class App extends Component {
  render() {
    return (
      <>
        <BadInput />
        <GoodInput />
      </>
    );
  }
}