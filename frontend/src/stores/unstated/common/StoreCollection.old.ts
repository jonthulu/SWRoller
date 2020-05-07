import {v4} from 'uuid';

import {StoreConstructor} from '../../constants/storeConstants';

/**
 * The singleton id.
 * @type {symbol}
 */
export const singletonId = Symbol('$$singleton');

/**
 * A collection of stores.
 * Designed to be used with unstated v1.
 */
export class StoreCollectionOld<StoreContainer>
{
  /**
   * The list of stores by id.
   */
  stores: Record<string, StoreContainer> = {};

  /**
   * The singleton store.
   */
  singletonStore: (StoreContainer | null) = null;

  /**
   * The class used to create a new store.
   */
  StoreClass: StoreConstructor<StoreContainer>;

  constructor(StoreClass: StoreConstructor<StoreContainer>)
  {
    this.StoreClass = StoreClass;
  }

  /**
   * Gets the Store for the given id or creates one.
   */
  get(id: string): StoreContainer
  {
    const currentContainer = this.stores[id];
    if (currentContainer) {
      return currentContainer;
    }

    if (!this.StoreClass) {
      throw new Error('Could not create store because no Store class was defined.');
    }

    const classForId = new this.StoreClass(id);
    this.stores[id] = classForId;

    return classForId;
  }

  /**
   * Gets a single instance (singleton) of the store or creates one.
   */
  single(): StoreContainer
  {
    if (this.singletonStore) {
      return this.singletonStore;
    }

    if (!this.StoreClass) {
      throw new Error('Could not create singleton store because no Store class was defined.');
    }

    const classForId = new this.StoreClass(String(singletonId));
    this.singletonStore = classForId;

    return classForId;
  }

  /**
   * Generates a random id.
   */
  generateId(): string
  {
    return v4();
  }
}
