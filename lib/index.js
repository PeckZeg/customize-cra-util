"use strict";

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveModules = exports.addCssModulesCamelCase = exports.addDocumentTitle = exports.addDeployEnvironmentVariables = void 0;

const path_1 = __importDefault(require("path"));

const fs_1 = __importDefault(require("fs"));

var addDeployEnvironmentVariables_1 = require("./addDeployEnvironmentVariables");

Object.defineProperty(exports, "addDeployEnvironmentVariables", {
  enumerable: true,
  get: function get() {
    return __importDefault(addDeployEnvironmentVariables_1).default;
  }
});

var addDocumentTitle_1 = require("./addDocumentTitle");

Object.defineProperty(exports, "addDocumentTitle", {
  enumerable: true,
  get: function get() {
    return __importDefault(addDocumentTitle_1).default;
  }
});
/**
 * add camel case variable names for css modules
 */

function addCssModulesCamelCase() {
  return config => {
    var _config$module;

    (_config$module = config.module) === null || _config$module === void 0 ? void 0 : _config$module.rules.forEach(rule => {
      if (!Array.isArray(rule.oneOf)) {
        return;
      }

      rule.oneOf.forEach(rule => {
        if (rule.test && rule.test.toString().indexOf('module') < 0 || !Array.isArray(rule.use)) {
          return;
        }

        rule.use.forEach(ruleSetUseItem => {
          var _ruleSetUseItem$optio;

          if (typeof ruleSetUseItem !== 'object' || ruleSetUseItem.loader && ruleSetUseItem.loader.indexOf('/css-loader/') < 0 || typeof ruleSetUseItem.options !== 'object') {
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

exports.addCssModulesCamelCase = addCssModulesCamelCase;
/**
 * resolve `node_modules`
 * @param additionalModulePaths
 */

function resolveModules(additionalModulePaths = []) {
  return config => {
    var _config$resolve;

    if (!((_config$resolve = config.resolve) === null || _config$resolve === void 0 ? void 0 : _config$resolve.modules)) {
      return config;
    }

    const appNodeModules = path_1.default.join(process.cwd(), 'node_modules');

    if (fs_1.default.existsSync(appNodeModules)) {
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

exports.resolveModules = resolveModules;