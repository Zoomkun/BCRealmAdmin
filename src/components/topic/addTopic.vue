<template>
    <el-col :span="20">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
            <el-form-item label="题目名称" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="题目难度" prop="difficulty">
                <el-rate v-model="ruleForm.difficulty" v-bind:max="max" show-text :texts="['简单', '容易', '较难']"></el-rate>
            </el-form-item>
            <el-form-item label="题目答案">
            </el-form-item>
            <el-form-item v-for="(item,index) in ruleForm.answerList" :label="item.title" :key="index">
                <el-col :span="12">
                    <el-form-item :prop="'answerList.' + index + '.answer'">
                        <el-input v-model="item.answer"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="5" :offset="1">
                    <el-form-item :prop="'answerList.' + index + '.isRightAnswer'">
                        <el-checkbox :true-label="1" :false-label="0" name="type"
                                     v-model="item.isRightAnswer"></el-checkbox>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="是否公用">
                <el-radio-group v-model="ruleForm.isCommon">
                    <el-radio class="radio" :label=0>否</el-radio>
                    <el-radio class="radio" :label=1>是</el-radio>
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
        name: 'addTopic',
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
                gameData:[],
                addTitle: '立即添加',
                max: 3,
                ruleForm: {
                    title: '',
                    difficulty: 1,
                    refGameId:'',
                    answerList: [
                        {
                            title: 'A',
                            answer: '',
                            isRightAnswer: 0
                        },
                        {
                            title: 'B',
                            answer: '',
                            isRightAnswer: 0
                        },
                        {
                            title: 'C',
                            answer: '',
                            isRightAnswer: 0
                        },
                        {
                            title: 'D',
                            answer: '',
                            isRightAnswer: 0
                        }
                    ],
                    isCommon: 0
                },
                rules: {
                    title: [{
                        required: true, message: '请输入题目名称', trigger: 'blur'
                    }],
                    difficulty: [{
                        required: true, message: '请输入题目名称', trigger: 'change'
                    }],
                    answerList: [
                        {
                            answer: {required: true, message: '请输入答案名称', trigger: 'blur'}
                        },
                        {
                            answer: {required: true, message: '请输入答案名称', trigger: 'blur'}
                        },
                        {
                            answer: {required: true, message: '请输入答案名称', trigger: 'blur'}
                        },
                        {
                            answer: {required: true, message: '请输入答案名称', trigger: 'blur'}
                        },
                    ]
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
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wquestion/admin/topic/',
                            data: self.ruleForm,
                            method: self.method
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '题目添加成功',
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
    .el-rate
        display inline-block
        vertical-align middle

    .el-row
        margin-bottom 20px
</style>


