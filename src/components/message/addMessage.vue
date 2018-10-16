<template>
    <el-col :span="8">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" label-heigh="100px" class="demo-ruleForm">
            <el-form-item label="关联游戏" prop="refGameId">
                <el-select v-model="ruleForm.refGameId" placeholder="请选择">
                    <el-option
                        v-for="item in gameData"
                        :key="item.id"
                        :label="item.gameName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消息标题" prop="messageTitle">
                <el-input v-model="ruleForm.messageTitle"></el-input>
            </el-form-item>
            <el-form-item label="消息内容" prop="messageContent">
                <el-input type="textarea" :autosize="{ minRows: 5}"clearable v-model="ruleForm.messageContent"></el-input>
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
        name: 'addMessage',
        mounted() {
            this.getGameData()
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
                    messageTitle: '',
                    messageContent: '',
                    refGameId:'',
                    messageType:2
                },
                rules: {
                    messageTitle: [{
                        required: true, message: '请输入消息标题', trigger: 'blur'
                    }],
                    messageContent: [{
                        required: true, message: '请输入消息内容', trigger: 'blur'
                    }],
                },
                gameData:[],    //
            };
        },
        methods: {
            getGameData(){
                var self = this;
                self.$ajax.get('wgame/admin/game/all').then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;
                    }
                })
            },
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wmessage/admin/message/',
                            method: self.method,
                            data: self.ruleForm
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '消息添加成功',
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


