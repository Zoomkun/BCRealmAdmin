<template>
    <!--背景图-->

    <div class="note">
        <!--login框，表单+tab标签页的组合-->
        <div class="loginFrame">
            <el-form ref="AccountForm" :model="account" :rules="rules" label-position="left" label-width="0px"
                     class="demo-ruleForm login-container">
                <!--tab标签-->
                <span class="login-title">登录</span>
                <el-form-item prop="userName">
                    <el-input size="small" type="text" v-model="account.userName" auto-complete="off"
                              placeholder="请输入您的账号"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input type="passWord" v-model="account.passWord" auto-complete="off"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import bus from '@/js/event'

    export default {
        name: "login",
        data() {
            return {
                logining: false,// 是否登入
                account: {
                    userName: "",
                    password: ""
                },
                rules: {
                    userName: [
                        {required: true, message: "请输入账号", trigger: "blur"}
                        //{ validator: validaePass }
                    ],
                    passWord: [
                        {required: true, message: "请输入密码", trigger: "blur"}
                        //{ validator: validaePass2 }
                    ]
                },
                checked: false
            }
        },
        methods: {
            login() {
                bus.$emit('loginStatus', true)
            }
        }
    };
</script>

<style>
    .login-container {
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login-title {
        font-size: 30px;
        margin-left: 150px;
        line-height: 90px;
    }

    .note {
        position: "absolute";
        top: "0px";
        left: "0px";
        width: "100%";
        height: "100%";
        background-size: "100% 100%";
        background-repeat: "no-repeat";
    }
</style>
