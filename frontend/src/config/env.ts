/* eslint-disable no-process-env */

export default (function getNodeEnvironment(): string {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'production';

    case 'staging':
      return 'staging';

    case 'testing':
      return 'testing';

    default:
      return 'development';
  }
})();
