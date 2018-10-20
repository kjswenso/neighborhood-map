//Ryan Waite's walkthrough https://www.youtube.com/watch?v=5J6fs_BlVC0

export function load_google_maps() {
	return new Promise(function(resolve, reject) {
		//define global callback that will return when map loads
		window.resolveGoogleMapsPromise = function () {
			//resolve global obj 
			resolve(window.google);
			//delete global callback to tidy after not needed
			delete window.resolveGoogleMapsPromise;
		}
		//Load Google Maps API
		const script = document.createElement("script");
		script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBqfFulVdCVgTQv_hUCq6vRZlaBTHOGbqg&callback=resolveGoogleMapsPromise';
		script.async = true;
		document.body.appendChild(script);

	})
}

export function load_places() {
	var apiURL = 'https://api.foursquare.com/v2/venues/search?client_id=1NPLIXKCBYIMLDOVGKBVAJQDMMSSSNVKVPFUKVMAO2M3YXUR&client_secret=AJS5HHGWH3IL4EL1XUC2I3Q3OUAN1U0SEUYB1FUC2UK2ZCBT&ll=27.772,-82.664&query=coffee&v=20181019';
	return fetch(apiURL).then(resp => resp.json())
}