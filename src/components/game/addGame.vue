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
            <el-form-item label="奖励类型">
                <el-checkbox-group v-model="selectionList" @change="selsChange">
                    <el-checkbox
                        border
                        v-for="item in rewardData"
                        :label="item"
                        :disabled="item.disabled"
                        :key="item.rewardDesc">
                        {{item.rewardDesc}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="游戏类型">
                <el-radio-group v-model="ruleForm.type">
                    <el-radio class="radio" :label=1>世界游戏</el-radio>
                    <el-radio class="radio" :label=2>小游戏</el-radio>
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
            this.getRewardType()
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
                    status: 1,
                    rewardTypeVoList:[],
                    type:2
                },
                rewardData:[],
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
                },
                selectionList: [], // 列表选中列
            };
        },
        methods: {
            getRewardType(){
                var self = this;
                self.$ajax.get('wgame/internal/rewards/gameRewards').then(function (response) {
                    if (response.code === 1) {
                        self.rewardData = response.data;
                    }
                })
            },
            submitForm(formName) {
                var self = this
                self.ruleForm.rewardTypeVoList = self.selectionList
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wgame/admin/game/',
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
            // 全选单选多选
            selsChange(item) {
                this.selectionList = item;
                // console.log(item);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="stylus">
</style>


