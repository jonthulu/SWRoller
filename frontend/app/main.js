import React from 'react';
import { browserHistory, Link, IndexRoute, Route, Router } from 'react-router';

import SwApp from './components/swApp/swApp.react.js';
import SwHome from './components/swHome/swHome.react.js';

var SwAppRouter = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={SwApp}>
          <IndexRoute component={SwHome} />
          <Route path="home" component={SwHome} />
        </Route>
      </Router>
    );
  }
});

React.render(<SwAppRouter />, document.getElementById('appContentWrapper'));
