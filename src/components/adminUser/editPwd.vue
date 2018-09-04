<template>
    <el-col :span="13">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input v-model="ruleForm.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repeatPassword">
                <el-input v-model="ruleForm.repeatPassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{addTitle}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    export default {
        name: 'editPwd',
        mounted() {
            let self = this
            let data = self.$route.query.data;
            if (data) {
                self.addTitle = '立即修改'
                self.ruleForm = data
                self.method = 'PUT'
            } else {
                self.method = 'POST'
            }
        },
        data() {
            return {
                addTitle: '立即修改',
                method: '',
                max: 4,
                ruleForm: {
                    password: '',
                    oldPassword: '',
                    repeatPassword: ''
                },
                rules: {
                    password: [{
                        required: true, message: '请输入新密码', trigger: 'blur'
                    }],
                    oldPassword: [{
                        required: true, message: '请输入旧密码', trigger: 'blur'
                    }],
                    repeatPassword: [{
                        required: true, message: '请再次输入确认密码', trigger: 'blur'
                    }],
                }
            };
        },
        methods: {
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'admin/edit/pwd',
                            method: self.method,
                            data: self.ruleForm
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '密码修改成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                self.$router.push('/login');
                            }else{
                                self.$notify({
                                    title: '成功',
                                    message: response.msg,
                                    type: 'danger',
                                    duration: 1000
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="stylus">
</style>


