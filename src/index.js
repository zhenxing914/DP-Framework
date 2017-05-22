//引入react，react-router
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';
import {Request, setCookie} from 'DPUtils';

//引入容器组件 
import App from './layout/App/App';
import Login from './views/Login/Login';
import Form from './views/Form/Form';
import FormSearch from './views/FormSearch/FormSearch';
import FormSubmit from './views/FormSubmit/FormSubmit';

//引入全局css
import 'DPComponents/assets/index.css';
import '../style/style.css';
import '../style/App.css';
import '../style/Login.css';
import '../style/Form.css';

var logStatus = "";

//同步请求，获取token后方可跳入页面，页面对无权限用户不可见，isLogin不会导致页面重定向
//除去isLogin，其他数据接口如果头部不包含cookie，会重定向页面到登陆页
const saveToken = (nextState, replace, next) => {
  Request(`/homeapi/usrcenter/isLogin`).then(data => {
    logStatus = JSON.parse(data.respBody.message)
    if(logStatus.fullname) {
      setCookie("fullname", logStatus.fullname)
    }
    next();
  })
}

//子页面跳转前，验证token是否存在
const checkToken = (nextState, replace, next) => {
  logStatus.isLogin ? next() : window.location.href = `/log?fromUrl=${window.location.href}`
}

ReactDOM.render(
  	<Router history={browserHistory}>
  		<Route path="/" component={App} onEnter={saveToken}>
        <IndexRedirect  to="form/formSearch"/>
  			<Route path="log" component={Login}></Route>
  			<Route path="form" component={Form} onEnter={checkToken}>
					<Route path="formSearch" component={FormSearch}></Route>
  				<Route path="formSubmit" component={FormSubmit}></Route>
  			</Route>
  		</Route>
  	</Router>
  , document.querySelector('.container'));
