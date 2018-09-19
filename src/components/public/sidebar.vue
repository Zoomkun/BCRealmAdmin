<template>
    <el-aside style="border: solid 1px #e6e6e6;width: 200px">
        <el-menu style="border: none" :default-active="this.$route.path" :router="true">
            <el-submenu v-for="value in sideBarData" :key="value.index" v-bind:index="value.index">
                <template slot="title"><i :class="value.icon"></i>{{value.module}}</template>

                <el-menu-item v-for="item in value.cell" :key="item.index" v-bind:index="item.index">{{item.cellName}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<style lang="stylus">
    .el-aside
        color: #333

    .el-submenu__title
        border-bottom 1px solid rgb(230, 230, 230)
</style>

<script>
    export default {
        name: 'Sidebar',
        data() {
            return {
                sideBarActive: '',
                sideBarData: [
                    {
                        index: '/topicList',
                        icon: 'el-icon-tickets',
                        module: 'dbex游戏管理',
                        cell: [
                            {
                                cellName: '题库列表',
                                index: '/topicList',
                            },
                            {
                                cellName: '新增题目',
                                index: '/addTopic',
                            },
                            {
                                cellName: '问答列表',
                                index: '/examinationPaperList',
                            },
                            {
                                cellName: '创建问答',
                                index: '/addExaminationPaper',
                            },
                            {
                                cellName: '问答统计',
                                index: '/questionAnswerStatistics',
                            },
                            {
                                cellName: '冲顶列表',
                                index: '/superActivityList',
                            },
                            {
                                cellName: '添加冲顶',
                                index: '/addSuperActivity',
                            },
                            {
                                cellName: '冲顶统计',
                                index: '/activityStatisticsList',
                            },
                            {
                                cellName: '奖盘列表',
                                index: '/rewardList',
                            },
                            {
                                cellName: '添加奖盘',
                                index: '/addReward',
                            },
                            {
                                cellName: '抽奖统计',
                                index: '/drawStatistics'
                            }
                        ]
                    },
                    {
                        index: 'userList',
                        icon: 'el-icon-setting',
                        module: '用户设置',
                        cell: [
                            {
                                cellName:'添加用户',
                                index:'/addUser'
                            },
                            {
                                cellName:'用户列表',
                                index:'/userList'
                            }                            
                        ]
                    },
                    {
                        index: 'miningActivityList',
                        icon: 'el-icon-menu',
                        module: '挖矿管理',
                        cell: [
                            {
                                cellName: '挖矿活动列表',
                                index: '/miningActivityList',
                            },
                            {
                                cellName: '添加挖矿活动',
                                index: '/addMiningActivity',
                            }                                          
                        ]
                    },
                    {
                        index: '/headerList',
                        icon: 'el-icon-edit-outline',
                        module: '冲顶管理',
                        cell: [
                            {
                                cellName: '冲顶列表',
                                index: '/headerList',
                            },
                            {
                                cellName: '添加冲顶',
                                index: '/addHeader',
                            },
                            {
                                cellName: '冲顶统计',
                                index: '/headerStatistics',
                            },
                        ]
                    },
                    {
                        index: 'lotterySectorList',
                        icon: 'el-icon-view',
                        module: '抽奖管理',
                        cell: [
                            {
                                cellName:'添加抽奖',
                                index:'/addLotterySector'
                            },
                            {
                                cellName:'奖盘列表',
                                index:'/lotterySectorList'
                            },
                            {
                                cellName:'抽奖统计',
                                index:'/lotteryStatistics'
                            }
                        ]
                    },
                    {
                        index: 'questionList',
                        icon: 'el-icon-edit',
                        module: '问答管理',
                        cell: [
                            {
                                cellName: '问答列表',
                                index: '/questionList',
                            },
                            {
                                cellName: '创建问答',
                                index: '/addQuestion',
                            },
                            {
                                cellName: '问答统计',
                                index: '/questionStatistics',
                            }
                        ]
                    },
                    {
                        index: '/userTotalStatistics',
                        icon: 'el-icon-message',
                        module: '用户数据分析',
                        cell: [
                            {
                                cellName: '注册留存统计',
                                index: '/userStatistics',
                            },
                            {
                                cellName: '月注册统计',
                                index: '/userMonthStatistics',
                            },
                            {
                                cellName: '总数据一览',
                                index: '/userTotalStatistics',
                            }

                        ]
                    },
                    {
                        index: '/newsList',
                        icon: 'el-icon-news',
                        module: '资讯管理',
                        cell: [
                            {
                                cellName: '新闻管理',
                                index: '/newsList',
                            },
                            {
                                cellName: '添加新闻',
                                index: '/addNews',
                            },
                        ]
                    },
                    {
                        index: '/gameList',
                        icon: 'el-icon-setting',
                        module: '游戏管理',
                        cell: [
                            {
                                cellName: '添加游戏',
                                index: '/addGame',
                            },
                            {
                                cellName: '游戏列表',
                                index: '/gameList'
                            },
                            {
                                cellName:'游戏注册留存',
                                index:'/gameStatistics'
                            },
                            {
                                cellName:'游戏总数据',
                                index:'/gameTotalStatistics'
                            }
                        ]
                    },
                    {
                        index: '/coinStatistics',
                        icon: 'el-icon-sold-out',
                        module: '货币数据',
                        cell: [
                            {
                                cellName: '货币详细',
                                index: '/coinStatistics',
                            }
                        ]
                    },
                    
                ]
            };
        },
        watch: {
            '$route'(to, from) {
            }
        }
    }
</script>
