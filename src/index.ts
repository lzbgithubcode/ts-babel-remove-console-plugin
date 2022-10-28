/**
 * 作者: lzb
 * 功能:
 */
import {NodePath, Visitor} from "babel__traverse";  // babel转换器
import {PluginObj} from "babel__core";  // babel核心库
import {AssignmentExpression, MemberExpression} from "@babel/types";
import {IOptions, IPluginOption} from "./interfaces";
import {isIncludedConsole,isIncludedConsoleBind, createVoid, createNoop} from "./utils";


export default function removeConsolePlugin(options:IPluginOption, ): PluginObj<IPluginOption> {

    const visitorObj: Visitor<IPluginOption> = {
        CallExpression(path, state): void {

             const callee = path.get("callee") as NodePath<MemberExpression>;

             // 默认值
             state.opts.removeConsole = (state.opts.removeConsole == true ||  state.opts.removeConsole == false) ? state.opts.removeConsole : true;

             // 如果是不是 isMemberExpression 不处理
             if(!callee.isMemberExpression()){
                 return;
             }
             // 是否包含name = console
            if(isIncludedConsole(callee, state.opts)){
                 // console.log()
                if(path.parentPath.isExpressionStatement()){
                    // 移除
                    path.remove();
                } else {
                    // 替换void
                    path.replaceWith(createVoid());
                }
             }else if(isIncludedConsoleBind(callee, state.opts)){
                // 替换
                path.replaceWith(createNoop());
            }else {

            }
        },
        MemberExpression:{
          exit(path: NodePath<MemberExpression>, state): void{
              // 不处理
              if(options.opts && options.opts.removeConsole){
                  return;
              }
              if(isIncludedConsole(path, state.opts) && !path.parentPath.isMemberExpression()){
                  if(path.parentPath.isAssignmentExpression() && path.parentKey === 'left'){
                       const rightNodePath = path.parentPath.get("right") as NodePath<AssignmentExpression>;
                       rightNodePath.replaceWith(createNoop());
                  }else {
                      path.replaceWith(createNoop());
                  }

              }
          }
        }
    };
    // babel插件默认增加头babel-plugin-
    return {
        name: "remove-console-babel-plugin",
        visitor: visitorObj
    }
}
