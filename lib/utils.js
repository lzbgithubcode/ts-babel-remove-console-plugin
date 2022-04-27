"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNoop = createNoop;
exports.createVoid = createVoid;
exports.isIdWithNameGlobal = isIdWithNameGlobal;
exports.isIncludedConsole = isIncludedConsole;
exports.isIncludedConsoleBind = isIncludedConsoleBind;
exports.isNameInArray = isNameInArray;

var _types = require("@babel/types");

/**
 * 作者: lzb
 * 日期: 2022-04-25 10:32
 * 功能:
 */

/**
 * 是否包含console
 * @param memberExpr NodePath
 * @param exclude {name: string}
 */
function isIncludedConsole(memberExpr, opts) {
  // 获取对象
  const object = memberExpr.get("object"); // 获取属性

  const property = memberExpr.get('property');
  if (opts.noCloseConsole) return false; // 是否在数组id中

  if (isNameInArray(property, opts.exclude)) return false; // 判断console

  if (isIdWithNameGlobal("console", object)) return true;
  const result = isIdWithNameGlobal('console', object.get('object')) && (property.isIdentifier({
    name: "call"
  }) || property.isIdentifier({
    name: "apply"
  }));
  return result;
}

function isIncludedConsoleBind(memberExpr, opts) {
  // 获取对象
  const object = memberExpr.get("object"); // 获取属性

  const property = memberExpr.get('property');
  if (opts.noCloseConsole) return false;
  if (!object.isMemberExpression()) return false;
  if (isNameInArray(property, opts.exclude)) return false;
  const result = isIdWithNameGlobal('console', object.get('object')) && memberExpr.get('property').isIdentifier({
    name: 'bind'
  });
  return result;
}
/**
 * 名称是否在数组
 * @param property NodePath
 * @param exclude {name: string}
 */


function isNameInArray(property, exclude) {
  return !!(exclude && exclude.some(name => property.isIdentifier({
    name
  })));
}

function isIdWithNameGlobal(name, id) {
  return id.isIdentifier({
    name
  }) && !id.scope.getBinding(name) && id.scope.hasGlobal(name);
}

function createVoid() {
  return (0, _types.unaryExpression)("void", (0, _types.numericLiteral)(0));
}

function createNoop() {
  return (0, _types.functionExpression)(null, [], (0, _types.blockStatement)([]));
}