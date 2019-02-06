import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
const url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv';
const config = {
  headers: {
    Authorization: `Token ${process.env.REACT_APP_API_KEY}`
  }
}
class App extends Component {
  state = {
    room_id: 0,
    coordinates: [],
    exits: [],
    cooldown: 0,
    reverseDirection: { "n": "s", "s": "n", "w": "e", "e": "w"},
    graph: {},
    items:[],
    storeInfo: null,
    curr_room: null,
    progress:0,
    path:[]
  }
  componentDidMount(){
    axios
      .get(`${url}/init`, config)
      .then(res => {
        this.setState({
          room_id: res.data.room_id,
          coordinates: res.data.coordinates,
          exits: res.data.exits,
          cooldown: res.data.cooldown,
          items: res.data.items,
        });
      })

    if(localStorage.hasOwnProperty('graph')){
      let localGraph = JSON.parse(localStorage.getItem('graph'));
      this.setState({graph: localGraph})
    }
  }

  movePlayer = direction => {
    const data = {direction: direction}
    axios
      .post(`${url}/move`, data, config)
      .then(res => {
        console.log(res.data)
        if('room_id' in res.data){
          this.setState({
            curr_room: res.room_id,
            exits: res.exits,
            coordinates: res.coordinates,
            cooldown: res.cooldown
          })
        }
      })
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.room_id}</h1>
        <h1>{this.state.coordinates}</h1>
        <h1>{this.state.exits}</h1>
        <h1>{this.state.cooldown}</h1>
        <h1>{this.state.items}</h1>
      </div>
    );
  }
}

export default App;

// curl - X GET - H 'Authorization: Token [YOUR_API_KEY]' https://lambda-treasure-hunt.herokuapp.com/api/adv/init/