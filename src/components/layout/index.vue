<template>
    <div style="width: 100%;height: 100%">
        <el-container style=" border: 1px solid #eee">
            <Sidebar></Sidebar>
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

    export default {
        name: 'Layout',
        data() {
            return {
                login: {

                }
            }
        },
        mounted() {
            let self = this;
            if (!self.$cookies.get('user')) {
                self.$router.push('/login')
            }
        },
        components: {
            Sidebar,
            Cheader,
        }
    };
</script>

<style lang="stylus">
    .el-main
        padding 0

    .el-container
        height 100%


</style>

