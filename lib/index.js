"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCssModulesCamelCase = addCssModulesCamelCase;
exports.addDocumentTitle = addDocumentTitle;

/**
 * add camel case variable names for css modules
 */
function addCssModulesCamelCase() {
  return config => {
    config.module.rules.forEach(rule => {
      if (!Array.isArray(rule.oneOf)) {
        return;
      }

      rule.oneOf.forEach(rule => {
        if (rule.test.toString().indexOf('module') < 0 || !Array.isArray(rule.use)) {
          return;
        }

        rule.use.forEach(ruleSetUseItem => {
          var _ruleSetUseItem$loade, _ruleSetUseItem$optio;

          if (typeof ruleSetUseItem !== 'object' || ((_ruleSetUseItem$loade = ruleSetUseItem.loader) === null || _ruleSetUseItem$loade === void 0 ? void 0 : _ruleSetUseItem$loade.indexOf('/css-loader/')) < 0 || typeof ruleSetUseItem.options !== 'object') {
            return;
          }

          Object.assign((_ruleSetUseItem$optio = ruleSetUseItem.options) === null || _ruleSetUseItem$optio === void 0 ? void 0 : _ruleSetUseItem$optio.modules, {
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


function addDocumentTitle(title) {
  return config => {
    var _config$plugins;

    const htmlWebpackPlugin = (_config$plugins = config.plugins) === null || _config$plugins === void 0 ? void 0 : _config$plugins.find(plugin => plugin.constructor.name === 'HtmlWebpackPlugin');

    if (htmlWebpackPlugin) {
      Object.assign(htmlWebpackPlugin.options, {
        title
      });
    }

    return config;
  };
}