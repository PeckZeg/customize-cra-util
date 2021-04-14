import dotenv from 'dotenv';
import fs from 'fs';

const env: Record<string, string> = require('react-scripts/config/env')().raw;
const paths: Record<string, string> = require('react-scripts/config/paths');

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;

const REACT_APP_ENV = env.REACT_APP_ENV || 'development';

const dotenvFiles = [
  `${paths.dotenv}.deploy.${REACT_APP_ENV}.local`,
  `${paths.dotenv}.deploy.${REACT_APP_ENV}`,
  `${paths.dotenv}.deploy`
];

export default function getClientEnvironment() {
  const { PUBLIC_URL, ...restEnv } = env;

  const deployEnvs = dotenvFiles.reduce<Record<string, string>>(
    (acc, dotenvFile) => {
      if (fs.existsSync(dotenvFile)) {
        Object.assign(acc, dotenv.config({ path: dotenvFile }).parsed);
      }

      return acc;
    },
    {}
  );

  const raw = Object.keys(deployEnvs)
    .filter((key) => REACT_APP.test(key))
    .reduce<Record<string, string>>(
      (acc, key) => {
        if (!acc.hasOwnProperty(key)) {
          acc[key] = deployEnvs[key];
        }

        return acc;
      },
      { ...restEnv, REACT_APP_ENV }
    );

  const stringified = {
    'process.env': Object.keys(raw).reduce<Record<string, string>>(
      (env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      },
      {}
    )
  };

  return { raw, stringified };
}
