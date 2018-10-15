import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

/*https://www.youtube.com/watch?v=W5LhLZqj76s&index=2&list=PLBDR9JgF-I5Qz6A2TjO2bslaltdxwWy8i
  Used Elharony's YouTube tutorial on getting the Google Map to load without any external components
  */

class App extends Component {

  render() {

    return (
      <main>
        <Map />
      </main>
    );
  }
}

export default App;
