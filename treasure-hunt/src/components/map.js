import React, { Component } from 'react';
import data from '../data.json'

const divs = ""
const Map = () => {
    return(
        <div>
            {data.map(roomId => {
                const coordinates = data[roomId][0]
                const exits = data[roomId][1]
                const coordinates = [coordinates[0] - 45, 30 - (coordinates[1] - 45)]

                const style = ""
            })}
        </div>
    )
}
export default Map;