import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Redirect, Route, Switch } from 'react-router';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Login from './features/Login';
import Home from './features/Home';

const customHistory = createBrowserHistory();
const Root = () => {
 return (
  <Router history={customHistory}>
   <Switch>
    <Route path="/login" component={Login} />
    <Route path="/app/home" component={Home} />
    <Redirect from="/" to="/login" />
   </Switch>
  </Router>
 )
}

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
