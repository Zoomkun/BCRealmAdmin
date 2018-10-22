<template>
    <el-col :span="24">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜单名称" prop="name" style="width: 400px">
                <el-input v-model="ruleForm.name" clearable ></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="powerList">
                <el-checkbox-group v-model="ruleForm.powerList" @change="handleChecked">
                    <el-checkbox v-for="feature in features" :label="feature.value" :key="feature.value">{{feature.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="菜单状态">
                <el-radio-group v-model="ruleForm.status">
                    <el-radio class="radio" :label=1>启用</el-radio>
                    <el-radio class="radio" :label=-1>禁用</el-radio>
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
        name: 'addMenu',
        mounted() {
            this.getMenuData()
            let self = this
            let data = self.$route.query.data;
            if (data) {
                data.powerList = JSON.parse(data.powerList);
                if(typeof data.powerList !== 'Array') {
                    data.powerList = []
                }
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
                features: [
                    {name: '增', value: 'u'},
                    {name: '删', value: 'd'},
                    {name: '改', value: 'c'},
                    {name: '查', value: 's'}
                ],
                ruleForm: {
                    name: '',
                    url: '',
                    icon: '',
                    menuType: 0,
                    status: 1,
                    parentId: '',
                    display: '',
                    powerList: []
                },
                rules: {
                    name: [{
                        required: true, message: '请输入菜单名称', trigger: 'blur'
                    }],
                    url: [{
                        required: true, message: '请输入菜单路径', trigger: 'blur'
                    }],
                },
                options: [
                    {
                        value: 0,
                        label: '菜单'
                    },
                    {
                        value: 1,
                        label: '链接网址'
                    },
                    {
                        value: 2,
                        label: '隐藏链接'
                    }
                ],
                menuData: [] //菜单数据
            };
        },
        methods: {
            handleChecked(value){
                console.log(value.length)
                console.log(value)
            },
            getMenuData() {
                var self = this;
                self.$ajax.get('wadmin/admin/menu/list').then(function (response) {
                    if (response.code === 1) {
                        self.menuData = response.data
                    }
                })
            },
            submitForm(formName) {
                var self = this;
                self.ruleForm.powerList = self.ruleForm.powerList.join(',')
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wadmin/admin/menu/',
                            method: self.method,
                            data: self.ruleForm
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '菜单添加成功',
                                    type: 'success',
                                    duration: 1000
                                });
                                self.resetForm('ruleForm')
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


