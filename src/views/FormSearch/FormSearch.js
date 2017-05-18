import React from 'react';
import {Table, Input, Button, Icon} from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a href="#">Delete</a>
      <span className="ant-divider" />
      <a href="#" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

export default class Formsearch extends React.Component {
	constructor() {
		super()
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange() {

	}

	render() {
		return (
			<div className="form-search">
				<div className="form-search-title">表单提交</div>
				<div className="form-search-form">
					<Input/>
					<Button type="primary">提交</Button>
				</div>
				<div className="form-search-table"><Table columns={columns} dataSource={data}/></div>
			</div>
		)
	}
}