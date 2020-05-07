import React from 'react';

import DiceActions from '../diceActions/DiceActions';
import DiceChooser from '../diceChooser/DiceChooser';
import DiceHand from '../diceHand/DiceHand';
import DiceResults from '../diceResults/DiceResults';
import {useSwDiceSet, getDiceTypes} from '../../../diceSets/swDiceSet/swDiceSet';

import './swRoller.scss';

/**
 * The SwRoller component.
 */
function SwRoller(): React.ReactElement
{
  const diceTypes = getDiceTypes();
  const swDiceSet = useSwDiceSet();

  return (
    <div className="roller sw-roller column">
      <DiceChooser diceTypes={diceTypes} diceSet={swDiceSet} />

      <DiceHand diceSet={swDiceSet} />

      <DiceActions diceSet={swDiceSet} />

      <DiceResults diceSet={swDiceSet} />
    </div>
  );
}

export default SwRoller;
