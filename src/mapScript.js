function initMap() {

    //https://stackoverflow.com/questions/15531390/adding-array-of-markers-in-google-map
    const murals = [
      ['Red Mesa Mercado', 27.771, -82.650],
      ['Green Bench Brewing', 27.772, -82.650],
      ['The Bends', 27.772, -82.647],
      ['Coney Island Sandwich Shop', 27.775, -82.647],
      ['Bandit Coffee Co', 27.771, -82.669]
    ]

    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 27.768, lng: -82.657},
      zoom: 14
    });

    let infoWindow = new google.maps.InfoWindow;

    let marker, i;

    for (i = 0; i < murals.length; i++) {
      marker = new google.maps.Marker({
       position: new google.maps.LatLng(murals[i][1], murals[i][2]),
       map: map
  });

  google.maps.event.addListener(marker, 'click', (function(marker, i) {
       return function() {
           infoWindow.setContent(murals[i][0]);
           infoWindow.open(map, marker);
       }
  })(marker, i));
    }

}