import Vue from 'vue'
import Router from 'vue-router'
import UserStatistics from '@/components/dataAnalysis/userStatistics.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/dataAnalysis.html',
            name: 'UserStatistics',
            component: UserStatistics
        },
        {
            path: '/dataAnalysis.html/userStatistics',
            name: 'UserStatistics',
            component: UserStatistics
        }
    ],
})