import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {



	render() {
		return(
			<div id="sidebar">
			  <div className="search-top">
				<button className="search-close" onClick={() => {this.props.closeSearch()}}>Close</button>
				<h2>Search Coffee Locations</h2>
				<input className="search-bar" placeholder="search for coffee shops" onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
			  </div>
			  <div className="search-list">
				<ul className="sidebar-venue-list" >
				{this.props.venues && this.props.venues.length > 0 && this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.props.query.toLowerCase())).map((venue, index) => (
					<li className="sidebar-venue-item" key={index} onClick={() => { this.props.animateList(venue) }} >
					{venue.name}
					<br />
					{venue.location.address}
					<br />
					{venue.icon}
					</li>
					))}
				</ul>
			  </div>
			</div>
			)
	}
}

export default Sidebar