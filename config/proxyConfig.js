module.exports = {
  proxy: {
    '/sys': {
      target: 'https://www.bigpaotuo.com',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/sys': '/sys'   //需要rewrite的,
      }
    }
  }
}
