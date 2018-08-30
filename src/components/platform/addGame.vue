<template>
    <el-col :span="13">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="游戏名称" prop="gameName">
                <el-input v-model="ruleForm.gameName"></el-input>
            </el-form-item>
            <el-form-item label="游戏地址" prop="gameAddress">
                <el-input v-model="ruleForm.gameAddress"></el-input>
            </el-form-item>
            <el-form-item label="游戏编码" prop="gameCode">
                <el-input v-model="ruleForm.gameCode"></el-input>
            </el-form-item>
            <el-form-item label="游戏状态">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio class="radio" :label=1>开始</el-radio>
                    <el-radio class="radio" :label=2>关闭</el-radio>
                </el-radio-group>
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
        name: 'addGame',
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
                addTitle: '立即添加',
                method: '',
                max: 4,
                ruleForm: {
                    gameName: '',
                    gameAddress: '',
                    gameCode: '',
                    status: 1
                },
                rules: {
                    gameName: [{
                        required: true, message: '请输入游戏名称', trigger: 'blur'
                    }],
                    gameAddress: [{
                        required: true, message: '请输入游戏地址', trigger: 'blur'
                    }],
                    gameCode: [{
                        required: true, message: '请输入游戏编码', trigger: 'blur'
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
                            url: 'admin/game/',
                            method: self.method,
                            data: self.ruleForm
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '游戏添加成功',
                                    type: 'success',
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


