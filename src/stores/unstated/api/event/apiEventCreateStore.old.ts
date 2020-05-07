import {ApiStoreBaseOld} from '../common/apiStoreBase.old';
import {StoreCollectionOld} from '../../common/StoreCollection.old';

// import {request} from '../../../services/API';

/**
 * The api event create store.
 */
export class ApiEventCreateStoreOld extends ApiStoreBaseOld<object> {
  /**
   * Creates a new event using the api.
   */
  request(eventData: object): void {
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

export const apiEventCreateStores = new StoreCollectionOld(ApiEventCreateStoreOld);
