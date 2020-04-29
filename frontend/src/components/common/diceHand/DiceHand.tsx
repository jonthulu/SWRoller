import lodash from 'lodash';
import React from 'react';

import {DiceStoreBase} from '../../../stores/diceSets/common/diceStoreBase';

type Props<SymbolType, StatsType> = {
  diceSet: DiceStoreBase<SymbolType, StatsType>;
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
  const hand = diceSet.getHand();

  return (
    <div className="dice-hand">
      <div className="dice-box box">
        <div className="inner-box">
          {lodash.map(hand, (die, iter) => (
            <a key={die.name + iter} className="dice-box-die">
              <img
                className="die-image"
                src={die.imagePath}
                alt={die.name}
                onClick={(): void => diceSet.removeFromHand(die)}
              />
            </a>
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
