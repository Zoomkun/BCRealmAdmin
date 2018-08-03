import Vue from 'vue'
import Router from 'vue-router'
import TopicList from '@/components/topic/topicList.vue';
import AddTopic from '@/components/topic/addTopic.vue';
import AddExaminationPaper from '@/components/topic/addExaminationPaper.vue';
import ExaminationPaperList from '@/components/topic/examinationPaperList.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
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
    ],
})