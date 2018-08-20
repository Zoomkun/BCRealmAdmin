import Vue from 'vue'
import App from './index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import axios from 'axios'

Vue.use(ElementUI);
Vue.config.productionTip = false

var $ajax = axios.create({
    baseURL:'http://192.168.31.124:8007/admin', //测试
    // baseURL:'', //线上
    timeout: 10000,
});

// 添加响应拦截器
$ajax.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.status===200){
        return response.data
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

$ajax.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
Vue.prototype.$ajax = $ajax;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
