import lodash from 'lodash';
import React from 'react';

import {DiceStoreResult} from '../../../diceSets/common/diceStoreBase';

import './diceResults.scss';
import DisplayDie from '../displayDie/DisplayDie';

type Props<SymbolType, StatsType> = {
  diceSet: DiceStoreResult<SymbolType, StatsType>;
}

/**
 * The DiceResults component.
 *
 * @param props
 * @param props.diceSet - The dice set.
 */
function DiceResults<SymbolType, StatsType>({
  diceSet
}: Props<SymbolType, StatsType>): React.ReactElement | null
{
  const stateHistory = diceSet.rollHistory;
  if (!stateHistory.length) {
    return null;
  }

  const lastItem = stateHistory[0];

  return (
    <div className="dice-results">
      <div className="box">
        <div className="inner-box">
          <div className="dice-result-images">
            {lodash.map(lastItem.rolledSides, (rolledSide, iter) => (
              <DisplayDie key={`${rolledSide.name}${iter}`} display={rolledSide.display} />
            ))}
          </div>

          <div className="dice-result-stat-images">
            {lodash.map(lastItem.displays, (display, i) => (
              <DisplayDie key={`${display.text}${i}`} display={display} />
            ))}
          </div>

          <div className="dice-result-stats">
            {renderRecordResults(lastItem.stats)}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the results if they are a record (plain javascript object).
 */
function renderRecordResults(stats: unknown): React.ReactElement[] | null {
  if (!lodash.isPlainObject(stats)) {
    return null;
  }

  return lodash.map(stats as Record<string, (number | string)>, (statValue, statName) => (
    <div key={statName} className="stat-value">
      <span className="result-stat-name">{statName}:</span>
      <span className="result-stat-value">{statValue}</span>
    </div>
  ));
}

export default DiceResults;
