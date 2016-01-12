import React from 'react';

import Roller from './roller/Roller.react.js';

var Home = React.createClass({
  render: function homeRender() {
    return (
      <div className="actions">
        <Roller />
      </div>
    );
  }
});

export default Home;
