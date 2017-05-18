import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';

import App from './layout/App/App';
import Login from './views/Login/Login';
import Form from './views/Form/Form';
import FormSearch from './views/FormSearch/FormSearch';
import FormSubmit from './views/FormSubmit/FormSubmit';

import 'DPComponents/assets/index.css';
import '../style/style.css';
import '../style/App.css';
import '../style/Login.css';
import '../style/Form.css';

ReactDOM.render(
  	<Router history={browserHistory}>
  		<Route path="/" component={App}>
  			<Route path="login" component={Login}></Route>
  			<Route path="form" component={Form}>
					<Route path="formSearch" component={FormSearch}></Route>
  				<Route path="formSubmit" component={FormSubmit}></Route>
  			</Route>
  		</Route>
  	</Router>
  , document.querySelector('.container'));
