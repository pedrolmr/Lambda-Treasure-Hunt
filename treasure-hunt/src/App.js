import React, { Component } from 'react';
import './App.css';
import data from './data.json';
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

  // componentDidMount(){
  //   axios
  //     .get(`${url}/init`, config)
  //     .then(res => {
  //       let graph = this.updateGraph(
  //         res.data.room_id,
  //         this.parseCoords(res.data.coordinates),
  //         res.data.exits
  //       );
  //       this.setState({
  //         room_id: res.data.room_id,
  //         messages: res.data.messages,
  //         coordinates:this.parseCoordinates(res.data.coordinates),
  //         exits: [...res.data.exits],
  //         cooldown: res.data.cooldown,
  //         items: [...res.data.items],
  //         player:[...res.data.players],
  //         graph
  //       });
  //     })
  //   if (localStorage.hasOwnProperty('graph')) {
  //     let value = JSON.parse(localStorage.getItem('graph'));
  //     this.setState({ graph: value });
  //   } else {
  //     localStorage.setItem('graph', JSON.stringify(data));
  //     let value = JSON.parse(localStorage.getItem('graph'));
  //     this.setState({ graph: value });
  //   }
  // }

  // updateGraph = (id, coords, exits) => {
  //   let graph = Object.assign({}, this.state.graph);
  //   if (!this.state.graph[id]) {
  //     let payload = [];
  //     payload.push(coords);
  //     const moves = {};
  //     exits.forEach(exit => {
  //       moves[exit] = '?';
  //     });
  //     payload.push(moves);
  //     graph = { ...graph, [id]: payload };
  //   }

  //   localStorage.setItem('graph', JSON.stringify(graph));
  //   return graph;
  // };

  // parseCoords = coords => {
  //   const coordsObject = {};
  //   const coordsArray = coords.replace(/[{()}]/g, '').split(',');

  //   coordsArray.forEach(coord => {
  //     coordsObject['x'] = parseInt(coordsArray[0]);
  //     coordsObject['y'] = parseInt(coordsArray[1]);
  //   });

  //   return coordsObject;
  // };

  // movePlayer = direction => {
  //   const data = { direction: direction }
  //   axios
  //     .post(`${url}/move`, data, config)
  //     .then(res => {
  //       this.setState({
  //         curr_room: res.room_id,
  //         exits: res.exits,
  //         coordinates: res.coordinates,
  //         cooldown: res.cooldown
  //       })
  //       console.log('curr_room:', this.state.curr_room);
  //     })
  // };

  // enterDirection = event => {
  //   event.preventDefault();
  //   const move = { direction: this.state.input }
  //   if (this.state.input === 'n' || this.state.input === 'e' || this.state.input === 'w' || this.state.input === 's'){
  //     axios
  //       .post(`${url}/move`, move, config)
  //       .then(res => {
  //         this.setState({
  //           room_id: this.state.room_id,
  //           coordinates: this.state.coordinates,
  //           exits: this.state.exits,
  //           items: this.state.items,
  //           path: this.state.path.concat(this.state.input)                 
  //         });
  //       })
  //   }
  // }
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