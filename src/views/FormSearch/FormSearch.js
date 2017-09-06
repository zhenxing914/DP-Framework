import React, { Component } from 'react';
import { Table, message} from 'antd';
import { Request, resolve } from 'dputils';

export default class FormSearch extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            userId:1778,
            buyedApps: [],
            tableLoading:true
        };
        this.parseBuyedAppsData.bind(this);
        this.handleClick.bind(this);
    }

    handleClick() {
       message.error("查看失败");
    }

    parseBuyedAppsData(datas){
        for(var i=0;i<datas.length;i++){
            var data = datas[i];
            data.id = i;
            data.query = i;
        }
        return datas;
    }

    componentWillMount() {
        let userId = this.state.userId;
        let fetchUrl = "/openApi/ApiMarket/getBuyedApps?userId=" + userId;
        Request(fetchUrl).then( data => {
            resolve(data, datas => {
                let dataList = this.parseBuyedAppsData(datas);
                this.setState({buyedApps: dataList,tableLoading:false});
            }, error => {
                message.error(error);
            });
        });
    }

    render () {
        const columns = [{
            title: '应用名称',
            dataIndex: 'name',
        }, {
            title: '描述',
            dataIndex: 'desc',
        }, {
            title: '购买时间',
            dataIndex: 'buyTime',
        }, {
            title: '查看',
            dataIndex: 'query',
            render: (text,record) =>
                <div className="table-operation"><a onClick={this.handleClick.bind()}>查看</a></div>
        }];
        return <div className="main-content">
          <div className="main-content-body">
            <div className="content-title">
              <span>Table页</span>
            </div>
            <div className="content-body">
              <Table rowKey="id" dataSource={this.state.buyedApps} columns={columns} loading={this.state.tableLoading}/>
            </div>
          </div>
        </div>
    }

}