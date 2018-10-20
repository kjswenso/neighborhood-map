import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {


	render() {
		return(
			<div id="sidebar">
				<input placeholder="search for coffee shops" onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
				<ol className="sidebar-venue-list" >
				{this.props.venues && this.props.venues.length > 0 && this.props.venues.filter(venue => venue.name.toLowerCase().includes(this.props.query.toLowerCase())).map((venue, index) => (
					<li className="sidebar-venue-item" key={index}>
					{venue.name}
					</li>
					))}
				</ol>
			</div>
			)
	}
}

export default Sidebar
