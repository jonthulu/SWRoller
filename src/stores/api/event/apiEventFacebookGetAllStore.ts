import {ApiStoreResult, useApiStore} from '../common/apiBaseStore';
import {StoreCollection} from '../../common/StoreCollection';

// import {request} from '../../../services/API';

/**
 * The api event facebook get all store.
 */
export function useApiEventFacebookGetAllStore(): ApiStoreResult<string, undefined>
{
  /**
   * Gets the imported facebook events for the user's client from the api.
   */
  const request = (): Promise<string> =>
  {
    // request({
    //   method: 'get',
    //   url: '/v2/events/facebook',
    // }).then(
    //   (data) => {
    //     return data;
    //   },
    //   (eventsGetError) => {
    //     throw eventsGetError;
    //   }
    // );

    return Promise.resolve('it worked');
  };

  return useApiStore(request);
}

export const apiEventFacebookGetAllStores = new StoreCollection(
  useApiEventFacebookGetAllStore
);
