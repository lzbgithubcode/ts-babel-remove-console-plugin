/**
 * 作者: lzb
 * 功能: 测试
 */
import path from "path";
import * as babel from '@babel/core';
import fs from "fs";
import plugin from "../src/index";


const rootPath = (fixtureName:string): string => {
   return  path.join(path.resolve(), '__tests__','__fixtures__', fixtureName);
};
// 输入文件
const inputPath = (fixtureName:string) : string =>{
   return path.join(rootPath(fixtureName), "input.js");
};
// 配置文件
const optionsPath = (fixtureName:string) : string =>{
   return path.join(rootPath(fixtureName), "options.js");
};

// 获取配置文件
const readOptions = (fixtureName:string): string | undefined =>{
    let optionsString;
    try {
        optionsString = fs.readFileSync(optionsPath(fixtureName), "utf8");
    }catch (e) {
        if (e.code === 'ENOENT') {
            return undefined;
        }
        throw e;
    }
    return eval(`options = ${optionsString}`);
}

// 运行转化文件
const runTransform = (fixtureName:string): string=>{

    // 获取配置文件
    const options = readOptions(fixtureName);

   const result =  babel.transformFileSync(inputPath(fixtureName), {
       plugins:[[plugin, options]],
       filename: fixtureName,
       root: rootPath(fixtureName),
       configFile: false
   });
   return result && result.code ? result.code : "";
};
const testDirs: Array<string> = ["basic"];

describe("ts-babel-remove-console-plugin", ()=>{
   testDirs.forEach(testCase => {
         it(`handle case  ${testCase}`, ()=>{
            expect(runTransform(testCase)).toMatchSnapshot();
         })
   });
});
