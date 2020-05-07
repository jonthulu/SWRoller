import lodash from 'lodash';
import React from 'react';

import DisplayDie from '../displayDie/DisplayDie';
import {DiceStoreResult} from '../../../diceSets/common/diceStoreBase';

import './diceHand.scss';

type Props<SymbolType, StatsType> = {
  diceSet: DiceStoreResult<SymbolType, StatsType>;
}

/**
 * The DiceHand component.
 *
 * @param props
 * @param props.diceSet - The dice set.
 */
function DiceHand<SymbolType, StatsType>({
  diceSet
}: Props<SymbolType, StatsType>): React.ReactElement
{
  const hand = diceSet.hand;

  return (
    <div className="dice-hand">
      <div className="dice-box box">
        <div className="inner-box">
          {lodash.map(hand, (die, i) => (
            <DisplayDie key={die.name + i} display={die.display} onClick={(): void => diceSet.removeFromHand(die)} />
          ))}
        </div>

        {(hand.length) ? (
          <div className="instructions remove-from">Tap dice above to remove them from your hand</div>
        ) : (
          <div className="empty-hand">Your Hand is Empty</div>
        )}
      </div>
    </div>
  );
}

export default DiceHand;
