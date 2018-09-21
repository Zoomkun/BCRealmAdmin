<template>
    <el-col :span="20">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="冲顶状态" prop="answerStatus">
                <el-select v-model="formData.answerStatus" placeholder="请选择">
                    <el-option
                        v-for="item in select[0]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
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
            <el-form-item label="预告时间" prop="previewTime">
                <el-date-picker
                    v-model="formData.previewTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="活动时间" prop="endTime">
                <el-date-picker
                    v-model="formData.startTime"
                    type="datetime"
                    placeholder="选择开始日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                 至 
                <el-date-picker
                    v-model="formData.endTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择结束日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="答题时长" prop="answerTime">
                <el-input-number v-model="formData.answerTime" :min="0" :max="10000" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="奖励数量" prop="rewardQuantity">
                <el-input-number v-model="formData.rewardQuantity" :min="0" :max="10000" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="冲顶描述" prop="description">
                <el-input v-model="formData.description" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="问题数量" prop="questionNumber">
                <el-input-number v-model="formData.questionNumber" :min="0" :max="10000" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="难度1题数" prop="difficultya">
                <el-input-number v-model="formData.difficultya" :min="0" :max="formData.questionNumber" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="难度2题数" prop="difficultyb">
                <el-input-number v-model="formData.difficultyb" :min="0" :max="formData.questionNumber - formData.difficultya" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="难度3题数" prop="difficultyc">
                <el-input-number v-model="formData.difficultyc" :min="0" :max="formData.questionNumber - formData.difficultya - formData.difficultyb" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="奖励类型" prop="rewardType">
                <el-select v-model="formData.rewardType" placeholder="请选择">
                    <el-option
                        v-for="item in select[1]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="参与奖比率" prop="failedShareRate">
                <el-input-number v-model="formData.failedShareRate" :min="0" :max="10000"
                                 label="描述文字"></el-input-number>
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
        name: 'addHeader',
        mounted() {
            this.getGameData()
            let self = this
            let data = self.$route.query.data;
            if (data) {
                self.addTitle = '立即修改'
                self.formData = data;
                self.method = 'PUT'
            } else {
                self.method = 'POST'
            }
        },
        data() {
            return {
                gameData:[], //游戏列表
                method: '',//修改还是新增
                addTitle: '立即添加',
                formData: {
                    answerStatus: '',
                    description: '',
                    answerTime: '',
                    rewardType: '',
                    startTime: '',
                    endTime: '',
                    previewTime: '',
                    questionNumber: '',
                    rewardQuantity: '',
                    failedShareRate: '',
                    difficultya:'',
                    difficultyb:'',
                    difficultyc:'',
                    refGameId:''
                },
                rules: {
                    answerStatus: [{
                        required: true, message: '请选择冲顶状态', trigger: 'change'
                    }],
                    description: [{
                        required: true, message: '请输入冲顶描述', trigger: 'blur'
                    }],
                    answerTime: [{
                        required: true, message: '请输入答题时间', trigger: 'blur'
                    }],
                    rewardType: [{
                        required: true, message: '请选择奖励类型', trigger: 'blur'
                    }],
                    startTime: [
                        {required: true, message: '请选择开始时间', trigger: 'blur'}
                    ],
                    endTime: [{
                        required: true, message: '请选择活动时间', trigger: 'blur'
                    }],
                    previewTime: [{
                        required: true, message: '请选择预告时间', trigger: 'blur'
                    }],
                    questionNumber: [{
                        required: true, message: '请选择问题数量', trigger: 'blur'
                    }],
                    rewardQuantity: [{
                        required: true, message: '请选择奖励类型', trigger: 'change'
                    }],
                    refGameId: [{
                        required: true, message: '请选择游戏类型', trigger: 'change'
                    }],
                },
                select: [
                    [
                        {
                            value: 1,
                            label: '未开始'
                        },
                        {
                            value: 2,
                            label: '进行中'
                        },
                        {
                            value: 3,
                            label: '已结束'
                        }
                    ],
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
            }
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
                            url: 'wquestion/admin/header/',
                            method: self.method,
                            data: self.formData
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '冲顶添加成功',
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
            }
        }
    }
</script>

<style lang="stylus">
</style>


