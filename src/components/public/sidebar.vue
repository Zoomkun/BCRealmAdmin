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
    // import bus from '@/js/event'

    export default {
        name: 'Sidebar',
        data() {
            return {
                sideBarActive:'',
                sideBarData: [
                    {
                        index: '/topic.html/topicList',
                        icon: 'el-icon-tickets',
                        module: '题目问答',
                        cell: [
                            {
                                cellName: '题库列表',
                                index: '/topic.html/topicList',
                            },
                            {
                                cellName: '新增题目',
                                index: '/topic.html/addTopic',
                            },
                            {
                                cellName: '问答列表',
                                index: '/topic.html/examinationPaperList',
                            },
                            {
                                cellName: '创建问答',
                                index: '/topic.html/addExaminationPaper',
                            },
                            {
                                cellName: '奖盘列表',
                                index: '/topic.html/rewardList',
                            },
                            {
                                cellName: '添加奖盘',
                                index: '/topic.html/addReward',
                            },
                            {
                                cellName: '冲顶列表',
                                index: '/topic.html/superActivityList',
                            },
                            {
                                cellName: '添加冲顶',
                                index: '/topic.html/addSuperActivity',
                            },
                            {
                                cellName:'冲顶统计',
                                index:'/topic.html/activityStatisticsList',
                            },
                            {
                                cellName:'问答统计',
                                index:'/topic.html/questionAnswerStatistics',
                            },
                            {
                                cellName:'抽奖统计',
                                index:'/topic.html/drawStatistics'
                            }
                        ]
                    },
                    {
                        index: '/dataAnalysis.html',
                        icon: 'el-icon-document',
                        module: '数据分析',
                        cell: [
                            {
                                cellName: '留存统计',
                                index: '/dataAnalysis.html/userStatistics',
                            },
                            {
                                cellName: '用户月统计',
                                index: '/dataAnalysis.html/userMonthStatistics',
                            },
                            {
                                cellName: '数据一览',
                                index: '/dataAnalysis.html/userTotalStatistics',
                            }
        
                        ]
                    },
                    {
                        index: '/news.html',
                        icon: 'el-icon-document',
                        module: '资讯管理',
                        cell: [
                            {
                                cellName: '新闻管理',
                                index: '/news.html/newsList',
                            },
                            {
                                cellName: '添加新闻',
                                index: '/news.html/addNews',
                            },
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