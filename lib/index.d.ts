import { Configuration } from 'webpack';
/**
 * add camel case variable names for css modules
 */
export declare function addCssModulesCamelCase(): (config: Configuration) => Configuration;
/**
 * add document title
 * @param title document title
 */
export declare function addDocumentTitle(title: string): (config: Configuration) => Configuration;
