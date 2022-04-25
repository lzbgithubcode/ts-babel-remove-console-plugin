/**
 * 作者: lzb
 * 日期: 2022-04-25 10:32
 * 功能:
 */
import { NodePath } from "@babel/core";
import { MemberExpression, UnaryExpression, FunctionExpression } from "@babel/types";
import { Interfaces } from "./interfaces";
/**
 * 是否包含console
 * @param memberExpr NodePath
 * @param exclude {name: string}
 */
export declare function isIncludedConsole(memberExpr: NodePath<MemberExpression>, opts: Interfaces.TOptions): boolean;
export declare function isIncludedConsoleBind(memberExpr: NodePath<MemberExpression>, opts: Interfaces.TOptions): boolean;
/**
 * 名称是否在数组
 * @param property NodePath
 * @param exclude {name: string}
 */
export declare function isNameInArray(property: NodePath<MemberExpression>, exclude: {
    name: string;
}[] | undefined): boolean;
export declare function isIdWithNameGlobal(name: string, id: NodePath): boolean;
export declare function createVoid(): UnaryExpression;
export declare function createNoop(): FunctionExpression;
