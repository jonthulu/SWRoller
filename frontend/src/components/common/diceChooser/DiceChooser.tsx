import lodash from 'lodash';
import React from 'react';

import {DiceStoreBase} from '../../../stores/diceSets/common/diceStoreBase';
import {Die} from '../../../stores/diceSets/common/die';

type Props<SymbolType, StatsType> = {
  diceTypes: Record<string, Die<SymbolType>>;
  diceSet: DiceStoreBase<SymbolType, StatsType>;
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
          {lodash.map(diceTypes, (die, diceName) => (
            <a key={diceName} className="dice-choice-die">
              <img
                className="die-image"
                src={die.imagePath}
                alt={diceName}
                onClick={(): void => diceSet.addToHand(die)}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiceChooser;
