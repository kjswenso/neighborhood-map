import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js'

class Map extends Component {

render() {

  return(
     <main>
      <div id="map">
      </div>
      <Sidebar venues={this.props.venues} 
        filterVenues={this.props.filterVenues}/>
     </main>
    )
  }
}

export default Map
