import React from 'react';

import SwRoller from '../../common/swRoller/SwRoller';
import {swDiceSets} from '../../../stores/diceSets/swDiceSet/SwDiceSet';

import './homePage.scss';

/**
 * The MarketingPage component.
 */
function HomePage(): React.ReactElement {
  return (
    <div id="home-page">
      <SwRoller diceSetId={swDiceSets.generateId()} />
    </div>
  );
}

export default HomePage;
