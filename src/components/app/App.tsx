/* eslint-disable react/no-multi-comp */

import PropTypes from 'prop-types';
import React from 'react';

// Loads the external and app css, javascript, and assets.
import './appExternals';

// Since ../routes loads all the pages, we need to put it after the scss or the style order will be wrong.
import {RoutesSwitch} from '../routes';

/**
 * The App component.
 */
const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <RoutesSwitch />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element,
  page: PropTypes.element,
  pageTitle: PropTypes.string,
};

export default App;
