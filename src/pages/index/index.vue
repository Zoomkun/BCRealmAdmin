<template>
    <div id="app">
        <el-container style=" border: 1px solid #eee">
            <Sidebar v-show="login.status"></Sidebar>
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
        name: 'Index',
        data() {
            return {
                login: {
                    status: false
                }
            }
        },
        mounted() {
            let self = this;
            if (self.$cookies.get('user')) {
                self.$set(self.login, 'status', true)
            }else{
                self.$set(self.login, 'status', false)
                self.$router.push('/login')
            }

            bus.$on('loginStatus', function (data) {
                self.$forceUpdate()
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
        background: url('../../../static/img/login.png');
</style>

