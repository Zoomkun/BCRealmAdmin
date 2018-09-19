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

//平台游戏奖盘
import AddLotterySector from '@/components/platform/addLotterySector.vue'
import LotterySectorList from '@/components/platform/lotterySectorList.vue'
import LotteryStatistics from '@/components/platform/lotteryStatistics.vue'

//平台游戏冲顶
import AddHeader from '@/components/header/addHeader.vue'
import HeaderList from '@/components/header/headerList.vue'
import HeaderStatistics from '@/components/header/headerStatistics.vue'

//平台游戏问答
import AddQuestion from '@/components/question/addQuestion.vue'
import QuestionList from '@/components/question/questionList.vue'
import QuestionStatistics from '@/components/question/questionStatistics.vue'

//登录
import Login from '@/components/adminUser/login.vue'
import AddUser from '@/components/adminUser/addUser.vue'
import UserList from '@/components/adminUser/userList.vue'
import EditPwd from '@/components/adminUser/EditPwd.vue'

//游戏
import AddGame from '@/components/game/addGame.vue'
import GameList from '@/components/game/gameList.vue'
import GameStatistics from '@/components/game/gameStatistics.vue'
import GameTotalStatistics from '@/components/game/gameTotalStatistics.vue'

//货币
import CoinStatistics from '@/components/coin/CoinStatistics.vue'

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
        },
        {
            path: '/addUser',
            name: 'AddUser',
            component: AddUser
        },
        {
            path: '/userList',
            name: 'UserList',
            component: UserList
        },
        {
            path: '/editPwd',
            name: 'EditPwd',
            component: EditPwd
        },
        {
            path: '/addLotterySector',
            name: 'AddLotterySector',
            component: AddLotterySector
        },
        {
            path: '/lotterySectorList',
            name: 'LotterySectorList',
            component: LotterySectorList
        },
        {
            path: '/lotteryStatistics',
            name: 'LotteryStatistics',
            component: LotteryStatistics
        },
        {
            path: '/addHeader',
            name: 'AddHeader',
            component: AddHeader
        },
        {
            path: '/headerList',
            name: 'HeaderList',
            component: HeaderList
        },
        {
            path: '/headerStatistics',
            name: 'HeaderStatistics',
            component: HeaderStatistics
        },
        {
            path: '/addQuestion',
            name: 'AddQuestion',
            component: AddQuestion
        },
        {
            path: '/questionList',
            name: 'QuestionList',
            component: QuestionList
        },
        {
            path: '/questionStatistics',
            name: 'QuestionStatistics',
            component: QuestionStatistics
        },
        {
            path: '/gameTotalStatistics',
            name: 'GameTotalStatistics',
            component: GameTotalStatistics
        },
        {
            path: '/gameStatistics',
            name: 'GameStatistics',
            component: GameStatistics
        },
        {
            path: '/coinStatistics',
            name: 'CoinStatistics',
            component: CoinStatistics
        }
    ],
})