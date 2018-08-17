import Vue from 'vue'
import Router from 'vue-router'
import UserStatistics from '@/components/dataAnalysis/userStatistics.vue'
import UserMonthStatistics from '@/components/dataAnalysis/userMonthStatistics.vue'
import UserTotalStatistics from '@/components/dataAnalysis/userTotalStatistics.vue'
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
        },
        {
            path: '/dataAnalysis.html/userMonthStatistics',
            name: 'UserMonthStatistics',
            component: UserMonthStatistics
        },
        {
            path: '/dataAnalysis.html/userTotalStatistics',
            name: 'UserTotalStatistics',
            component: UserTotalStatistics
        },
    ],
})