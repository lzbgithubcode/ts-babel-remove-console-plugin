
#### ts-babel-remove-console-plugin 
基于ts的babel插件， 通过babel -> AST过程 中移除/替换`console.xxxxx`代码


#### 安装
`npm install ts-babel-remove-console-plugin`


#### 配置
* closeConsole  是否关闭打印日志，可配置正式环境不需要
* exclude  排除打印方法 e.g exclude:['error'] 则`console.error` 将不会被移除

#### 使用
```js
   const removeConsolePlugin = require("ts-babel-remove-console-plugin")
```

#### 参考文献
[babel插件编写中文文档](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

