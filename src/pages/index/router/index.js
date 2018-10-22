import Vue from 'vue'
import Router from 'vue-router'

//题目问答
import TopicList from '@/components/topic/topicList.vue'
import AddTopic from '@/components/topic/addTopic.vue'
import Layout from '@/components/layout/index.vue'

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

//登录，用户角色设置
import Login from '@/components/adminUser/login.vue'
import AddUser from '@/components/adminUser/addUser.vue'
import UserList from '@/components/adminUser/userList.vue'
import EditPwd from '@/components/adminUser/EditPwd.vue'
import AddRole from '@/components/adminUser/addRole.vue'
import RoleList from '@/components/adminUser/roleList.vue'
import AddMenu from '@/components/adminUser/addMenu.vue'
import MenuList from '@/components/adminUser/menuList.vue'
import Config from '@/components/adminUser/config.vue'

//游戏
import AddGame from '@/components/game/addGame.vue'
import GameList from '@/components/game/gameList.vue'
import GameStatistics from '@/components/game/gameStatistics.vue'
import GameTotalStatistics from '@/components/game/gameTotalStatistics.vue'

//货币
import CoinStatistics from '@/components/coin/CoinStatistics.vue'

//系统消息
import AddMessage from '@/components/message/AddMessage.vue'
import MessageList from '@/components/message/MessageList.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/topic',
            icon: 'el-icon-tickets',
            module: '题库管理',
            component: Layout,
            children: [
                {
                    name: 'topicList',
                    component: TopicList,
                    cellName:'题目列表',
                    path:'topicList'
                },
                {
                    cellName:'添加题目',
                    name: 'addTopic',
                    component: AddTopic,
                    path:'addTopic'
                }
            ]
        },
        {
            path: '/user',
            icon: 'el-icon-setting',
            component:Layout,
            module: '用户设置',
            children: [
                {
                    cellName:'添加用户',
                    name: 'addUser',
                    component: AddUser,
                    path:'addUser'
                },
                {
                    cellName:'用户列表',
                    name: 'userList',
                    component: UserList,
                    path:'userList'
                },
                {
                    cellName:'添加角色',
                    name: 'addRole',
                    component: AddRole,
                    path:'addRole'
                },
                {
                    cellName:'角色列表',
                    name: 'roleList',
                    component: RoleList,
                    path:'roleList'
                },
                {
                    cellName:'添加菜单',
                    name: 'addMenu',
                    component: AddMenu,
                    path:'addMenu'
                },
                {
                    cellName:'菜单列表',
                    name: 'menuList',
                    component: MenuList,
                    path:'menuList'
                },
                {
                    cellName:'功能权限',
                    name: 'config',
                    component: Config,
                    path:'config',
                    hidden:true
                }
            ]
        },
        {
            path: '/mining',
            icon: 'el-icon-menu',
            component:Layout,
            module: '挖矿管理',
            children: [
                {
                    cellName: '挖矿活动列表',
                    name: 'miningActivityList',
                    component: MiningActivityList,
                    path:'miningActivityList'
                },
                {
                    cellName: '添加挖矿活动',
                    name: 'addMiningActivity',
                    component: AddMiningActivity,
                    path:'addMiningActivity'
                }
            ]
        },
        {
            path: '/header',
            icon: 'el-icon-edit-outline',
            component:Layout,
            module: '冲顶管理',
            children: [
                {
                    cellName: '冲顶列表',
                    name: 'headerList',
                    component: HeaderList,
                    path:'headerList'
                },
                {
                    cellName: '添加冲顶',
                    name: 'addHeader',
                    component: AddHeader,
                    path:'addHeader'
                },
                {
                    cellName: '冲顶统计',
                    name: 'headerStatistics',
                    component: HeaderStatistics,
                    path:'headerStatistics'
                },
            ]
        },
        {
            path: '/lottery',
            icon: 'el-icon-view',
            module: '抽奖管理',
            component:Layout,
            children: [
                {
                    cellName:'添加抽奖',
                    name: 'addLotterySector',
                    component: AddLotterySector,
                    path:'addLotterySector'
                },
                {
                    cellName:'奖盘列表',
                    name: 'lotterySectorList',
                    component: LotterySectorList,
                    path:'lotterySectorList'
                },
                {
                    cellName:'抽奖统计',
                    name: 'lotteryStatistics',
                    component: LotteryStatistics,
                    path:'lotteryStatistics'
                }
            ]
        },
        {
            path: '/question',
            icon: 'el-icon-edit',
            module: '问答管理',
            component:Layout,
            children: [
                {
                    cellName: '问答列表',
                    name: 'questionList',
                    component: QuestionList,
                    path:'questionList'
                },
                {
                    cellName: '创建问答',
                    name: 'addQuestion',
                    component: AddQuestion,
                    path:'addQuestion'
                },
                {
                    cellName: '问答统计',
                    name: 'questionStatistics',
                    component: QuestionStatistics,
                    path:'questionStatistics'
                }
            ]
        },
        {
            path: '/userTotal',
            icon: 'el-icon-tickets',
            module: '用户数据分析',
            component:Layout,
            children: [
                {
                    cellName: '注册留存统计',
                    name: 'userStatistics',
                    component: UserStatistics,
                    path:'userStatistics'
                },
                {
                    cellName: '月注册统计',
                    name: 'userMonthStatistics',
                    component: UserMonthStatistics,
                    path:'userMonthStatistics'
                },
                {
                    cellName: '总数据一览',
                    name: 'userTotalStatistics',
                    component: UserTotalStatistics,
                    path:'userTotalStatistics'
                }
            ]
        },
        {
            path: '/news',
            icon: 'el-icon-news',
            module: '资讯管理',
            component:Layout,
            children: [
                {
                    cellName: '新闻管理',
                    name: 'newsList',
                    component: NewsList,
                    path:'newsList'
                },
                {
                    cellName: '添加新闻',
                    name: 'addNews',
                    component: AddNews,
                    path:'addNews'
                },
            ]
        },
        {
            path: '/game',
            icon: 'el-icon-message',
            module: '游戏管理',
            component:Layout,
            children: [
                {
                    cellName: '添加游戏',
                    name: 'addGame',
                    component: AddGame,
                    path:'addGame'
                },
                {
                    cellName: '游戏列表',
                    name: 'gameList',
                    component: GameList,
                    path:'gameList'
                },
                {
                    cellName:'游戏注册留存',
                    name: 'gameStatistics',
                    component: GameStatistics,
                    path:'gameStatistics'
                },
                {
                    cellName:'游戏总数据',
                    name: 'gameTotalStatistics',
                    component: GameTotalStatistics,
                    path:'gameTotalStatistics'
                }
            ]
        },
        {
            path: '/coin',
            icon: 'el-icon-sold-out',
            module: '货币数据',
            component:Layout,
            children: [
                {
                    cellName: '货币详情',
                    name: 'coinStatistics',
                    component: CoinStatistics,
                    path:'coinStatistics'
                }
            ]
        },
        {
            path: '/message',
            icon: 'el-icon-bell',
            module: '系统消息',
            component:Layout,
            children: [
                {
                    cellName: '添加消息',
                    name: 'addMessage',
                    component: AddMessage,
                    path:'addMessage'
                },
                {
                    cellName:'消息列表',
                    name: 'messageList',
                    component: MessageList,
                    path:'messageList'
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            hidden:true, // 不在侧边栏展示
        },
        {
            path: '/editPwd',
            name: 'EditPwd',
            component: EditPwd,
            hidden:true, // 不在侧边栏展示
        },
    ],
})
