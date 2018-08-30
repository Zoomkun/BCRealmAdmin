<template>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm">
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
        <el-form-item label="难度系数" porp="difficulty">
            <el-rate v-model="formData.difficulty" show-text :texts="['简单', '容易','难', '较难','非常难']"></el-rate>
        </el-form-item>
        <el-form-item label="奖励算力">
            <el-input-number v-model="formData.rewardIsForce" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="奖励题数">
            <el-input-number v-model="formData.rewardQuestionNumber" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="题目数量">
            <el-input-number v-model="formData.topicNumber" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('formData')">{{addTitle}}</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'addExaminationPaper',
        mounted() {
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
                },
            };
        },
        methods: {
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'dbex/admin/question/',
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
