import React, { Component } from 'react';
import './App.css';

class Sidebar extends Component {

	render() {
		return(
			<div id="sidebar">
				<input value={this.props.venues} onChange={(e) => { this.props.filterVenues(e.target.value) }}/>
			</div>
			)
	}
}

export default Sidebar