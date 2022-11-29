module.exports = {
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/g2/getOnsInfo': { //这个就是标识，当接口用 /g2/getOnsInfo 开头才用代理
        // ws:false,
        /* 目标代理服务器地址 */
        target: 'https://view.inews.qq.com',
        /* 允许跨域 */
        changeOrigin: true,
      },
	  '/news/wap/fymap2020_data.d.json':{
		  target: 'https://interface.sina.cn',
		  /* 允许跨域 */
		  changeOrigin: true,
	  },
	  '/ug/api/wuhan/app/data/list-total':{
		  target:'https://c.m.163.com',
		  changeOrigin: true,
	  },
	  '/newsqa/v1':{
		  target:'https://api.inews.qq.com',
		  changeOrigin: true,
	  }
    },
	
  },
}

