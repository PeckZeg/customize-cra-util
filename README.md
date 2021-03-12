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
