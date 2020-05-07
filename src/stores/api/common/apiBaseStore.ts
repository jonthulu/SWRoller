import {includes} from 'lodash';
import moment from 'moment';
import {useState} from 'react';

import {STATE_FULFILLED, STATE_PENDING, STATE_PRE, STATE_REJECTED} from '../../constants/asyncConstants';
import {EXPIRES_ERROR, EXPIRES_IN, EXPIRES_PENDING} from '../../constants/storeConstants';
import {Deferred} from '../../utils/deferred';
import {getCase, HandlersInterface} from '../../utils/getCase';

export type StateStatus = symbol;
export type StateData<DataType> = DataType | null;
export type StateError = Error | null;
export type StateExpireTime = moment.Moment | null;
type StorePromise = Promise<unknown> | null;
type StoreDeferred<DataType> = Deferred<DataType | null> | null;

export type ApiStoreResult<DataType, RequestOptions> = {
  status: StateStatus;
  data: StateData<DataType>;
  error: StateError;
  expireTime: StateExpireTime;
  request: (options: RequestOptions) => void;
  getIsPre: () => boolean;
  getIsPending: () => boolean;
  getIsFulfilled: () => boolean;
  getIsRejected: () => boolean;
  getPromise: () => Promise<DataType | null>;
  case: <T>(handlers: HandlersInterface<T>) => (T | undefined);
  isDataAvailable: () => boolean;
};

export type ApiStoreOptions = {
  expireTimePending?: (number | boolean | null);
  expireTimeFulfilled?: (number | boolean | null);
  expireTimeRejected?: (number | boolean | null);
  skipPreOnPending?: boolean;
};

/**
 * The api base store.
 */
export function useApiStore<DataType, RequestOptions>(
  apiRequest: (
    options: RequestOptions
  ) => Promise<DataType>,
  storeOptions?: ApiStoreOptions
): ApiStoreResult<DataType, RequestOptions>
{
  const [status, setStatus] = useState(STATE_PRE as StateStatus); // eslint-disable-line no-shadow
  const [data, setData] = useState(null as StateData<DataType>);
  const [error, setError] = useState(null as StateError);
  const [expireTime, setExpireTime] = useState(null as StateExpireTime);

  // Used to track the actual request call's promise and a deferred promise.
  const [requestPromise, setRequestPromise] = useState(null as StorePromise);
  const [defer, setDefer] = useState(null as StoreDeferred<unknown>);

  /**
   * Gets whether or not the store is in the pre state.
   */
  const getIsPre = (): boolean =>
  {
    return (status === STATE_PRE);
  };

  /**
   * Gets whether or not the store is in the pending state.
   */
  const getIsPending = (includePre?: boolean): boolean =>
  {
    if (includePre && getIsPre()) {
      return true;
    }

    return (status === STATE_PENDING);
  };

  /**
   * Gets whether or not the store is in the rejected state.
   */
  const getIsRejected = (): boolean =>
  {
    return (status === STATE_REJECTED);
  };

  /**
   * Gets whether or not the store is in the fulfilled state.
   */
  const getIsFulfilled = (): boolean =>
  {
    return (status === STATE_FULFILLED);
  };

  /**
   * Gets a promise for this store.
   */
  const getPromise = (): Promise<DataType | null> =>
  {
    if (getIsRejected()) {
      return Promise.reject(error);
    } else if (getIsFulfilled()) {
      return Promise.resolve(data);
    }

    const resolvePromise = (aPromise: Promise<unknown>): Promise<DataType | null> => {
      return aPromise.then(() => {
        if (getIsRejected()) {
          throw error;
        }
        return data;
      });
    };

    if (requestPromise) {
      return resolvePromise(requestPromise);
    } else if (defer) {
      return resolvePromise(defer.promise);
    }

    const newDeferred = new Deferred<unknown>();
    setDefer(newDeferred);

    return resolvePromise(newDeferred.promise);
  };

  /**
   * Parses an expire time value to a moment.
   */
  const expireTimeToMoment = (
    checkExpireTime?: (number | boolean | null),
    defaultTime?: number
  ): moment.Moment | null =>
  {
    if (checkExpireTime === false) {
      return null;
    } else if (!checkExpireTime && !defaultTime) {
      return null;
    } else if (!checkExpireTime || checkExpireTime === true) {
      return moment().add(defaultTime, 'seconds');
    }

    return moment().add(Number(checkExpireTime), 'seconds');
  };

  /**
   * Sets the store to a pre state (resets the store to its original state).
   */
  const setPre = (): void =>
  {
    setStatus(STATE_PRE);
    setData(null);
    setError(null);
    setExpireTime(null);

    // Also reset the promise and defer to get a full reset.
    setRequestPromise(null);
    setDefer(null);
  };

  /**
   * Sets the store to a pending state.
   */
  const setPending = (): void =>
  {
    if (!getIsPre() && !storeOptions?.skipPreOnPending) {
      // We want secondary calls to request to go through the pre status as well.
      setPre();
    }

    setStatus(STATE_PENDING);
    setData(null);
    setError(null);
    setExpireTime(expireTimeToMoment(storeOptions?.expireTimePending, EXPIRES_PENDING));
  };

  /**
   * Sets the store to a fulfilled state.
   */
  const setFulfilled = (newData: DataType): void =>
  {
    setStatus(STATE_FULFILLED);
    setData(newData);
    setError(null);
    setExpireTime(expireTimeToMoment(storeOptions?.expireTimeFulfilled, EXPIRES_IN));
  };

  /**
   * Sets the store to a rejected state.
   */
  const setRejected = (newError: Error): void =>
  {
    setStatus(STATE_REJECTED);
    setData(null);
    setError(newError);
    setExpireTime(expireTimeToMoment(storeOptions?.expireTimeRejected, EXPIRES_ERROR));
  };

  /**
   * Runs the api request.
   */
  const request = (options: RequestOptions): void =>
  {
    setPending();

    const baseRequest = apiRequest(
      options
    ).then((resultData: DataType) => {
      setFulfilled(resultData);

      if (defer?.resolve) {
        defer.resolve(resultData);
      }
    }, (resultError: Error) => {
      setRejected(resultError);

      if (defer?.reject) {
        defer.reject(resultError);
      }
    });

    setRequestPromise(baseRequest);
  };

  /**
   * Runs handlers based on changes in the state.
   */
  const runCase = <T>(handlers: HandlersInterface<T>): (T | undefined) =>
  {
    const getFulfilled = (): unknown => getFulfilled();
    const getRejected = (): Error|null => getRejected();

    return getCase(status, getFulfilled, getRejected, handlers);
  };

  /**
   * Checks if item is available in the store.
   * Returns true if state is pending or fulfilled and not expired.
   */
  const isDataAvailable = (): boolean =>
  {
    const isValidState = includes([STATE_PENDING, STATE_FULFILLED], status);
    const isNotExpired = (!expireTime || expireTime.isAfter());

    return (isValidState && isNotExpired);
  };

  return {
    status,
    data,
    error,
    expireTime,
    request,
    getIsPre,
    getIsPending,
    getIsFulfilled,
    getIsRejected,
    getPromise,
    case: runCase,
    isDataAvailable,
  };
}

export const doNotInject = true;
