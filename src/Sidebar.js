import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {


	render() {
		return(
			<div id="sidebar">
				<h2>Coffee in St. Petersburg</h2>
				<input className="searchBar" placeholder="search for coffee shops" onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
				<ul className="sidebar-venue-list" >
				{this.props.venues && this.props.venues.length > 0 && this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.props.query.toLowerCase())).map((venue, index) => (
					<li className="sidebar-venue-item" key={index}>
					{venue.name}
					<br />
					{venue.location.address}
					<br />
					{venue.location.city}, {venue.location.state}
					</li>
					))}
				</ul>
			</div>
			)
	}
}

export default Sidebar
