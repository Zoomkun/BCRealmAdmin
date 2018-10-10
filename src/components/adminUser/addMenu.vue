<template>
    <el-col :span="4">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="菜单名称" prop="name">
                <el-input v-model="ruleForm.name" clearable></el-input>
            </el-form-item>
            <el-form-item label="菜单路径" prop="url">
                <el-input v-model="ruleForm.url" clearable></el-input>
            </el-form-item>
            <el-form-item label="菜单图标" prop="icon">
                <el-input v-model="ruleForm.icon"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="powerList">
                <el-input v-model="ruleForm.powerList"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型" prop="menuType">
                <el-select v-model="ruleForm.menuType" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属父级" prop="parentId">
                <el-select v-model="ruleForm.parentId" placeholder="请选择">
                    <el-option
                        v-for="item in menuData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单排序" prop="display">
                <el-input-number v-model="ruleForm.display" :min="1" label="描述文字"></el-input-number>
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
                    name: '',
                    url: '',
                    icon:'',
                    menuType:0,
                    status:1,
                    parentId:'',
                    display:'',
                    powerList:''
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
                menuData:[] //菜单数据
            };
        },
        methods: {
            getMenuData() {
                var self = this;
                self.$ajax.get('wadmin/admin/menu/list').then(function (response) {
                    if (response.code === 1) {
                        self.menuData = response.data
                    }
                })
            },
            submitForm(formName) {
                var self = this
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


