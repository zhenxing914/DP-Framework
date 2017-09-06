//引入react，react-router
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';

//引入容器组件 
import App from './layout/App/App';
import Form from './views/Form/Form';
import FormSearch from './views/FormSearch/FormSearch';
import FormSubmit from './views/FormSubmit/FormSubmit';

//引入全局css
import 'dpcomponents/assets/index.css';
import '../style/style.css';
import '../style/App.css';
import '../style/Login.css';
import '../style/Form.css';
import '../style/yostyle.css';

ReactDOM.render(
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
        <IndexRedirect  to="form/formSearch"/>
  			<Route path="form" component={Form}>
                <Route path="formSearch" component={FormSearch}></Route>
  				<Route path="formSubmit" component={FormSubmit}></Route>
  			</Route>
  		</Route>
  	</Router>
  , document.querySelector('.container'));
