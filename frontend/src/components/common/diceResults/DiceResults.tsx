import lodash from 'lodash';
import React from 'react';

import {DiceStoreBase} from '../../../stores/diceSets/common/diceStoreBase';

type Props<SymbolType, StatsType> = {
  diceSet: DiceStoreBase<SymbolType, StatsType>;
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
  const stateHistory = diceSet.state.history;
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
              <a key={`${rolledSide}${iter}`} className="dice-result-die">
                <img
                  className="die-side-image"
                  alt={rolledSide.name}
                  src={rolledSide.imagePath}
                />
              </a>
            ))}
          </div>

          <div className="dice-result-stat-images">
            {lodash.map(lastItem.images, (statImage, i) => (
              <a key={`${statImage}${i}`}>
                <img className="result-image" src={statImage} alt="result" />
              </a>
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
