import React from 'react';
import { Router, Route, Link } from 'react-router';

import App from './components/App.react.js';
import Home from './components/Home.react.js';

var AppRouter = React.createClass({
  render() {
    return (
      <Router>
        <Route path="/" component={App}>
          <Route path="home" component={Home} />
        </Route>
      </Router>
    );
  }
});

React.render(<AppRouter />, document.getElementById('appContentWrapper'));