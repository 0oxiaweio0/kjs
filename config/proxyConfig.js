module.exports = {
  proxy: {
    '/playcarcar-api': {
      target: 'http://192.168.5.13:8081',  // 接口域名
      secure: false,  // 如果是https接口，需要配置这个参数
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/playcarcar-api': '/'   //需要rewrite的,
      }
    }
  }
}
