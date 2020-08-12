import React, { Component } from 'react';
import './App.css';

interface State {
  counter: number;
  error: boolean;
}

class App extends Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      counter: 1,
      error: false,
    };
  }

  render() {
    const { counter, error } = this.state;

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {counter}</h1>
        <button data-test="increment-button" onClick={() => this.setState({ counter: counter + 1, error: false })}>
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={() => this.setState({ counter: counter - 1 >= 0 ? counter - 1 : counter, error: true })}
        >
          Decrement counter
        </button>
        {error && <p data-test="error-message">Counter can't go below zero</p>}
      </div>
    );
  }
}

export default App;
