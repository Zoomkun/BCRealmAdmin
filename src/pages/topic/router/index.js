import Vue from 'vue'
import Router from 'vue-router'
import TopicList from '@/components/topic/topicList.vue'
import AddTopic from '@/components/topic/addTopic.vue'
import AddExaminationPaper from '@/components/topic/addExaminationPaper.vue'
import ExaminationPaperList from '@/components/topic/examinationPaperList.vue'
import AddReward from '@/components/topic/addReward.vue'
import RewardList from '@/components/topic/rewardList.vue'
import AddSuperActivity from '@/components/topic/addSuperActivity.vue'
import SuperActivityList from '@/components/topic/superActivityList.vue'
import activityStatisticsList from '@/components/topic/activityStatisticsList.vue'
import questionAnswerStatistics from '@/components/topic/questionAnswerStatistics.vue'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/topic.html',
            name: 'TopicList',
            component: TopicList
        },
        {
            path: '/topic.html/topicList',
            name: 'TopicList',
            component: TopicList
        },
        {
            path: '/topic.html/addTopic/:id',
            name: 'AddTopic',
            component: AddTopic
        },
        {
            path: '/topic.html/addTopic',
            name: 'AddTopic',
            component: AddTopic
        },
        {
            path: '/topic.html/addExaminationPaper/:id',
            name: 'AddExaminationPaper',
            component: AddExaminationPaper
        },
        {
            path: '/topic.html/addExaminationPaper',
            name: 'AddExaminationPaper',
            component: AddExaminationPaper
        },
        {
            path: '/topic.html/examinationPaperList',
            name: 'ExaminationPaperList',
            component: ExaminationPaperList
        },
        {
            path: '/topic.html/addReward',
            name: 'AddReward',
            component: AddReward
        },
        {
            path: '/topic.html/rewardList',
            name: 'RewardList',
            component: RewardList
        },
        {
            path: '/topic.html/addSuperActivity',
            name: 'AddSuperActivity',
            component: AddSuperActivity
        },
        {
            path: '/topic.html/superActivityList',
            name: 'SuperActivityList',
            component: SuperActivityList
        },
        {
            path: '/topic.html/activityStatisticsList',
            name: 'activityStatisticsList',
            component: activityStatisticsList
        },
        {
            path: '/topic.html/questionAnswerStatistics',
            name: 'questionAnswerStatistics',
            component: questionAnswerStatistics
        }
    ],
})