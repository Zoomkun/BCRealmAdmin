import Vue from 'Vue'
import Topic from './topic.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import router from './router/index.js'

Vue.use(ElementUI);
Vue.use(VueRouter)
Vue.config.productionTip = false

var $ajax = axios.create({
    baseURL: 'http://test.bcrealm.com/api/dbex/admin/', //测试
    // baseURL: 'http://api.bcrealm.com/api/dbex/admin/', //线上
    timeout: 10000,
});

// 添加响应拦截器
$ajax.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    if (response.status === 200) {
        return response.data
    }
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

$ajax.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
Vue.prototype.$ajax = $ajax;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(Topic)
})