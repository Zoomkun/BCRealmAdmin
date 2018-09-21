<template>
    <el-col :span="20">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="关联游戏" prop="refGameId">
                <el-select v-model="formData.refGameId" placeholder="请选择">
                    <el-option
                        v-for="item in gameData"
                        :key="item.id"
                        :label="item.gameName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="免费概率" prop="freeSpan">
                <el-input-number v-model="formData.freeSpan" label="免费模式概率"></el-input-number>
            </el-form-item>
            <el-form-item label="积分概率" prop="pointSpan">
                <el-input-number v-model="formData.pointSpan" label="积分模式概率"></el-input-number>
            </el-form-item>
            <el-form-item label="奖励数量" prop="rewardAmount">
                <el-input-number v-model="formData.rewardAmount" label="奖励数量"></el-input-number>
            </el-form-item>
            <el-form-item label="奖励重量" prop="weight">
                <el-input-number v-model="formData.weight" label="奖励重量"></el-input-number>
            </el-form-item>
            <el-form-item label="奖励类型" prop="refRewardId">
                <el-select v-model="formData.refRewardId" placeholder="请选择" @click.native="getRewardType(formData.refGameId)">
                    <el-option
                        v-for="item in rewardData"
                        :key="item.id"
                        :label="item.rewardDesc"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')">{{addTitle}}</el-button>
                <el-button @click="resetForm('formData')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
    export default {
        name: 'addLotterySector',
        mounted() {
            this.getGameData()
            let self = this
            let data = self.$route.query.data;
            if (data) {
                self.addTitle = '立即修改'
                self.formData = data
                self.method = 'PUT'
            } else {
                self.method = 'POST'
            }
        },
        data() {
            return {
                gameData:[], //游戏数据
                rewardData:[], //奖励类型数据
                addTitle: '立即添加',
                method: '',
                max: 4,
                formData: {
                    freeSpan: '',
                    pointSpan: '',
                    rewardAmount: '',
                    refRewardId: '',
                    refGameId:'',
                    weight: ''
                },
                rules: {
                    refGameId: [{
                        required: true, message: '请选择关联游戏', trigger: 'blur'
                    }],
                    freeSpan: [{
                        required: true, message: '请输入免费概率', trigger: 'blur'
                    }],
                    pointSpan: [{
                        required: true, message: '请输入积分概率', trigger: 'blur'
                    }],
                    rewardAmount: [{
                        required: true, message: '请输入奖励数量', trigger: 'blur'
                    }],
                    refRewardId: [{
                        required: true, message: '请选择奖励类型', trigger: 'blur'
                    }],
                    weight: [{
                        required: true, message: '请选择是否重要标识', trigger: 'blur'
                    }],
                }
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
            getRewardType(gameId){
                var self = this;
                self.$ajax.get('wgame/internal/rewards/getGameRewards?gameId=' + gameId).then(function (response) {
                    if (response.code === 1) {
                        self.rewardData = response.data;
                    }
                })
            },
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wlottery/admin/lottery',
                            method: self.method,
                            data: self.formData
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '奖盘添加成功',
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


    