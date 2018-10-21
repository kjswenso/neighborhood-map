import React, { Component } from 'react';
import './App.css';

class Header extends Component {

	render() {
		return(
			<header className="header">
				<h1 className="app-title">St. Pete Coffee</h1>
				<button className="search-open" onClick={() => {this.props.openSearch()}}>Search</button>
			</header>
			)
	}

}

	export default Header