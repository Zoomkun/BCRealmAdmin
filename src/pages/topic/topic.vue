<template>
    <div id="app">

        <el-container style=" border: 1px solid #eee">
            <Sidebar></Sidebar>
            <el-container>
                <el-main>
                    <Cheader></Cheader>
                    <router-view/>
                    <!--题目列表-->
                    <!--<CtopicList v-if="side.sideNow == '1-1'"></CtopicList>-->
                    <!--添加题目-->
                    <!--<CaddTopic v-if="side.sideNow == '1-2'"></CaddTopic>-->
                    <!--问答列表-->
                    <!--<CexaminationPaperList v-if="side.sideNow == '1-3'"></CexaminationPaperList>-->
                    <!--创建问答-->
                    <!--<CaddExaminationPaper v-if="side.sideNow == '1-4'"></CaddExaminationPaper>-->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // import bus from '@/js/event'
    import Sidebar from '@/components/public/sidebar.vue'
    import Cheader from '@/components/public/publicHeader.vue'
    // import CtopicList from '@/components/topic/topicList.vue'
    // import CaddTopic from '@/components/topic/addTopic.vue'
    // import CaddExaminationPaper from '@/components/topic/addExaminationPaper.vue'
    // import CexaminationPaperList from '@/components/topic/examinationPaperList.vue'

    export default {
        name:'Topic',
        data() {
            return {
                side: {
                    sideNow:'1-1'
                }
            }
        },
        components: {
            Sidebar,
            Cheader,
            // CtopicList,
            // CaddTopic,
            // CaddExaminationPaper,
            // CexaminationPaperList,
        }
    };
</script>

<style lang="stylus">
    .el-main
        padding-top 0

    .el-container
        height 100%
</style>

