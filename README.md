
#### remove-console-babel-plugi
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
| ---- --- | ---------- | --------- |
| `noCloseConsole`| 


#### 配置
* noCloseConsole  是否关闭打印日志，可配置正式环境不需要
* exclude  排除打印方法 e.g exclude:['error'] 则`console.error` 将不会被移除



#### 参考文献
[babel插件编写中文文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

