import {ApiBaseStore} from '../common/apiBaseStore';
import {StoreCollection} from '../../common/StoreCollection';

// import {request} from '../../../services/API';

/**
 * The api event create store.
 */
export class ApiEventCreateStore extends ApiBaseStore<object>
{
  /**
   * Creates a new event using the api.
   */
  request(eventData: object): void
  {
    if (!eventData) {
      throw new Error('Event Create: The event data is required.');
    }

    this.setPending(false);

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
  }
}

export const apiEventCreateStores = new StoreCollection(ApiEventCreateStore);
