import React from 'react';
import {Login as LoginComponent} from 'DPComponents';
import loginImg from './img/login.png';
import titleImg from './img/title.jpg';

export default class Login extends React.Component {
	constructor() {
		super()
	}

	render() {
		const demoIndex = "http://localhost:8080";
		const path = "http://10.142.97.11:8787";
		const menuList = [
        [{
          key: path + "/console",
          value: "总览"
        },{
          key: path + "/product",
          value: "产品服务",
          children: [{
            value: "大数据产品",
            children: [{
              key: path + "/product/offlineAnalysis",
              value: "数据工厂"
            },{
              key: path + "/product/intelligentScheduling",
              value: "智能调度"
            }]
          },{
            value:"数据服务",
            children: [{
              key: path + "/product/positionService",
              value: "位置服务"
            }]
          }]
        },{
          key: path + "/documents",
          value: "文档支持",
          children: [{
            value: null,
            children: [{
              key: path + "/documents/index?key=guid",
              value: "入门指南"
            },{
              key: path + "/documents/index?key=document",
              value: "产品文档"
            },{
              key: path + "/documents/index?key=faq",
              value: "常见问题"
            },{
              key: path + "/documents/index?key=support",
              value: "技术支持"
            }]
          }]
        }],
        [{
          key: path + "/user",
          value: 'PLACEHOlD',
          children: [{
            value: null,
            children: [{
              key: path + "/userCenter",
              value: "用户中心"
            },{
              key: path + "/logout",
              value: "退出"
            }]
          }]
        },{
          key: path + "/order/myOrder",
          value: "工单",
        },{
          key: path + "/message",
          value: "通知",
        }]
      ]

		return (
			<div className="login-iframe background">
        <div className="iframe-icon"><span className="icon-telecom-logo iframe-icon-inner"></span></div>
        <div className="background-img">
          <img src={loginImg} alt="" />
        </div>
        <div className="iframe-wrapper iframe-position">
          <LoginComponent fromUrl={demoIndex} appName={"todp"} subsys={"todp_web"} menuList={menuList}/>
        </div>
        <img src={titleImg} alt="" className="footer" />
      </div>
		)
	}
}