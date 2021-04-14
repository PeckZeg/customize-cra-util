import { Configuration } from 'webpack';
export { default as addDeployEnvironmentVariables } from './addDeployEnvironmentVariables';
export { default as addDocumentTitle } from './addDocumentTitle';
/**
 * add camel case variable names for css modules
 */
export declare function addCssModulesCamelCase(): (config: Configuration) => Configuration;
/**
 * resolve `node_modules`
 * @param additionalModulePaths
 */
export declare function resolveModules(additionalModulePaths?: string[]): (config: Configuration) => Configuration;
