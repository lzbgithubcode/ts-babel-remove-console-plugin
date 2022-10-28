/**
 * 作者: lzb
 * 功能: 接口
 */ interface IOptions {
    /**
    * Whether to remove  console methods
    */
    removeConsole?: boolean;
    /**
     * exclude
     */
    exclude?: {
        name: string;
    }[];
}
interface IPluginOption {
    opts: IOptions;
}
export { IOptions, IPluginOption };
