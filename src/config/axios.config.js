import axios from 'axios';

const Util = {
    imgPath: '',
    apiPath: 'http : //news-at.zhihu.com/api/4',
}

const axiosConfig = {
    baseUrl: Util.apiPath
};

//Ajax通用配置
Util.ajax = axios.create(axiosConfig);

//添加响应拦截器
Util.ajax.interceptors.response.use( res => res.data );

//截取今天的时间戳
Util.getTodayTime = function () {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
};

// 截取前一天的日期
Util.prevDay = function (timestamp = (new Date()).getTime()) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1;
    const day = date.getDate() < 10
        ? '0' + date.getDate()
        : date.getDate();
    return year + month + day;
};

export default Util;