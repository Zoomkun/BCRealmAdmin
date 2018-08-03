<template>
    <el-container style=" border: 1px solid #eee">
        <Sidebar></Sidebar>
        <el-container>
            <el-main>
                <Cheader></Cheader>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Sidebar from '@/components/public/sidebar.vue'
    import Cheader from '@/components/public/header.vue'

    export default {
        mounted(){
          console.log(this.$route)
        },
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item)
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
        padding-top 0
</style>

