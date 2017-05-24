import React from 'react';
import {Header} from 'dpcomponents';

export default class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const icon = {
			key: "/",
			value: <span className='icon-telecom-logo'></span>
		}
		return (
			<div className='content'>
				{window.location.pathname != '/log' && <Header icon={icon}/>}
			  {this.props.children}
			</div>
		)
	}
}