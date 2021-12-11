import { Configuration } from 'webpack';

import getClientEnvironment from './env';

/**
 * add deploy env variables
 * @description inject variables from `.env.deploy.*` files
 * @param extraEnvs extra env variables
 */
export default function addDeployEnvironmentVariables(
  extraEnvs: Record<string | number, any> = {}
) {
  const env = getClientEnvironment();

  return (config: Configuration): Configuration => {
    for (const plugin of config.plugins ?? []) {
      if (plugin.constructor.name === 'DefinePlugin') {
        if (Object.keys(extraEnvs).length) {
          Object.assign(
            (plugin as any).definitions['process.env'],
            Object.keys(extraEnvs).reduce<Record<string, string>>(
              (env, key) => {
                env[key] = JSON.stringify(extraEnvs[key]);
                return env;
              },
              {}
            )
          );
        }

        Object.assign(
          (plugin as any).definitions['process.env'],
          env.stringified['process.env']
        );
      }
    }

    return config;
  };
}
