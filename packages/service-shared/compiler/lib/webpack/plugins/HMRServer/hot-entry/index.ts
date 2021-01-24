import { parse } from 'querystring';
import { subscribeToProcessMessage } from '@my-project/service-shared/compiler/lib/webpack/utils/subscribeToProcessMessage';
import {
  HMR_SERVER_CONNECTED_MESSAGE,
  HMR_SERVER_UPDATE_MESSAGE
} from '@my-project/service-shared/compiler/lib/webpack/plugins/HMRServer/constants';
import { HotClient } from '@my-project/service-shared/compiler/lib/webpack/plugins/HMRServer/hot-entry/HotClient';

declare const module: any;
declare const __resourceQuery: any;

if (module.hot) {
  const query = parse(__resourceQuery.replace('?', ''));
  const client = new HotClient({
    debug: query.debug === 'true'
  });

  subscribeToProcessMessage(HMR_SERVER_UPDATE_MESSAGE, () => client.tryUpdate());
  if (process.send) {
    process.send(HMR_SERVER_CONNECTED_MESSAGE);
  }
} else {
  throw new Error('[HMR] Hot Module Replacement is disabled');
}
