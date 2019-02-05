import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
const url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/'

class App extends Component {
  state = {
    room_id: 0,
    coordinates: (60,60),
    exits: [],
    cooldown: 0,
    graph: { 0: { "n": "?", "s": "?", "e": "?", "w": "?" } }

  }
  componentDidMount(){
    this.init();
  }

  init = () => {
    const config = {
      headers: {
        Authorization: `Token ${process.env.REACT_APP_API_KEY}`
      }
    }
    axios
      .get(url, config)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <h1>MAP!</h1>
      </div>
    );
  }
}

export default App;

// curl - X GET - H 'Authorization: Token [YOUR_API_KEY]' https://lambda-treasure-hunt.herokuapp.com/api/adv/init/