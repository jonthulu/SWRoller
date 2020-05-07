/* eslint-disable no-process-env, no-magic-numbers */

import env from './env';

export default {
  env: env,

  api: {
    url: process.env.API_URL || 'http://0.0.0.0:3030',
  },
};
