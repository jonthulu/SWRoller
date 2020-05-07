import lodash from 'lodash';
import React from 'react';

import DisplayDie from '../displayDie/DisplayDie';
import {DiceStoreResult} from '../../../diceSets/common/diceStoreBase';
import {Die} from '../../../diceSets/common/die';

import './diceChooser.scss';

type Props<SymbolType, StatsType> = {
  diceTypes: Record<string, Die<SymbolType>>;
  diceSet: DiceStoreResult<SymbolType, StatsType>;
}

/**
 * The DiceChooser component.
 *
 * @param props
 * @param props.diceTypes - The list of dice types.
 * @param props.diceSet - The dice set.
 */
function DiceChooser<SymbolType, StatsType>({
  diceTypes,
  diceSet
}: Props<SymbolType, StatsType>): React.ReactElement
{
  return (
    <div className="dice-chooser">
      <div className="dice-choice-instructions instructions">
        Tap the dice below to add them to your hand.
      </div>

      <div className="dice-choice box">
        <div className="inner-box">
          {lodash.map(diceTypes, (die, dieName) => (
            <DisplayDie key={dieName} display={die.display} onClick={(): void => diceSet.addToHand(die)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiceChooser;
