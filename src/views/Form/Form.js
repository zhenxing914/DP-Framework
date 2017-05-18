import React from 'react';
import {Link} from 'react-router';
import {Menu, Breadcrumb} from 'antd';
import {Header} from 'DPComponents';

const dict = {
	"form": "表单示例",
	"formSearch": "表单查找",
	"formSubmit": "表单提交",
}

export default class Form extends React.Component {
	constructor() {
		super()
		this.state = {
			selectedKey: "search"
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(item) {
		this.setState({
			selectedKey: item.key
		})
	}

	renderBreadcrumb() {
		var crumbs = window.location.pathname.split('/');
		crumbs.shift();
		return crumbs.map(item => <Breadcrumb.Item className="form-breadcrumb">{dict[item]}</Breadcrumb.Item>)
	}

	render() {
		const icon = {
			key: "/",
			value: <span className='icon-telecom-logo'></span>
		}

		window.location.pathname

		return (
			<div>
				<Header icon={icon}/>
				<div className='form-wrapper'>
					<Menu theme={"dark"} onClick={this.handleClick} className="form-sidebar" selectedKeys={[this.state.selectedKey]} mode="inline">
            <Menu.Item key="search"><Link to="/form/formSearch">表单查找</Link></Menu.Item>
            <Menu.Item key="submit"><Link to="/form/formSubmit">表单提交</Link></Menu.Item>
        	</Menu>
        	<div className='form-content'>
        		<Breadcrumb>
					   	{this.renderBreadcrumb()}
					  </Breadcrumb>
        		{this.props.children}
        	</div>
				</div>
			</div>
		)
	}
}