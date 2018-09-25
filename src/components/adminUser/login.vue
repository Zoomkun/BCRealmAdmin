<template>
    <!--背景图-->

    <div class="note">
        <!--login框，表单+tab标签页的组合-->
        <div class="loginFrame">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-position="left" label-width="0px"
                     class="demo-ruleForm login-container">
                <!--tab标签-->
                <span class="login-title">登录</span>
                <el-form-item prop="userName">
                    <el-input type="text" v-model="ruleForm.userName" auto-complete="off"
                              placeholder="请输入您的账号"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input type="passWord" v-model="ruleForm.passWord" auto-complete="off"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;border-radius: 28px;" @click="login('ruleForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import bus from '@/js/event'

    export default {
        name: "Login",
        data() {
            return {
                ruleForm: {
                    userName: "",
                    passWord: ""
                },
                rules: {
                    userName: [
                        {required: true, message: "请输入账号", trigger: "blur"}
                    ],
                    passWord: [
                        {required: true, message: "请输入密码", trigger: "blur"}
                    ]
                },
                checked: false
            }
        },
        beforeRouteEnter(to, from, next){
            if(to.name === 'Login'){
                next(vm => {
                    bus.$emit('loginStatus', false)
                })
            }
        },
        methods: {
            login(formName) {
                var self = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        self.$ajax.post('wadmin/admin/login',
                                {
                                    userName:this.ruleForm.userName,
                                    passWord:this.ruleForm.passWord
                                }
                            )
                            .then(function (response) {
                                if (response.code === 1) {
                                    self.$notify({
                                        title: "成功",
                                        message: "登陆成功  ",
                                        type: "success",
                                        duration: 1000
                                    });
                                    let data = response.data;
                                    self.$cookies.set('user', JSON.stringify(data),'2h')
                                    self.$ajax.defaults.headers.token = data.token;

                                    bus.$emit('loginStatus', true)
                                    self.$router.push('/topicList')
                                }else{
                                    self.$notify({
                                        title: '失败',
                                        message: response.msg,
                                        type: 'danger',
                                        duration: 1000
                                    });
                                }
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style lang="stylus">
    .login-container
        box-shadow 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02)
        -webkit-border-radius 5px
        border-radius 5px
        -moz-border-radius 5px
        background-clip padding-box
        margin 0 auto
        width 240px
        padding 35px 35px 15px 35px
        background #fff
        border 1px solid #eaeaea
        box-shadow 0 0 25px #cac6c6

    .login-title
        width 100%
        text-align center
        float left
        font-size 30px
        line-height 30px
        margin-bottom 20px

    .note
        width 100%
        height 100%
        background rgba(0,0,0,0.2)
        padding 0

    .loginFrame
        position absolute
        right 10%
        top 35%

</style>
