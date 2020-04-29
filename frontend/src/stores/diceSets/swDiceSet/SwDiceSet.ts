import lodash from 'lodash';
import * as ramda from 'ramda';

import {DiceStoreBase} from '../common/diceStoreBase';
import {SwDie, SwDieSide, SwSymbol, dice, diceSymbols, diceOpposites, diceSort} from './swDice';
import {StoreCollection} from '../../common/StoreCollection';

type StatsType = Record<string, number>;

/**
 * Handles interactions with a set of SW dice.
 */
export class SwDiceSet extends DiceStoreBase<SwSymbol, StatsType>
{
  /**
   * Gets all the possible dice types in the set.
   */
  getDiceTypes(): Record<string, SwDie>
  {
    return {...dice};
  }

  /**
   * Setter for the hand.
   * This will sort any hand given to it.
   */
  setHand(newHand: SwDie[]): void
  {
    this.setState({
      hand: ramda.sort(diceSort, newHand)
    });
  }

  /**
   * Adds a die to the hand.
   */
  addToHand(newDie: SwDie): void
  {
    const newHand = ramda.append(newDie, this.state.hand);
    this.setHand(newHand);
  }

  /**
   * Removes a die from the hand.
   */
  removeFromHand(dieToRemove: SwDie): void
  {
    const newHand = this.state.hand.filter((die) => {
      return (die.id !== dieToRemove.id);
    });

    this.setHand(newHand);
  }

  /**
   * Removes all dice from the hand.
   */
  emptyHand(): void
  {
    this.setHand([]);
  }

  /**
   * Rolls the dice that have been added to the hand.
   */
  roll(): void
  {
    const rolledFaces = lodash.map(this.state.hand, (swDice: SwDie): SwDieSide => {
      const faceIndex = Math.floor(Math.random() * swDice.sides.length);
      return swDice.sides[faceIndex];
    });

    const stats = this.calculateStats(rolledFaces);
    const images = this.getImagesForStats(stats);

    this.recordRoll(rolledFaces, images, stats);
  }

  /**
   * Calculates the final stat values for all rolled faces.
   */
  calculateStats(rolledFaces: SwDieSide[]): StatsType
  {
    // First aggregate all the stat values for every face.
    const allStatValues = lodash.reduce(rolledFaces, (final: Record<string, number>, face: SwDieSide) => {
      return face.addStatsToAggregate(final);
    }, {});

    // Then only return positive final values.
    return lodash.reduce(allStatValues, (result: StatsType, statValue, statName) => {
      if (statName === 'blank') {
        return result;
      } else if (statValue === 0) {
        return result;
      }

      if (statValue < 0) {
        // We need to convert negatives to their opposite stat (-2 advantage = 2 threat, etc).
        result[diceOpposites[statName]] = 0 - statValue;
      } else {
        result[statName] = statValue;
      }

      return result;
    }, {});
  }

  /**
   * Gets images for stats.
   */
  getImagesForStats(rolledStats: StatsType): string[]
  {
    return lodash.reduce(rolledStats, (adjusted: string[], statValue, statName) => {
      const symbolImage = diceSymbols[statName].imagePath;
      lodash.times(statValue, () => adjusted.push(symbolImage));
      return adjusted;
    }, []);
  }
}

export const swDiceSets = new StoreCollection(SwDiceSet);
