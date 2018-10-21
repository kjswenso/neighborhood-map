import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js'
import Header from './Header.js'

import { load_google_maps, load_places } from './utils.js'

//Ryan Waite's walkthrough https://www.youtube.com/watch?v=5J6fs_BlVC0 to get the map in directly and add markers

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query : '', 
      venues : []
    }
  }


setMapMarkers = () => {
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

        let infoDisp = '<div class="info-disp">' +
          '<h4>' + venue.name + '</h4>' +
          '<p>' + venue.location.formattedAddress + '</p>' +
          '</div>'

         marker.addListener('click', () => {
          marker.getAnimation() !== null ? 
            marker.setAnimation(null) : marker.setAnimation(google.maps.Animation.BOUNCE)
              setTimeout(() => marker.setAnimation(null), 1500)
        })

         google.maps.event.addListener(marker, 'click', () => {
          this.infoWindow.setContent(infoDisp);
          this.map.setCenter(marker.position);
          this.infoWindow.open(this.map, marker);
         })

          this.markers.push(marker);
        });

        this.setState({ venues })
      })
}
//get map, set markers, filter venues with query
  componentDidMount() {
    this.setMapMarkers();
  }

  animateList = (venue) => {
    let marker = this.markers.filter(m => m.venue.id === venue.id)[0];
    this.infoWindow.setContent(marker.name);
    this.map.setCenter(marker.position);
    this.infoWindow.open(this.map, marker);

    marker.getAnimation() !== null ? 
            marker.setAnimation(null) : marker.setAnimation(window.google.maps.Animation.BOUNCE)
              setTimeout(() => marker.setAnimation(null), 1500)
  }

  li_click = (venue) => {
    let marker = this.markers.filter(m => m.venue.id === venue.id)[0];
    /*let info_obj = this.info_boxes.filter(i => i.id === venue.id)[0];
    let infoBox = info_obj && info_obj.contents || "nothing...";
    if(marker && infoBox) {
      if (marker.getAnimation() !== null) { marker.setAnimation(null); }
      else { marker.setAnimation(this.google.maps.Animation.BOUNCE); }
      setTimeout(() => { marker.setAnimation(null) }, 1500);

      this.infowindow.setContent(infoBox);
      this.map.setZoom(13);
      this.map.setCenter(marker.position);
      this.infowindow.open(this.map, marker);
      this.map.panBy(0, -125);
      if(window.innerWidth < 769) {
        this.toggleSideBar();
      }*/
      console.log(marker)
    }

  filterVenues = (query) => {
    this.markers.forEach(marker => {
      marker.name.toLowerCase().includes(query.toLowerCase()) === true ?
        marker.setVisible(true) : marker.setVisible(false);
    })


    this.setState({ query });
  }

  openSearch = () => {
    const sideDisp = document.querySelector('#sidebar');
    sideDisp.style.display = 'block';
  }

  closeSearch = () => {
    const sideDisp = document.querySelector('#sidebar');
    sideDisp.style.display = 'none';
  }

  render() {

    return (
      <main className="main">
        <Header openSearch={this.openSearch} />
        <div id="map" role="application" aria-label="Google Map" ></div>
        <Sidebar venues={this.state.venues}
          query={this.state.query}
          filterVenues={this.filterVenues} 
          animateList={this.animateList} 
          closeSearch={this.closeSearch}
          />
        <footer className="footer">
          <p>Created using FourSquare API and React</p>
        </footer>
      </main>
    );
  }
}

export default App;