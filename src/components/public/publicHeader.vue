<template>
    <el-header>
        <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner">admin</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-header>
</template>

<style lang="stylus">
    .el-header
        background-color: #B3C0D1
        color: #333
        line-height: 60px
        margin-bottom 20px
        text-align: right
        font-size: 12px

</style>
<script>
    import bus from '@/js/event'

    export default {
        name: 'publicHeader',
        data() {
            return {};
        },
        methods: {
            //退出登录
            logoutFun: function() {
                var self = this;
                this.$confirm('确认退出吗?', '提示', {
                    type: 'warning'
                }).then(function(){
                    self.$ajax.delete('admin/loginOut'
                    ).then(function(response){
                    if(response.code === 1){
                        self.$notify({
                            title: '提示',
                            message: '绑定成功',
                            type: 'success',
                            duration: 1000
                        })
                        self.$cookies.remove('user')
                        bus.$emit('loginStatus', false)
                        self.$router.push('/login');
                    }else{
                        self.$notify({
                            title: '提示',
                            message: '退出失败',
                            type: 'danger',
                            duration: 1000
                        })
                    }
                })
                }).catch(() => {

                });


            },
        }
    }
</script>
