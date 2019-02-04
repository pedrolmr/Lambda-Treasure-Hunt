import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
const url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/'

class App extends Component {
  
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