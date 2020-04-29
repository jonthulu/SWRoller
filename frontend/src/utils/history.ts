import {History as HistoryType} from 'history';
import lodash from 'lodash';

/**
 * The history object.
 *
 * @type {HistoryType}
 */
export let routeHistory: HistoryType;

/**
 * Registers a new routeHistory object.
 */
export function registerHistory(newHistory: HistoryType): void
{
  routeHistory = newHistory;
}

/**
 * Whether or not the match route (or current route) matches one or more of the given routes.
 */
export function routeMatches(otherRoutes: (string | string[]), matchRoute?: string): boolean
{
  let safeOtherRoutes = otherRoutes;
  if (!Array.isArray(otherRoutes)) {
    safeOtherRoutes = [otherRoutes];
  }

  let safeMatchRoute: string = matchRoute || '';
  if (!matchRoute) {
    if (!routeHistory || !routeHistory.location) {
      throw new Error('Could not match route as no routeHistory location is defined.');
    }
    safeMatchRoute = routeHistory.location.pathname || '';
  }

  return lodash.some(safeOtherRoutes, (otherRoute) => {
    const hasParams = (otherRoute.indexOf(':') > -1);
    if (!hasParams) {
      return lodash.startsWith(safeMatchRoute, otherRoute);
    }

    const otherRouteRegexp = new RegExp(otherRoute.replace(/:[^/]+/ig, '[^/]+'));
    return Boolean(safeMatchRoute.match(otherRouteRegexp));
  });
}

/**
 * Parses the given search string or a routeHistory search string into a params object
 * or returns the value of the given key.
 *
 * @param routeHistoryOrSearch
 * @param getKey - If provided, returns only the value of the given key.
 */
export function parseSearchParams(
  routeHistoryOrSearch: (HistoryType | string),
  getKey?: string
): (Record<string, string> | string | null)
{
  let search = routeHistoryOrSearch;
  if (lodash.has(routeHistoryOrSearch, 'location.search')) {
    search = routeHistory.location.search;
  }

  const searchParams = new URLSearchParams(String(search || ''));

  if (getKey) {
    return searchParams.get(getKey);
  }

  const allParams: Record<string, string> = {};
  for (const [paramKey, paramValue] of searchParams.entries()) {
    allParams[paramKey] = paramValue;
  }

  return allParams;
}
