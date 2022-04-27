/**
 * 作者: lzb
 * 功能: 接口
 */
export namespace Interfaces {

     export type TOptions = {
         /**
          * 排除检测
          */
         exclude?: {name: string}[],
         /**
          * 不处理console
          */
         noCloseConsole?: boolean,
     }

    /**
     * 插件配置的options
     */
    export interface IPluginOption {
        opts:TOptions
    }
}
