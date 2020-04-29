/* eslint-disable max-len */

/**
 * Adds the ability to defer promises.
 * Originally taken from MDN, but tweaked to add isFulfilled.
 *
 * @url {https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred#backwards_forwards_compatible}
 */
export class Deferred<T> {
  /**
   * Whether or not the promise has been fulfilled.
   *
   * @type {boolean}
   */
  isFulfilled = false;

  /**
   * A method to resolve the associated Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {*} value - This value is used to resolve the promise
   * If the value is a Promise then the associated promise assumes the state
   * of Promise passed as value.
   */
  resolve: ((value: T) => void) | undefined;

  /**
   * A method to reject the associated Promise with the value passed.
   * If the promise is already settled it does nothing.
   *
   * @param {*} reason - The reason for the rejection of the Promise.
   * Generally its an Error object. If however a Promise is passed, then the Promise
   * itself will be the reason for rejection no matter the state of the Promise.
   */
  reject: ((value: Error | null) => void) | undefined;

  /* A newly created Promise object.
   * Initially in pending state.
   */
  promise: Promise<T>;

  /**
   * @constructor
   */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (resolveResponse: T): void => {
        this.isFulfilled = true;

        resolve(resolveResponse);
      };

      this.reject = (rejectError: Error|null): void => {
        this.isFulfilled = true;

        reject(rejectError);
      };
    });
  }
}
