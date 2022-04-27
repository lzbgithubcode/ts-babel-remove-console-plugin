/**
 * 作者: lzb
 * 日期: 2022-04-25 10:32
 * 功能:
 */
import {NodePath} from "@babel/core";
import {
    MemberExpression,
    numericLiteral,
    unaryExpression,
    functionExpression,
    blockStatement,
    UnaryExpression,
    FunctionExpression
} from "@babel/types";
import {Interfaces} from "./interfaces";

/**
 * 是否包含console
 * @param memberExpr NodePath
 * @param exclude {name: string}
 */
export function isIncludedConsole(memberExpr: NodePath<MemberExpression>, opts: Interfaces.TOptions): boolean{
    // 获取对象
    const object =  memberExpr.get("object") as NodePath<MemberExpression>;
    // 获取属性
    const property = memberExpr.get('property') as NodePath<MemberExpression>;

    if(opts.noCloseConsole) return  false;

    // 是否在数组id中
    if(isNameInArray(property, opts.exclude)) return false;

    // 判断console
    if(isIdWithNameGlobal("console", object)) return  true;

    const result =  isIdWithNameGlobal('console', object.get('object') as NodePath) &&
        (property.isIdentifier({name: "call"}) || property.isIdentifier({name:"apply"}));


    return  result;
}

export function isIncludedConsoleBind(memberExpr: NodePath<MemberExpression>, opts: Interfaces.TOptions) : boolean {
    // 获取对象
    const object =  memberExpr.get("object") as NodePath<MemberExpression>;
    // 获取属性
    const property = memberExpr.get('property') as NodePath<MemberExpression>;

    if(opts.noCloseConsole) return  false;

    if(!object.isMemberExpression()) return  false;

    if(isNameInArray(property, opts.exclude)) return false;


    const result =  isIdWithNameGlobal('console', object.get('object') as NodePath) &&
        (memberExpr.get('property') as NodePath).isIdentifier({ name: 'bind' });

    return  result;


}

/**
 * 名称是否在数组
 * @param property NodePath
 * @param exclude {name: string}
 */
export function isNameInArray(property: NodePath<MemberExpression>, exclude: {name: string}[] | undefined) : boolean {
    return  !!(exclude && exclude.some(name => property.isIdentifier({name})));
}


export function isIdWithNameGlobal(name: string, id: NodePath): boolean {
    return  (id.isIdentifier({name}) && !id.scope.getBinding(name) && id.scope.hasGlobal(name));
}




export function createVoid(): UnaryExpression {
    return  unaryExpression("void", numericLiteral(0));
}

export function createNoop(): FunctionExpression {
    return  functionExpression(null,[], blockStatement([]));
}


