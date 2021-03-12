import { Configuration } from 'webpack';

/**
 * add camel case variable names for css modules
 */
export function addCssModulesCamelCase() {
  return (config: Configuration): Configuration => {
    config.module.rules.forEach((rule) => {
      if (!Array.isArray(rule.oneOf)) {
        return;
      }

      rule.oneOf.forEach((rule) => {
        if (
          rule.test.toString().indexOf('module') < 0 ||
          !Array.isArray(rule.use)
        ) {
          return;
        }

        rule.use.forEach((ruleSetUseItem) => {
          if (
            typeof ruleSetUseItem !== 'object' ||
            ruleSetUseItem.loader?.indexOf('/css-loader/') < 0 ||
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
 * add document title
 * @param title document title
 */
export function addDocumentTitle(title: string) {
  return (config: Configuration): Configuration => {
    const htmlWebpackPlugin = config.plugins?.find(
      (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
    );

    if (htmlWebpackPlugin) {
      Object.assign((htmlWebpackPlugin as any).options, { title });
    }

    return config;
  };
}
