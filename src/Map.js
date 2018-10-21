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
        query={this.props.query}
        filterVenues={this.props.filterVenues}
        animateList={this.props.animateList} />
     </main>
    )
  }
}

export default Map