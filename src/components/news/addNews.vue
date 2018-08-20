<template>
    <el-col :span="13">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新闻标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容" prop="content">
                <el-input v-model="ruleForm.content"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容" prop="content">
                <quill-editor 
                    ref="myTextEditor" 
                    v-model="ruleForm.content" 
                    :options="editorOption">
                </quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{addTitle}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-col>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
    export default {
        name: 'addNews',
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
        components: {
            quillEditor
        },
        data() {
            return {
                addTitle: '立即添加',
                max: 3,
                ruleForm: {
                    title: '',
                    content: ''
                },
                rules: {
                    title: [{
                        required: true, message: '请输入新闻标题', trigger: 'blur'
                    }],
                    content: [{
                        required: true, message: '请输入新闻内容', trigger: 'change'
                    }],
                },
                content: '',
                editorOption: {
                    
                }
            };
        },
        methods: {
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({url: 'news/', data: self.ruleForm, method: self.method}).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '新闻添加成功',
                                    type: 'success',
                                    duration: 1000
                                });

                                this.$refs[formName].resetFields();
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


