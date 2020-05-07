import {enableLogging} from 'mobx-logger';

/**
 * Enables MobX logger.
 *
 * @param {boolean} requireUrlParam If true, then the debug url param must be present.
 */
export function enableMobXLogger(requireUrlParam) {
  if (requireUrlParam) {
    const allParams = getUrlParams();
    if (!allParams.debug) {
      return;
    }
  }

  enableLogging();
}

/**
 * Gets all the parameters for the given url.
 *
 * @param {string} url
 * @returns {Object.<string, string>}
 */
export function getUrlParams(url) {
  const queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  if (!queryString) {
    return {};
  }

  let safeQuery = queryString;

  const hashParts = queryString.split('#');
  if (hashParts.length) {
    safeQuery = hashParts[0];
  }

  const queryParts = safeQuery.split('&');

  return queryParts.reduce((urlParams, paramPart) => {
    const paramParts = paramPart.split('=');

    urlParams[paramParts[0]] = paramParts[1];
    return urlParams;
  }, {});
}
