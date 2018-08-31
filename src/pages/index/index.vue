<template>
    <div id="app">

        <el-container style=" border: 1px solid #eee">
            <Sidebar v-if="login.status"></Sidebar>
            <el-container>
                <el-main v-bind:class="{ Bg: !login.status }">
                    <Cheader v-if="login.status"></Cheader>
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
                login:{
                    status:false
                },
                side: {
                    sideNow:'1-1'
                }
            }
        },
        mounted() {
            let self = this
            bus.$on('loginStatus',function(data){
                self.$forceUpdate()
                console.log(data)
                self.$set(self.login, 'status', data)
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
    .Bg
        background:url('../../../static/img/login.png');
</style>

