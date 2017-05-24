import React from 'react';
import moment from 'moment';
import { message, Table, Input, Button, Dropdown, Icon, Menu } from 'antd';
import {Request, resolve} from 'dputils';

const orderStatus = () => {
  return {
    ' ': '全部',
    RUNNING: '处理中',
    WAIT_ADD: '待客户补充',
    WAIT_CONFIRM: '待客户确认', 
    COMPLETE: '已完成', 
    CANCEL: '已撤销'
  }
}

export default class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    var _this = this;
    let content = (
      <Menu onClick={this.chooseStatus.bind(_this)}>
        {Object.entries(orderStatus()).map( key => {
          return <Menu.Item key={key[0]}>{key[1]}</Menu.Item>
        })}
      </Menu>
    )

    this.state = {
      tds: [],
      loading: false,
      query: '',
      pageId: 1,
      orderStatus: '',
      //antd table组件列信息
      columns: [{
        title: '工单编号',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
      }, {
        title: '相关产品与服务',
        dataIndex: 'module',
        key: 'module',
      }, {
        title: '问题标题',
        dataIndex: 'title',
        key: 'title',
      }, {
        title: 
          <Dropdown overlay={content}> 
            <div className='form-search-switch-status'>状态<Icon type="caret-down" /></div>
          </Dropdown>,
        dataIndex: 'status',
        key: 'status',
      }, {
        title: '提交时间',
        dataIndex: 'gmtCreated',
        key: 'gmtCreated',
        sorter: (a, b) => new Date(a.gmtCreated).valueOf() - new Date(b.gmtCreated).valueOf(),
      }, {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => 
          <span>
            <a key={text} onClick={() => this.checkDetails(text, record)} className='form-search-operation-position'>{text[0]}</a>
          </span>
      }]
    }
    this.setQuery = this.setQuery.bind(this);
    this.conditionQuery = this.conditionQuery.bind(this);
    this.conditionQueryByEnter = this.conditionQueryByEnter.bind(this);
    this.checkDetails = this.checkDetails.bind(this);
    this.getOrderList = this.getOrderList.bind(this);
  }

  setQuery(e) {
    this.setState({
      query: e.target.value
    })
  }

  //请求table数据，需要在回调中调用，参数对应筛选条件，分别为页码，工单状态，模糊查询内，工单所属模块（demo中没用到）
  getOrderList(page=1, status='', searchContent='', subModuleId='0') {
    this.setState({loading: true});
    Request(`/homeapi/workorder/getList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        page,
        status,
        searchContent: encodeURIComponent(searchContent),
        subModuleId
      }
    }).then(items => {
      this.setState({loading: false});
      var _this = this;
      resolve(items, function() {
        var tds = [];
        items.respBody.message.workOrderList.forEach(item => {
          var td = {};
          for (let [key, value] of Object.entries(item)) {
            switch(key) {
              case 'status':
                var operation = ['COMPLETE','CANCEL'].includes(value) ? true : false;
                var status = `●${orderStatus()[value]}`;
                var color = value == 'COMPLETE' ? '#22c202': '#ff0000';
                td[key] = <span style={{color}}>{status}</span>;
                break
              case 'id':
                td[key] = ('000000000' + value).substr(-9);
                break
              case 'gmtCreated':
                td[key] = moment(value).format('YYYY-MM-DD HH:mm:ss');
                break
              case 'title':
                td[key] = value.length > 7 ? value.substr(0, 7) + '……' : value;
                break;
              default:
                td[key] = value;
            }
          }
          td['key'] = td['id'];
          td['module'] = `${td['module']}/${td['subModule']}`
          td['operation'] = ['查看'];
          tds.push(td);
        })

        _this.setState({
          tds,
          totalCount: items.respBody.message.totalCount
        })
      })
    })
  }

  //点击触发模糊查询
  conditionQuery() {
    this.getOrderList(this.state.page, this.state.orderStatus, this.state.query);
  }

  //回车触发模糊查询
  conditionQueryByEnter(e) {
    if(e.charCode == 13) {
      this.conditionQuery();
    }
  }

  //查看指定状态的工单
  chooseStatus(item) {
    this.setState({
      orderStatus: item.key
    })
    this.getOrderList(this.state.page, item.key, this.state.query);
  }

  //每条工单项的‘查看’回调
  checkDetails() {
    console.log('test');
  }

  //生命周期函数，组件加载进页面前触发
  componentWillMount() {
    var _this = this;
    this.getOrderList();
  }

  render() {
    const pagination = {
      total: this.state.totalCount,
      pageSize: 10,
      current: this.state.pageId,
      onChange: (page) => {this.setState({pageId: page});this.getOrderList(page, this.state.orderStatus, this.state.query)}
    }

    let start = this.state.pageId*10-9;
    let end = (this.state.pageId*10 < this.state.totalCount) ? this.state.pageId*10 : this.state.totalCount

    return (
      <div className='form-search'>
        <div className="form-search-title">表单查找</div>
        <div className="form-search-content">
          <div className='form-search-input-search'><Input addonAfter={<span className='form-search-hover' onClick={this.conditionQuery}>查询</span>} onKeyPress={this.conditionQueryByEnter} onChange={this.setQuery} placeholder='工单号/问题标题/问题描述关键词' /></div>
          <Table columns={this.state.columns} dataSource={this.state.tds} loading={this.state.loading} pagination={pagination}/>
          {!!this.state.totalCount&&<div className='form-search-table-supply'>{`显示第${start}到第${end}项结果，共${this.state.totalCount}项`}</div>}
        </div>
      </div>
    )
  }
}
