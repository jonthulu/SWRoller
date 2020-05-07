import React from 'react';

import DiceActions from '../diceActions/DiceActions';
import DiceChooser from '../diceChooser/DiceChooser';
import DiceHand from '../diceHand/DiceHand';
import DiceResults from '../diceResults/DiceResults';
import {useSrSchemaDiceSet, getDiceTypes} from '../../../diceSets/srSchemaDiceSet/srSchemaDiceSet';

import './srSchemaRoller.scss';

/**
 * The SrSchemaRoller component.
 */
function SrSchemaRoller(): React.ReactElement
{
  const diceTypes = getDiceTypes();
  const srSchemaDiceSet = useSrSchemaDiceSet();

  return (
    <div className="roller sr-schema-roller column">
      <DiceChooser diceTypes={diceTypes} diceSet={srSchemaDiceSet} />

      <DiceHand diceSet={srSchemaDiceSet} />

      <DiceActions diceSet={srSchemaDiceSet} />

      <DiceResults diceSet={srSchemaDiceSet} />
    </div>
  );
}

export default SrSchemaRoller;
