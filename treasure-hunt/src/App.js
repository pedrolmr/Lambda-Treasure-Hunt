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
    title:'',
    description:'',
    messages: '',
    reverseDirection: { 0: { n: "?", s: "?", e: "?", w: "?" } },
    graph: {},
    items:[],
    storeInfo: null,
    curr_room: null,
    progress:0,
    path:[],
    input: ''
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
    const data = { direction: direction }
    axios
      .post(`${url}/move`, data, config)
      .then(res => {
        this.setState({
          curr_room: res.room_id,
          exits: res.exits,
          coordinates: res.coordinates,
          cooldown: res.cooldown
        })
        console.log('curr_room:', this.state.curr_room);
      })
  };

  enterDirection = event => {
    event.preventDefault();
    const move = { direction: this.state.input }
    if (this.state.input === 'n' || this.state.input === 'e' || this.state.input === 'w' || this.state.input === 's'){
      axios
        .post(`${url}/move`, move, config)
        .then(res => {
          this.setState({
            room_id: this.state.room_id,
            coordinates: this.state.coordinates,
            exits: this.state.exits,
            items: this.state.items,
            path: this.state.path.concat(this.state.input)                 
          });
        })
    }
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
      </div>
    );
  }
}

export default App;