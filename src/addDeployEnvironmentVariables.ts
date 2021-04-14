import { Configuration } from 'webpack';

import getClientEnvironment from './env';

/**
 * add deploy env variables
 * @description inject variables from `.env.deploy.*` files
 */
export default function addDeployEnvironmentVariables() {
  const env = getClientEnvironment();

  return (config: Configuration): Configuration => {
    for (const plugin of config.plugins ?? []) {
      if (plugin.constructor.name === 'DefinePlugin') {
        Object.assign(
          (plugin as any).definitions['process.env'],
          env.stringified['process.env']
        );
      }
    }

    return config;
  };
}
