import {Container} from 'unstated';

import {Die, DieDisplay} from '../../common/die';
import {DieSide} from '../../common/dieSide';

export type RollHistory<SymbolType, StatsType> = {
  rolledSides: DieSide<SymbolType>[];
  displays: DieDisplay[];
  stats: StatsType;
}

type State<SymbolType, StatsType> = {
  hand: Die<SymbolType>[];
  history: RollHistory<SymbolType, StatsType>[];
}

/**
 * The dice base store.
 * Designed to be used with unstated v1.
 */
export abstract class DiceStoreBaseOld<SymbolType, StatsType> extends Container<State<SymbolType, StatsType>>
{
  /**
   * The store creation id.
   */
  id: (string | null) = null;

  /**
   * The state of the container.
   */
  state: State<SymbolType, StatsType> = {
    hand: [],
    history: [],
  };

  constructor(id: string) {
    super();

    this.id = String(id);
  }

  /**
   * Gets the current hand from the state.
   */
  getHand(): Die<SymbolType>[] {
    return this.state.hand;
  }

  /**
   * Gets all the possible dice types in the set.
   */
  abstract getDiceTypes(): Record<string, Die<SymbolType>>;

  /**
   * Adds a die to the hand.
   */
  abstract addToHand(newDie: Die<SymbolType>): void;

  /**
   * Removes a die from the hand.
   */
  abstract removeFromHand(dieToRemove: Die<SymbolType>): void

  /**
   * Removes all dice from the hand.
   */
  abstract emptyHand(): void;

  /**
   * Makes the specified server request.
   * This should be defined in every class that extends this.
   */
  abstract roll(options?: object): void;

  /**
   * Records a roll in the state history.
   */
  recordRoll(rolledSides: DieSide<SymbolType>[], displays: DieDisplay[], stats: StatsType): void
  {
    const newRoll = {
      rolledSides,
      displays,
      stats,
    };

    this.setState((state) => {
      state.history.unshift(newRoll);
      return state;
    });
  }
}

export const doNotInject = true;
