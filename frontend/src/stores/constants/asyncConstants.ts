/**
 * The async state before any async calls have been made.
 *
 * @const {Symbol}
 */
export const STATE_PRE = Symbol('pre');

/**
 * The async state for when an async call is ongoing/pending.
 *
 * @const {Symbol}
 */
export const STATE_PENDING = Symbol('pending');

/**
 * The async state after an async call was rejected.
 *
 * @const {Symbol}
 */
export const STATE_REJECTED = Symbol('rejected');

/**
 * The async state after an async call was successful.
 *
 * @const {Symbol}
 */
export const STATE_FULFILLED = Symbol('fulfilled');

/**
 * The async state after an async call was manually canceled.
 *
 * @const {Symbol}
 */
export const STATE_CANCELED = Symbol('canceled');
