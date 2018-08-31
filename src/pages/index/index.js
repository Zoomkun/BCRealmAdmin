import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import App from './index.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import axios from 'axios'

Vue.use(ElementUI);
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;

let url = '';
if (window.location.href.indexOf('test') == 0) {
    url = 'http://api.bcrealm.com/api/'
} else {
    url = 'http://test.bcrealm.com/api/'
};

var $ajax = axios.create({
    baseURL: url,
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
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})