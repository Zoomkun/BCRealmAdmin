import Vue from 'vue'
import Router from 'vue-router'

//题目问答
import TopicList from '@/components/topic/topicList.vue'
import AddTopic from '@/components/topic/addTopic.vue'
import AddExaminationPaper from '@/components/topic/addExaminationPaper.vue'
import ExaminationPaperList from '@/components/topic/examinationPaperList.vue'
import AddReward from '@/components/topic/addReward.vue'
import RewardList from '@/components/topic/rewardList.vue'
import AddSuperActivity from '@/components/topic/addSuperActivity.vue'
import SuperActivityList from '@/components/topic/superActivityList.vue'
import ActivityStatisticsList from '@/components/topic/activityStatisticsList.vue'
import QuestionAnswerStatistics from '@/components/topic/questionAnswerStatistics.vue'
import DrawStatistics from '@/components/topic/drawStatistics.vue'

// 数据分析
import UserStatistics from '@/components/dataAnalysis/userStatistics.vue'
import UserMonthStatistics from '@/components/dataAnalysis/userMonthStatistics.vue'
import UserTotalStatistics from '@/components/dataAnalysis/userTotalStatistics.vue'

// 资讯管理
import NewsList from '@/components/news/newsList.vue'
import AddNews from '@/components/news/addNews.vue'

//平台挖矿
import MiningActivityList from '@/components/platform/miningActivityList.vue'
import AddMiningActivity from '@/components/platform/addMiningActivity.vue'
import AddGame from '@/components/platform/addGame.vue'
import GameList from '@/components/platform/gameList.vue'

//登录
import Login from '@/components/adminUser/login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/topicList',
        name: 'TopicList',
        component: TopicList
    },
        {
            path: '/addTopic/:id',
            name: 'AddTopic',
            component: AddTopic
        },
        {
            path: '/addTopic',
            name: 'AddTopic',
            component: AddTopic
        },
        {
            path: '/addExaminationPaper/:id',
            name: 'AddExaminationPaper',
            component: AddExaminationPaper
        },
        {
            path: '/addExaminationPaper',
            name: 'AddExaminationPaper',
            component: AddExaminationPaper
        },
        {
            path: '/examinationPaperList',
            name: 'ExaminationPaperList',
            component: ExaminationPaperList
        },
        {
            path: '/addReward',
            name: 'AddReward',
            component: AddReward
        },
        {
            path: '/rewardList',
            name: 'RewardList',
            component: RewardList
        },
        {
            path: '/addSuperActivity',
            name: 'AddSuperActivity',
            component: AddSuperActivity
        },
        {
            path: '/superActivityList',
            name: 'SuperActivityList',
            component: SuperActivityList
        },
        {
            path: '/activityStatisticsList',
            name: 'ActivityStatisticsList',
            component: ActivityStatisticsList
        },
        {
            path: '/questionAnswerStatistics',
            name: 'QuestionAnswerStatistics',
            component: QuestionAnswerStatistics
        },
        {
            path: '/drawStatistics',
            name: 'DrawStatistics',
            component: DrawStatistics
        },
        {
            path: '/userStatistics',
            name: 'UserStatistics',
            component: UserStatistics
        },
        {
            path: '/userMonthStatistics',
            name: 'UserMonthStatistics',
            component: UserMonthStatistics
        },
        {
            path: '/userTotalStatistics',
            name: 'UserTotalStatistics',
            component: UserTotalStatistics
        },
        {
            path: '/newsList',
            name: 'NewsList',
            component: NewsList
        },
        {
            path: '/addNews',
            name: 'AddNews',
            component: AddNews
        },
        {
            path: '/miningActivityList',
            name: 'MiningActivityList',
            component: MiningActivityList
        },
        {
            path: '/addMiningActivity',
            name: 'AddMiningActivity',
            component: AddMiningActivity
        },
        {
            path: '/addGame',
            name: 'AddGame',
            component: AddGame
        },
        {
            path: '/gameList',
            name: 'GameList',
            component: GameList
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ],
})
