import {includes} from 'lodash';
import moment from 'moment';
import {Container} from 'unstated';

import {STATE_FULFILLED, STATE_PENDING, STATE_PRE, STATE_REJECTED} from '../../constants/asyncConstants';
import {EXPIRES_ERROR, EXPIRES_IN, EXPIRES_PENDING} from '../../constants/storeConstants';
import {Deferred} from '../../utils/deferred';
import {getCase, HandlersInterface} from '../../utils/getCase';

/**
 * The interface for States.
 */
interface State<DataType> {
  status: symbol;
  data: DataType | null;
  error: Error | null;
  expireTime: moment.Moment | null;
}

/**
 * The api base store.
 */
export abstract class ApiBaseStore<DataType> extends Container<State<DataType>>
{
  /**
   * The state of the container.
   */
  state: State<DataType> = {
    status: STATE_PRE,
    data: null,
    error: null,
    expireTime: null,
  };

  /**
   * The store creation id.
   */
  id: (string | null) = null;

  /**
   * A list of deferred promise.
   * Every time getPromise() is called on a pending state, a new Deferred is created.
   */
  defers: Deferred<DataType | null>[] = [];

  constructor(id: string)
  {
    super();

    this.id = String(id);
    this.subscribe(this.updateDeferOnStateUpdate);
  }

  /**
   * Makes the specified server request.
   * This should be defined in every class that extends this.
   */
  abstract request(options?: object): void;

  /**
   * Updates the deferred promise when the store state updates.
   */
  updateDeferOnStateUpdate = (): void =>
  {
    const currentStatus = this.getStatus();

    const resolvedIndexes: number[] = [];

    this.defers.forEach((defer, deferIndex) => {
      if (!defer || defer.isFulfilled) {
        return;
      }

      // If we wanted any existing non-fulfilled promises to reject if request is called again, then we should
      // put a check for STATE_PRE here.

      if (currentStatus === STATE_REJECTED) {
        defer.reject && defer.reject(this.getRejected());

        resolvedIndexes.push(deferIndex);
      } else if (currentStatus === STATE_FULFILLED) {
        defer.resolve && defer.resolve(this.getFulfilled());

        resolvedIndexes.push(deferIndex);
      }
    });

    resolvedIndexes.forEach((resolvedIndex) => {
      this.defers.splice(resolvedIndex, 1);
    });
  };

  /**
   * Gets the fulfilled value of the store.
   * This is used in case().
   */
  getFulfilled(): DataType | null
  {
    return this.state.data;
  }

  /**
   * Gets the rejected value of the store.
   * This is used in case().
   */
  getRejected(): Error | null
  {
    return this.state.error;
  }

  /**
   * Gets the status of the store.
   */
  getStatus(): symbol
  {
    return this.state.status;
  }

  /**
   * Gets a promise for this store.
   */
  getPromise(): Promise<DataType|null>
  {
    if (this.getIsRejected()) {
      return Promise.reject(this.getRejected());
    } else if (this.getIsFulfilled()) {
      return Promise.resolve(this.getFulfilled());
    }

    const newDeferred = new Deferred<DataType|null>();
    this.defers.push(newDeferred);

    return newDeferred.promise;
  }

  /**
   * Gets whether or not the store is in the pre state.
   */
  getIsPre(): boolean
  {
    return (this.getStatus() === STATE_PRE);
  }

  /**
   * Gets whether or not the store is in the pending state.
   */
  getIsPending(includePre?: boolean): boolean
  {
    if (includePre && this.getIsPre()) {
      return true;
    }

    return (this.getStatus() === STATE_PENDING);
  }

  /**
   * Gets whether or not the store is in the rejected state.
   */
  getIsRejected(): boolean
  {
    return (this.getStatus() === STATE_REJECTED);
  }

  /**
   * Gets whether or not the store is in the fulfilled state.
   */
  getIsFulfilled(): boolean
  {
    return (this.getStatus() === STATE_FULFILLED);
  }

  /**
   * Sets the store to a pre state.
   */
  setPre(): Promise<void>
  {
    return this.setState({
      status: STATE_PRE,
      data: null,
      error: null,
      expireTime: undefined,
    });
  }

  /**
   * Sets the store to a pending state.
   */
  setPending(expireTime?: (number | boolean | null), skipPre = false): Promise<void>
  {
    if (!this.getIsPre() && !skipPre) {
      // We want secondary calls to request to go through the pre status as well.
      this.setPre();
    }

    return this.setState({
      status: STATE_PENDING,
      data: null,
      error: null,
      expireTime: this.expireTimeToMoment(expireTime, EXPIRES_PENDING),
    });
  }

  /**
   * Sets the store to a fulfilled state.
   */
  setFulfilled(data: DataType, expireTime?: (number | boolean | null)): Promise<void>
  {
    return this.setState({
      status: STATE_FULFILLED,
      data,
      error: null,
      expireTime: this.expireTimeToMoment(expireTime, EXPIRES_IN),
    });
  }

  /**
   * Sets the store to a rejected state.
   */
  setRejected(error: Error, expireTime?: (number | boolean | null)): Promise<void>
  {
    return this.setState({
      status: STATE_REJECTED,
      data: null,
      error,
      expireTime: this.expireTimeToMoment(expireTime, EXPIRES_ERROR),
    });
  }

  /**
   * Parses an expire time value to a moment.
   */
  expireTimeToMoment(expireTime?: (number | boolean | null), defaultTime?: number): moment.Moment | null
  {
    if (expireTime === false) {
      return null;
    } else if (!expireTime && !defaultTime) {
      return null;
    } else if (!expireTime) {
      return moment().add(defaultTime, 'seconds');
    }

    return moment().add(Number(expireTime), 'seconds');
  }

  /**
   * Runs handlers based on changes in the state.
   */
  case<ReturnType>(handlers: HandlersInterface<ReturnType>): ReturnType | undefined
  {
    const getFulfilled = (): unknown => this.getFulfilled();
    const getRejected = (): Error|null => this.getRejected();

    return getCase(this.getStatus(), getFulfilled, getRejected, handlers);
  }

  /**
   * Checks if item is available in the store.
   * Returns true if state is pending or fulfilled and not expired.
   */
  isDataAvailable(): boolean
  {
    const expireTime = this.state.expireTime;
    const isValidState = includes([STATE_PENDING, STATE_FULFILLED], this.getStatus());
    const isNotExpired = (!expireTime || expireTime.isAfter());

    return (isValidState && isNotExpired);
  }
}

export const doNotInject = true;
