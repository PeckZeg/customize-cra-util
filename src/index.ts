import { Configuration } from 'webpack';

import path from 'path';
import fs from 'fs';

export { default as addDeployEnvironmentVariables } from './addDeployEnvironmentVariables';
export { default as addDocumentTitle } from './addDocumentTitle';

/**
 * add camel case variable names for css modules
 */
export function addCssModulesCamelCase() {
  return (config: Configuration): Configuration => {
    config.module?.rules.forEach((rule) => {
      if (!Array.isArray(rule.oneOf)) {
        return;
      }

      rule.oneOf.forEach((rule) => {
        if (
          (rule.test && rule.test.toString().indexOf('module') < 0) ||
          !Array.isArray(rule.use)
        ) {
          return;
        }

        rule.use.forEach((ruleSetUseItem) => {
          if (
            typeof ruleSetUseItem !== 'object' ||
            (ruleSetUseItem.loader &&
              ruleSetUseItem.loader.indexOf('/css-loader/') < 0) ||
            typeof ruleSetUseItem.options !== 'object'
          ) {
            return;
          }

          Object.assign(ruleSetUseItem.options?.modules, {
            exportLocalsConvention: 'camelCase'
          });
        });
      });
    });

    return config;
  };
}

/**
 * resolve `node_modules`
 * @param additionalModulePaths
 */
export function resolveModules(additionalModulePaths: string[] = []) {
  return (config: Configuration): Configuration => {
    if (!config.resolve?.modules) {
      return config;
    }

    const appNodeModules = path.join(process.cwd(), 'node_modules');

    if (fs.existsSync(appNodeModules)) {
      const index = config.resolve.modules.indexOf(appNodeModules);

      if (index !== -1) {
        config.resolve.modules.splice(index, 1);
      }

      config.resolve.modules.unshift(appNodeModules);
    }

    config.resolve.modules.push(...additionalModulePaths);

    return config;
  };
}
