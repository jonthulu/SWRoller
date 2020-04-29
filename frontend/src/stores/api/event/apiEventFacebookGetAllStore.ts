import {ApiBaseStore} from '../common/apiBaseStore';
import {StoreCollection} from '../../common/StoreCollection';

// import {request} from '../../../services/API';

/**
 * The api event facebook get all store.
 */
export class ApiEventFacebookGetAllStore extends ApiBaseStore<object>
{
  /**
   * Gets the imported facebook events for the user's client from the api.
   */
  request(): void
  {
    this.setPending();

    // request({
    //   method: 'get',
    //   url: '/v2/events/facebook',
    // }).then(
    //   (data) => {
    //     this.setFulfilled(data);
    //   },
    //   (eventsGetError) => {
    //     this.setRejected(eventsGetError);
    //   }
    // );
  }
}

export const apiEventFacebookGetAllStores = new StoreCollection(ApiEventFacebookGetAllStore);
