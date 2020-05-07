import {useApiStore, ApiStoreResult} from '../common/apiBaseStore';
import {StoreCollection} from '../../common/StoreCollection';

// import {request} from '../../../services/API';

/**
 * The api event create store.
 */
export function useApiEventCreateStore(): ApiStoreResult<string, object>
{
  /**
   * Creates a new event using the api.
   */
  const request = (eventData: object): Promise<string> =>
  {
    if (!eventData) {
      throw new Error('Event Create: The event data is required.');
    }

    // request({
    //   method: 'post',
    //   url: '/v2/events',
    //   data: {
    //     events: [eventData],
    //   }
    // }).then(
    //   (data) => {
    //     this.setFulfilled(data, false);
    //   },
    //   (eventCreateError) => {
    //     this.setRejected(eventCreateError, false);
    //   }
    // );

    return Promise.resolve('it worked');
  };

  return useApiStore(request);
}

export const apiEventCreateStores = new StoreCollection(useApiEventCreateStore);
