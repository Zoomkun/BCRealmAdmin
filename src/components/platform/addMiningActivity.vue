<template>
    <el-col :span="15">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动状态" prop="state">
                <el-select v-model="formData.state" placeholder="请选择">
                    <el-option
                        v-for="item in select[0]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="startTime">
                <el-date-picker
                    v-model="formData.startTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="endTime">
                <el-date-picker
                    v-model="formData.endTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预告时间" prop="previewTime">
                <el-date-picker
                    v-model="formData.previewTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="奖励间隔" prop="rewardTime">
                <el-input-number v-model="formData.rewardTime" :min="0" :max="10000" label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="最大奖励值" prop="stageGainMaxValue">
                <el-input-number v-model="formData.stageGainMaxValue" :min="0" :max="10000"
                                 label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="总奖励值" prop="totalRewardValue">
                <el-input-number v-model="formData.totalRewardValue" :min="0" :max="10000"
                                 label="描述文字"></el-input-number>
            </el-form-item>
            <el-form-item label="活动描述" prop="description">
                <el-input v-model="formData.description" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="奖励类型" prop="rewardType">
                <el-select v-model="formData.rewardType" placeholder="请选择">
                    <el-option
                        v-for="item in tableData"
                        :key="item.id"
                        :label="item.name"
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
        name: 'addMiningActivity',
        mounted() {
            this.getRewardType()
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
                tableData: [],
                method: '',//修改还是新增
                addTitle: '立即添加',
                formData: {
                    state: '',
                    description: '',
                    rewardTime: '',
                    stageGainMaxValue: '',
                    startTime: '',
                    endTime: '',
                    previewTime: '',
                    rewardType: '',
                    totalRewardValue: ''
                },
                rules: {
                    state: [{
                        required: true, message: '请选择活动状态', trigger: 'change'
                    }],
                    description: [{
                        required: true, message: '请输入活动描述', trigger: 'blur'
                    }],
                    rewardTime: [{
                        required: true, message: '请输入奖励时间间隔', trigger: 'blur'
                    }],
                    rewardType: [{
                        required: true, message: '请选择奖励类型', trigger: 'blur'
                    }],
                    startTime: [{
                        required: true, message: '请选择开始时间', trigger: 'blur'
                    }],
                    endTime: [{
                        required: true, message: '请选择结束时间', trigger: 'blur'
                    }],
                    previewTime: [{
                        required: true, message: '请选择预告时间', trigger: 'blur'
                    }],
                    stageGainMaxValue: [{
                        required: true, message: '请输入阶段最大奖励值', trigger: 'blur'
                    }],
                    totalRewardValue: [{
                        required: true, message: '请输入总奖励值', trigger: 'change'
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
                    []
                ],
            }
        },
        methods: {
            //获取奖励类型接口
            getRewardType() {
                var self = this;
                self.$ajax.get('wcoin/internal/list').then(function (response) {
                    if (response.code === 1) {
                        self.tableData = response.data;
                    }
                })
            },
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wplatform/admin/mining/activity/',
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


