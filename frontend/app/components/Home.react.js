import React from 'react';

import Roller from './roller/Roller.react.js';

class Home extends React.Component {
  render = () => {
    return (
      <div className="actions">
        <Roller />
      </div>
    );
  }
}

export default Home;
