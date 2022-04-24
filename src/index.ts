/**
 * 作者: lzb
 * 功能:
 */
import {NodePath, Visitor} from "babel__traverse";  // babel转换器
import {PluginObj} from "babel__core";  // babel核心库
import {Interfaces} from "./interfaces";


export default function removeConsolePlugin(options:Interfaces.IPluginOption, ): PluginObj<Interfaces.IPluginOption> {

    const visitorObj: Visitor<Interfaces.IPluginOption> = {
        CallExpression(path, state): void {
             const callee = path.get("callee") as NodePath;
            console.log('====CallExpression=====',path, state);
        },
        MemberExpression:{
          exit(path, state): void{
              console.log('====MemberExpression=====',path, state);
          }
        }
    };
    return {
        name: "ts-babel-remove-console-plugin",
        visitor: visitorObj
    }
}
