import React, { Component } from 'react';
import './App.css';

class Map extends Component {

componentDidMount() {
    this.loadMap()
  }
  
  loadMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyBqfFulVdCVgTQv_hUCq6vRZlaBTHOGbqg&callback=initMap")
    window.initMap = this.initMap
  }


  initMap = () => {

      const murals = [
        ['Red Mesa Mercado', 27.771, -82.650],
        ['Green Bench Brewing', 27.772, -82.650],
        ['The Bends', 27.772, -82.647],
        ['Coney Island Sandwich Shop', 27.775, -82.647],
        ['Bandit Coffee Co', 27.771, -82.669]
      ]

      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 27.768, lng: -82.657},
        zoom: 14
      });

      let infoWindow = new window.google.maps.InfoWindow;

      let marker, i;

      for (i = 0; i < murals.length; i++) {
        marker = new window.google.maps.Marker({
         position: new window.google.maps.LatLng(murals[i][1], murals[i][2]),
         map: map
    });

    window.google.maps.event.addListener(marker, 'click', (function(marker, i) {
         return function() {
             infoWindow.setContent(murals[i][0]);
             infoWindow.open(map, marker);
         }
    })(marker, i));
      }


  }

  render() {

    return(
       <main>
        <div id="map"></div>
       </main>
      )
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


  export default Map
