import React from 'react';
import {Input, Select, Button} from 'antd';

export default class FormSubmit extends React.Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange() {

	}

	render() {
		return (
			<div className="form-submit">
				<div className="form-submit-title">表单提交</div>
				<div className="form-submit-subtitle">标题：</div>
				<div className="form-submit-form"><Input/></div>
				<div className="form-submit-subtitle">类型：</div>
				<div className="form-submit-form">
					<Select defaultValue="lucy" onChange={this.handleChange} style={{width: 200}}>
			      <Select.Option value="jack">Jack</Select.Option>
			      <Select.Option value="lucy">Lucy</Select.Option>
			      <Select.Option value="disabled" disabled>Disabled</Select.Option>
			      <Select.Option value="Yiminghe">yiminghe</Select.Option>
			    </Select>
			  </div>
				<div className="form-submit-subtitle">描述：</div>
				<div className="form-submit-textarea"><Input type="textarea" rows={8}/></div>
				<div className="form-submit-btnGroup">
					<Button type="primary">提交</Button>
					<Button>取消</Button>
				</div>
			</div>
		)
	}
}