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
                sideBarActive:'',
                sideBarData: [
                    {
                        index: '/topicList',
                        icon: 'el-icon-tickets',
                        module: '题目问答',
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
                                cellName: '奖盘列表',
                                index: '/rewardList',
                            },
                            {
                                cellName: '添加奖盘',
                                index: '/addReward',
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
                                cellName:'冲顶统计',
                                index:'/activityStatisticsList',
                            },
                            {
                                cellName:'问答统计',
                                index:'/questionAnswerStatistics',
                            },
                            {
                                cellName:'抽奖统计',
                                index:'/drawStatistics'
                            }
                        ]
                    },
                    {
                        index: '/userTotalStatistics',
                        icon: 'el-icon-document',
                        module: '数据分析',
                        cell: [
                            {
                                cellName: '留存统计',
                                index: '/userStatistics',
                            },
                            {
                                cellName: '用户月统计',
                                index: '/userMonthStatistics',
                            },
                            {
                                cellName: '数据一览',
                                index: '/userTotalStatistics',
                            }

                        ]
                    },
                    {
                        index: '/newsList',
                        icon: 'el-icon-document',
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
                        index:'miningActivityList',
                        icon:'el-icon-document',
                        module:'平台管理',
                        cell:[
                            {
                                cellName:'挖矿活动列表',
                                index:'/miningActivityList',
                            },
                            {
                                cellName:'添加挖矿活动',
                                index:'/addMiningActivity',
                            }
                        ]
                    }
                ]
            };
        },
        watch: {
            '$route'(to, from) {
            }
        }
    }
</script>
