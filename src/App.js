import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

/*https://www.youtube.com/watch?v=W5LhLZqj76s&index=2&list=PLBDR9JgF-I5Qz6A2TjO2bslaltdxwWy8i
  Used Elharony's YouTube tutorial on getting the Google Map to load without any external components
  */

class App extends Component {

  componentDidMount() {
    this.loadMap()
  }
  
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBqfFulVdCVgTQv_hUCq6vRZlaBTHOGbqg&callback=initMap")
    window.initMap = this.initMap
  }


  initMap = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 27.768, lng: -82.657},
        zoom: 14
      });
    }


  render() {

    return (
      <main>
        <div id="map"></div>
      </main>
    );
  }
}


function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0]
  const script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
