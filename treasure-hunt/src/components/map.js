import React, { Component } from 'react';
import data from '../data.json';
class Map extends Component {
    state = {
        graph: data,
        coordinates: [],
        edges: []
    }

    nodes = () => {
        const map = this.state.graph;
        let coordinates = [];
        for (let room in map) {
            coordinates.push(map[room][0]);
        }
        this.setState({ coordinates: coordinates });

    };

    render(){
        return (
            <div>
                
            </div>
        )
    }
}
export default Map;