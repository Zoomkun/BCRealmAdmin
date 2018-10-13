<template>
    <el-header>
        <el-col :span="4" class="userinfo">
            <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner">{{sysUserName}}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  divided @click.native="editPwd()">修改密码</el-dropdown-item>
                    <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
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
    .userinfo
            text-align: right
            padding-right: 35px
            float: right!important
            .userinfo-inner
                cursor: pointer
                color: #fff

</style>
<script>
    import bus from '@/js/event'

    export default {
        name: 'publicHeader',
        data() {
            return {
                sysUserName:''
            };
        },
        methods: {
            //退出登录
            logoutFun: function() {
                var self = this;
                this.$confirm('确认退出吗?', '提示', {
                    type: 'warning'
                }).then(function(){
                    self.$ajax.delete('wadmin/admin/loginOut'
                    ).then(function(response){
                    if(response.code === 1){
                        self.$notify({
                            title: '提示',
                            message: '退出成功',
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
                });
            },
            editPwd() {
                this.$router.push({path: '/editPwd'});
            }
        },
        mounted() {
            var user = $cookies.get('user');
            user = JSON.parse(user);
            if (user) {
                this.sysUserName = user.userName || '';
            }
        }
    }
</script>
