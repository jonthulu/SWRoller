import React from 'react';
import { Link, IndexRoute, Route, Router } from 'react-router';

import App from './components/App.react.js';
import Home from './components/Home.react.js';

var AppRouter = React.createClass({
  render() {
    return (
      <Router>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="home" component={Home} />
        </Route>
      </Router>
    );
  }
});

React.render(<AppRouter />, document.getElementById('appContentWrapper'));
