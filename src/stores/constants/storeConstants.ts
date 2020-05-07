/**
 * Used to defined an constructor for stores.
 */
export interface StoreConstructor<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(id: string): T;
}

/**
 * Expires in 10 minutes.
 */
export const EXPIRES_IN = 1000 * 60 * 10; // eslint-disable-line no-magic-numbers

/**
 * Expires a pending call in 1 minute.
 */
export const EXPIRES_PENDING = 1000 * 60; // eslint-disable-line no-magic-numbers

/**
 * Expires certain error calls after a short time.
 * Most errors disable caching, but some can use this value to slow down over active updates.
 */
export const EXPIRES_ERROR = 1000 * 60 * 2.5; // eslint-disable-line no-magic-numbers
