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
                    <el-button type="primary" style="width:100%;" @click="login('ruleForm')">登录</el-button>
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
        methods: {
            login(formName) {
                var self = this;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        self.$ajax.post('http://localhost:8006/admin/login',
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
                                    localStorage.setItem('user', JSON.stringify(data));
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
        position: relative;
    }
    .loginFrame{
        padding-left: 550px;
        padding-top: 200px;
    }   
    
</style>
