import React from 'react';
import {Link} from 'react-router';

export default class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<ul className="sidebar">
			    <li><Link to="/login">Login Demo</Link></li>
			    <li><Link to="/form">Form Demo</Link></li>
			  </ul>
			  <div className="content">
			  	{this.props.children}
			  </div>
			</div>
		)
	}
}