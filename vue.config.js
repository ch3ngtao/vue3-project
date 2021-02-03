module.exports = {
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
