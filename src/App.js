import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

import { load_google_maps, load_places } from './utils.js'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query : ''
    }
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let loadPlacesPromise = load_places();

    Promise.all([
      googleMapsPromise,
      loadPlacesPromise
      ])
      .then(values => {
        let google = values[0];
        let venues = values[1].response.venues;

        console.log(venues)
        
        this.google = google;
        this.markers = [];
        this.infoWindow = new google.maps.InfoWindow();
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          scrollwheel: true,
          center: { lat: venues[0].location.lat, lng: venues[0].location.lng }
        })

        venues.forEach(venue => {
          let marker = new google.maps.Marker({
            position: { lat: venue.location.lat, lng: venue.location.lng },
            map: this.map,
            venue: venue,
            id: venue.id,
            name: venue.name,
            animation: google.maps.Animation.DROP
          });

         marker.addListener('click', () => {
          marker.getAnimation() !== null ? 
            marker.setAnimation(null) : marker.setAnimation(google.maps.Animation.BOUNCE)
              setTimeout(() => marker.setAnimation(null), 1500)
        })

         google.maps.event.addListener(marker, 'click', () => {
          this.infoWindow.setContent(marker.name);
          this.map.setCenter(marker.position);
          this.infoWindow.open(this.map, marker);
          this.map.panBy(0, -125)
         })

          this.markers.push(marker);
        });

        this.setState({ venues })
      })
  }

  filterVenues = (query) => {
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) : marker.setVisible(false);
    })


    this.setState({ query });
  }

  render() {

    return (
      <main>
        <Map venues={this.state.venues}
          query={this.state.query}
          filterVenues={this.filterVenues} />
      </main>
    );
  }
}

export default App;