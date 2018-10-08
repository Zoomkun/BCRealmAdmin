<template>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
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
        <el-form-item label="开始时间">
            <el-date-picker
                v-model="formData.startTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changeTime">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker
                v-model="formData.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                @change="changeTime">
            </el-date-picker>
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
        <el-form-item label="奖励数量">
            <el-input-number v-model="formData.rewardValue" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="奖励题数">
            <el-input-number v-model="formData.rewardQuestionNumber" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="题目数量">
            <el-input-number v-model="formData.topicNumber" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="难度1题数" prop="difficultya">
                <el-input-number v-model="formData.difficultya" :min="0" :max="formData.topicNumber" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="难度2题数" prop="difficultyb">
                <el-input-number v-model="formData.difficultyb" :min="0" :max="formData.topicNumber - formData.difficultya" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="难度3题数" prop="difficultyc">
                <el-input-number v-model="formData.difficultyc" :min="0" :max="formData.topicNumber - formData.difficultya - formData.difficultyb" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('formData')">{{addTitle}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'addQuestion',
        mounted() {
            this.getGameData()
            let self = this
            let data = self.$route.query.data;
            if (data) {
                self.addTitle = '立即修改'
                self.formData = data
                self.method = 'put'
            } else {
                self.method = 'post'
            }
        },
        data() {
            return {
                addTitle: '立即添加',
                method: '',
                formData: {
                    startTime: '',
                    endTime: '',
                    difficulty: 1,
                    rewardIsForce: '',
                    rewardQuestionNumber: '',
                    topicNumber: '',
                    difficultya:'',
                    difficultyb:'',
                    difficultyc:'',
                    refRewardId: '',
                    rewardValue:'',
                    refGameId:''
                },
                gameData:[],    //
                rewardData:[], //奖励类型数据
                select: [
                    [
                        {
                            value: 1,
                            label: '算力'
                        },
                        {
                            value: 2,
                            label: '积分'
                        },
                        {
                            value: 3,
                            label: '经验'
                        },
                        {
                            value: 4,
                            label: 'dbex'
                        }
                    ]
                ],
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
                            url: 'wquestion/admin/question/',
                            data: self.formData,
                            method: self.method
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '题目添加成功',
                                    type: 'success',
                                    duration: 1000
                                });
                            } else {
                                self.$notify({
                                    title: '失败',
                                    message: response.msg,
                                    type: 'error',
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
            },
            changeTime() {
                console.log(this.formData.startTime)
                console.log(this.formData.endTime)
            }
        }
    };
</script>

<style lang="stylus">
    .el-rate
        display inline-block
        vertical-align middle

    .el-row
        margin-bottom 20px
</style>
