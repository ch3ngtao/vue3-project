// eslint-disable-next-line @typescript-eslint/no-var-requires
const CompressionPlugin = require("compression-webpack-plugin");
const env = process.env.NODE_ENV;
module.exports = {
  // productionGzip: true,
  configureWebpack: (config) => {
    if (env === "production") {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false, //不删除源文件
          }),
        ],
      };
    }
  },
  devServer: {
    host: "",
    port: 8081,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      "/api": {
        target: "http://api.chaoming.fun",
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
