/*
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  //  配置根路径 -搜索的根路径
  roots: ['<rootDir>'],
  moduleFileExtensions: [
    "ts",
    "js",
    "tsx",
    "jsx",
    "json",
    "node"
  ],

  // 忽略文件
  testPathIgnorePatterns: [
    "/node_modules/",
    "/lib/",
    '/__fixtures__/',
      "__snapshots__",
  ],
  // 匹配测试的文件
  testMatch: ['<rootDir>/__tests__/**/*test.[jt]s?(x)'],
};
