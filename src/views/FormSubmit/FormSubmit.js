import React from 'react';
import {browserHistory} from 'react-router';
import {Input, Select, Button, message} from 'antd';
import {Request, resolve} from 'dputils';
import Required from '../../components/Required/Required';

const subModules = {
	"1": [{
		id: "1",
		value: "工单中心"
	},{
		id: "2",
		value: "消息中心"
	},{
		id: "3",
		value: "文档中心"
	},{
		id: "4",
		value: "帮助中心"
	}],
	"2": [{
		id: "6",
		value: "查询问题"
	}]
}

export default class FormSubmit extends React.Component {
	constructor() {
		super()
		this.state = {
			selectedModule: "1",
			selectedSubModule: "1",
			subModules: subModules["1"],
			title: "",
			desc: ""
		}
		this.setModule = this.setModule.bind(this);
		this.setSubModule = this.setSubModule.bind(this);
		this.setTitle = this.setTitle.bind(this);
		this.setDesc = this.setDesc.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	setModule(value) {
		this.setState({
			selectedModule: value,
			subModules: subModules[value],
			selectedSubModule: subModules[value][0].id
		})
	}

	setSubModule(value) {
		this.setState({
			selectedSubModule: value,
		})
	}

	setTitle(e) {
		this.setState({
			title: e.target.value
		})
	}

	setDesc(e) {
		this.setState({
			desc: e.target.value
		})
	}

	handleSubmit() {
		var title = this.state.title.replace(/^\s*|\s*$/g,'');
		if(!title.length) {
			message.error("标题不能为空")
		} else {
            message.info("创建成功！");
		}
	}

	renderSubModules(items) {
		return items.map(item => <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>)
	}

	render() {
		return (
			<div className="form-submit">
				<div className="form-submit-title">表单提交</div>
				<div className="form-submit-content">
					<div className="form-submit-subtitle"><Required/>表单标题：</div>
					<div className="form-submit-form"><Input style={{width: 200}} placeholder='标题长度不超过30字' value={this.state.title} onChange={this.setTitle} maxLength='30'/></div>
					<div className="form-submit-subtitle"><Required/>表单类型：</div>
					<div className="form-submit-form">
				    <Select value={this.state.selectedModule} onChange={this.setModule} style={{width: 200, marginRight: 20}}>
				      <Select.Option value="1" key="1">WEB门户</Select.Option>
				      <Select.Option value="2" key="2">数据仓库(HIVE)</Select.Option>
				    </Select>
				    <Select value={this.state.selectedSubModule} onChange={this.setSubModule} style={{width: 200}}>
				      {this.renderSubModules(this.state.subModules)}
				    </Select>
				  </div>
					<div className="form-submit-subtitle">表单描述：</div>
					<div className="form-submit-textarea"><Input type="textarea" rows={8} onChange={this.setDesc}/></div>
					<div className="form-submit-btnGroup">
						<Button type="primary" onClick={this.handleSubmit}>提交</Button>
						<Button>取消</Button>
					</div>
				</div>
			</div>
		)
	}
}