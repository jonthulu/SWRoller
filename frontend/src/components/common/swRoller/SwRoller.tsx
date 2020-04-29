import React from 'react';
import {Subscribe} from 'unstated';

import DiceActions from '../diceActions/DiceActions';
import DiceChooser from '../diceChooser/DiceChooser';
import DiceHand from '../diceHand/DiceHand';
import DiceResults from '../diceResults/DiceResults';
import {swDiceSets, SwDiceSet} from '../../../stores/diceSets/swDiceSet/SwDiceSet';

type Props = {
  diceSetId: string;
}

/**
 * The SwRoller component.
 *
 * @param props
 * @param props.diceSetId - A unique identifier for the dice set.
 */
function SwRoller({diceSetId}: Props): React.ReactElement
{
  const swDiceSetContainer = swDiceSets.get(diceSetId);
  const diceTypes = swDiceSetContainer.getDiceTypes();

  return (
    <div className="roller sw-roller">
      <Subscribe to={[swDiceSetContainer]}>
        {(swDiceSet: SwDiceSet): React.ReactElement => (
          <>
            <DiceChooser diceTypes={diceTypes} diceSet={swDiceSet} />

            <DiceHand diceSet={swDiceSet} />

            <DiceActions diceSet={swDiceSet} />

            <DiceResults diceSet={swDiceSet} />
          </>
        )}
      </Subscribe>
    </div>
  );
}

export default SwRoller;
