import {STATE_FULFILLED, STATE_PENDING, STATE_PRE, STATE_REJECTED} from '../constants/asyncConstants';

export interface HandlersInterface<T> {
  pre?: () => (T | undefined);
  pending?: () => (T | undefined);
  fulfilled?: (value: unknown) => (T | undefined);
  rejected?: (value: Error|null) => (T | undefined);
}

/**
 * Gets the case statement for an api store.
 */
export function getCase<ReturnType>(
  state: symbol,
  getFulfilled: () => unknown,
  getRejected: () => Error|null,
  handlers: HandlersInterface<ReturnType>
): (ReturnType | undefined)
{
  if (!handlers) {
    throw new Error('Invalid handlers given to case.');
  }

  switch (state) {
    case STATE_PENDING:
      return handlers.pending && handlers.pending();
    case STATE_FULFILLED:
      return handlers.fulfilled && handlers.fulfilled(getFulfilled());
    case STATE_REJECTED:
      return handlers.rejected && handlers.rejected(getRejected());
    case STATE_PRE:
    default:
      return handlers.pre && handlers.pre();
  }
}
