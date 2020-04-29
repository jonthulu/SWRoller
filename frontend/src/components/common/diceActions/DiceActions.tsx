import React from 'react';

import {DiceStoreBase} from '../../../stores/diceSets/common/diceStoreBase';

type Props<SymbolType, StatsType> = {
  diceSet: DiceStoreBase<SymbolType, StatsType>;
}

/**
 * The DiceActions component.
 *
 * @param props
 * @param props.diceSet - The dice set.
 */
function DiceActions<SymbolType, StatsType>({
  diceSet
}: Props<SymbolType, StatsType>): React.ReactElement
{
  const hand = diceSet.getHand();

  return (
    <div className="dice-actions">
      <button
        type="button"
        className="btn btn-md btn-primary"
        onClick={(): void => diceSet.roll()}
        disabled={!hand.length}
      >Roll</button>

      <button
        type="button"
        className="btn btn-md btn-primary"
        onClick={(): void => diceSet.emptyHand()}
        disabled={!hand.length}
      >Clear All</button>
    </div>
  );
}

export default DiceActions;
