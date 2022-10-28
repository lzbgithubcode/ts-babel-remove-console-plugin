
#### remove-console-babel-plugin
A lightweight babel plug-in for `console` remove, Remove/replace `console.*` code through babel -> AST procedure


#### Installation
```sh
  npm install  remove-console-babel-plugin --save-dev
  yarn  add  remove-console-babel-plugin --dev
```


#### Usage

```javascript
   //babel.config.js
    const removeConsoleBabelPlugin = require("remove-console-babel-plugin");
    const plugins = [
        [
            removeConsoleBabelPlugin,
            {
                noCloseConsole: false
            }
        ]
    ];
    module.exports = {
        // ...other code
        plugins,
    };

```

#### Options

| option   | description  | default   | 
| ------- | ---------- | --------- |
| `removeConsole` | Remove the console after it opens | `true` |
| `exclude` | Exclude the console method that cannot be removed | no setting all remove |

#### 参考文献
[babel插件编写中文文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

