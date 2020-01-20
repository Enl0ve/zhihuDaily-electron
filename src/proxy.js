/**
 * the prefix of ZhiHu Daily's interface is `http://news-at.zhihu.com/api/4`,
 * the prefix of ZhiHu Daily's image interface is `https://picl.zhimg.com`,
 * due to both limit the cross domain, so that we can not directly invoke
 * these interfaces except invoke them by proxy.
 * 
 * @author: leo_tao
 * @date: 2020/1/19
 */
const http = require('http');
const request = require('request');