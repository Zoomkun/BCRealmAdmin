<template>
    <div id="app">

        <el-container style=" border: 1px solid #eee">
            <Sidebar v-if="loginIng.static"></Sidebar>
            <el-container>
                <el-main>
                    <Cheader></Cheader>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Sidebar from '@/components/public/sidebar.vue'
    import Cheader from '@/components/public/publicHeader.vue'
    import bus from '@/js/event'

    export default {
        name:'Index',
        data() {
            return {
                loginIng:{
                    static:false
                },
                side: {
                    sideNow:'1-1'
                }
            }
        },
        mounted() {
            bus.$on('loginIng',function(data){
            })
        },
        components: {
            Sidebar,
            Cheader,
        }
    };
</script>

<style lang="stylus">
    .el-main
        padding-top 0

    .el-container
        height 100%
</style>

