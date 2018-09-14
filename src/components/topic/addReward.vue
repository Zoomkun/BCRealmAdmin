<template>
    <el-col :span="20">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="免费概率" prop="freeProbability">
                <el-input-number v-model="formData.freeProbability" label="免费模式概率"></el-input-number>
            </el-form-item>
            <el-form-item label="积分概率" prop="pointProbability">
                <el-input-number v-model="formData.pointProbability" label="积分模式概率"></el-input-number>
            </el-form-item>
            <el-form-item label="奖励数量" prop="rewardQuantity">
                <el-input-number v-model="formData.rewardQuantity" label="奖励数量"></el-input-number>
            </el-form-item>
            <el-form-item label="是否重要" prop="isImportant">
                <el-select v-model="formData.isImportant" placeholder="请选择">
                    <el-option
                        v-for="item in options[1]"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="奖励类型" prop="rewardType">
                <el-select v-model="formData.rewardType" placeholder="请选择">
                    <el-option
                        v-for="item in options[0]"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
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
        name: 'addTopic',
        checked: Boolean,
        mounted() {
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
                checked: [],
                addTitle: '立即添加',
                options: [
                    [
                        {
                            value: 1,
                            label: '算力'
                        },
                        {
                            value: 3,
                            label: '经验'
                        },
                        {
                            value: 4,
                            label: 'DBEX'
                        }
                    ],
                    [
                        {
                            value: 0,
                            label: '否'
                        },
                        {
                            value: 1,
                            label: '是'
                        }
                    ]
                ],
                method: '',
                max: 4,
                formData: {
                    freeProbability: '',
                    pointProbability: '',
                    rewardQuantity: '',
                    rewardType: '',
                    isImportant: ''
                },
                rules: {
                    freeProbability: [{
                        required: true, message: '请输入免费概率', trigger: 'blur'
                    }],
                    pointProbability: [{
                        required: true, message: '请输入积分概率', trigger: 'blur'
                    }],
                    rewardQuantity: [{
                        required: true, message: '请输入奖励数量', trigger: 'blur'
                    }],
                    rewardType: [{
                        required: true, message: '请选择奖励类型', trigger: 'blur'
                    }],
                    isImportant: [{
                        required: true, message: '请选择是否重要标识', trigger: 'blur'
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
                            url: 'dbex/admin/rewardSector/',
                            method: self.method,
                            data: self.formData
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
                         console.log(this.checked)
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


    