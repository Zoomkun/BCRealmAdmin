import Vue from 'vue'
import Router from 'vue-router'
import NewsList from '@/components/news/newsList.vue'
import AddNews from '@/components/news/addNews.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/news.html',
            name: 'NewsList',
            component: NewsList
        },
        {
            path: '/news.html/newsList',
            name: 'NewsList',
            component: NewsList
        },
        {
            path: '/news.html/addNews',
            name: 'AddNews',
            component: AddNews
        }
    ],
})