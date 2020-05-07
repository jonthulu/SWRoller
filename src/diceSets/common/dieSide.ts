import {forEach} from 'lodash';

import {DieDisplay} from './die';

/**
 * The base class for a side of a die.
 */
export class DieSide<SymbolType>
{
  /**
   * The symbols on the die side.
   */
  symbols: SymbolType[] = [];

  /**
   * The name of the die side.
   */
  name = '';

  /**
   * The path to the image of the side.
   */
  display: DieDisplay;

  /**
   * The overall values for the die.
   */
  values: Record<string, number> = {};

  constructor(sideName: string, display: DieDisplay, symbols: SymbolType[])
  {
    this.name = sideName;
    this.display = display;
    this.symbols = symbols;

    this._mapSymbolsToValues();
  }

  /**
   * Maps the given symbols to a value for the entire face.
   *
   * @private
   */
  _mapSymbolsToValues(): void
  {
    this.values = {};

    forEach(this.symbols, (symbol: SymbolType) => {
      if (typeof symbol !== 'object') {
        return;
      }

      // Typescript is not very smart, which is why we need 'as unknown as object'.
      forEach(symbol as unknown as object, (statValue, statName) => {
        if (typeof statValue !== 'number') {
          return;
        }

        if (this.values[statName] === undefined) {
          this.values[statName] = Number(statValue);
        } else {
          this.values[statName] += Number(statValue);
        }
      });
    });
  }

  /**
   * Adds the stat values from the die side to an aggregate of die values.
   */
  addStatsToAggregate(aggregate: Record<string, number>): Record<string, number>
  {
    forEach(this.values, (statValue, statName) => {
      if (statName === 'display') {
        return;
      }

      if (!aggregate[statName]) {
        aggregate[statName] = statValue;
      } else {
        aggregate[statName] += statValue;
      }
    });

    return aggregate;
  }
}
