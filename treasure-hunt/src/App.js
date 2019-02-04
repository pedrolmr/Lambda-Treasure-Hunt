import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    visited_rooms: {
      0: { n: "?", s: "?", w: "?", e: "?" }
    }
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
