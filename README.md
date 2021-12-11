# customize-cra-util

utilities for [customize-cra](https://github.com/arackaf/customize-cra).

## Install

```bash
yarn add customize-cra-util --dev
```

## Usage

```javascript
const { addCssModulesCamelCase } = require('customize-cra-util');
const { override } = require('customize-cra');

module.exports = override(
  addCssModulesCamelCase()
);
```

## API

### `addCssModulesCamelCase`

add camel case variable names for css modules.

#### Usage

```javascript
const { addCssModulesCamelCase } = require('customize-cra-util');
const { override } = require('customize-cra');

module.exports = override(
  addCssModulesCamelCase()
);
```

### `addDocumentTitle(title)`

inject document title.

#### Usage

```javascript
const { addDocumentTitle } = require('customize-cra-util');
const { override } = require('customize-cra');

module.exports = override(
  addDocumentTitle('react app')
);
```

**notice**: you should inject `<%= htmlWebpackPlugin.options.title %>` in `index.html` template.

```html
<html>
  <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
</html>
```

### `resolveModules([additionalModulePaths])`

put app's `node_modules` folder at [`resolve.modules`](https://webpack.js.org/configuration/resolve/#resolvemodules) first place, and inject additional `node_modules` folders.

#### Usage

```javascript
const { resolveModules } = require('customize-cra-util');
const { override } = require('customize-cra');

module.exports = override(
  resolveModules()
);
```

### `addDeployEnvironmentVariables(extraEnvs: Record<string | number, any>)`

inject deploy environment variables to `process.env`.

this util will search `.env.deploy.*` files through `REACT_APP_ENV` env variable.

example: when `REACT_APP_ENV` is `beta`, we will search `.env.deploy.beta.local`, `.env.deploy.beta`, `.env.deploy` files.

#### Usage

```javascript
const { addDeployEnvironmentVariables } = require('customize-cra-util');
const { override } = require('customize-cra');
const pkgJson = require('./package.json');

module.exports = override(
  addDeployEnvironmentVariables({
    REACT_APP_PACKAGE: pkgJson.version
  })
);
```
