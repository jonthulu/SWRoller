import {Container, createContainer} from 'unstated-next';
import {v4} from 'uuid';

// import {StoreConstructor} from '../constants/storeConstants';

// /**
//  * The singleton id.
//  * @type {symbol}
//  */
// export const singletonId = Symbol('$$singleton');

/**
 * A collection of stores.
 */
export class StoreCollection<Value, State = void>
{
  /**
   * The list of stores by id.
   */
  stores: Record<string, Container<Value, State>> = {};

  /**
   * The singleton store.
   */
  singletonStore: (Container<Value, State> | null) = null;

  /**
   * The useStore hook function.
   */
  useStoreHook: (initialState?: State) => Value;

  constructor(useStoreHook: (initialState?: State) => Value)
  {
    this.useStoreHook = useStoreHook;
  }

  /**
   * Gets the Store for the given id or creates one.
   */
  get(id: string): Container<Value, State>
  {
    const currentContainer = this.stores[id];
    if (currentContainer) {
      return currentContainer;
    }

    if (!this.useStoreHook) {
      throw new Error('Could not create store because no useStoreHook was defined.');
    }

    const newContainer = createContainer(this.useStoreHook);
    this.stores[id] = newContainer;

    return newContainer;
  }

  /**
   * Gets a single instance (singleton) of the store or creates one.
   */
  single(): Container<Value, State>
  {
    if (this.singletonStore) {
      return this.singletonStore;
    }

    if (!this.useStoreHook) {
      throw new Error('Could not create singleton store because no useStoreHook was defined.');
    }

    const newContainer = createContainer(this.useStoreHook);
    this.singletonStore = newContainer;

    return newContainer;
  }

  /**
   * Generates a random id.
   */
  generateId(): string
  {
    return v4();
  }
}
