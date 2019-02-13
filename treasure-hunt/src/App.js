import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
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
    title:'',
    description:'',
    messages: [],
    inverse: { n: 's', s: 'n', w: 'e', e: 'w' },
    graph: {},
    items:[],
    storeInfo: null,
    curr_room: null,
    progress:0,
    path:[],
    input: '',
    generating: false,
    isExploring: false,
    gold:null,
    inventory: [],
    visited: new Set(),
    players: []
  }
  
  render() {
    return (
      <div className="App">
        <h1>{this.state.room_id}</h1>
        <h1>{this.state.coordinates}</h1>
        <h1>{this.state.exits}</h1>
        <h1>{this.state.cooldown}</h1>
        <h1>{this.state.items}</h1>

        <form onSubmit={this.move}>
          <input type="text" value={this.state.data} onChange={this.movePlayer}/>
          <button type='submit'>Submit</button>
        </form>

        <Map />
      </div>
    );
  }
}

export default App;