"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeConsolePlugin;

var _utils = require("./utils");

/**
 * 作者: lzb
 * 功能:
 */
// babel转换器
// babel核心库
function removeConsolePlugin(options) {
  const visitorObj = {
    CallExpression(path, state) {
      const callee = path.get("callee"); // 如果是不是 isMemberExpression 不处理

      if (!callee.isMemberExpression()) {
        return;
      } // 是否包含name = console


      if ((0, _utils.isIncludedConsole)(callee, state.opts)) {
        // console.log()
        if (path.parentPath.isExpressionStatement()) {
          // 移除
          path.remove();
        } else {
          // 替换void
          path.replaceWith((0, _utils.createVoid)());
        }
      } else if ((0, _utils.isIncludedConsoleBind)(callee, state.opts)) {
        // 替换
        path.replaceWith((0, _utils.createNoop)());
      } else {}
    },

    MemberExpression: {
      exit(path, state) {
        // 不处理
        if (options.opts && !options.opts.closeConsole) {
          return;
        }

        if ((0, _utils.isIncludedConsole)(path, state.opts) && !path.parentPath.isMemberExpression()) {
          if (path.parentPath.isAssignmentExpression() && path.parentKey === 'left') {
            const rightNodePath = path.parentPath.get("right");
            rightNodePath.replaceWith((0, _utils.createNoop)());
          } else {
            path.replaceWith((0, _utils.createNoop)());
          }
        }
      }

    }
  };
  return {
    name: "zb-babel-remove-console-plugin",
    visitor: visitorObj
  };
}