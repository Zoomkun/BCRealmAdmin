<template>
    <el-col :span="7">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord" v-if="ruleForm.passWord == ''">
                <el-input v-model="ruleForm.passWord"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="所属角色" prop="roleId">
                <el-select v-model="ruleForm.roleId" placeholder="请选择">
                    <el-option
                        v-for="item in roleData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属游戏" prop="gameId">
                <el-select v-model="ruleForm.gameId" placeholder="请选择">
                    <el-option
                        v-for="item in gameData"
                        :key="item.id"
                        :label="item.gameName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户状态">
                <el-radio-group v-model="ruleForm.flag">
                    <el-radio class="radio" :label=1>启用</el-radio>
                    <el-radio class="radio" :label=0>禁用</el-radio>
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
        name: 'addUser',
        mounted() {
            this.getRoleData();
            this.getGameData();
            let self = this;
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
                    userName: '',
                    passWord: '',
                    email: '',
                    flag: 1,
                    roleId:'',
                    gameId:''
                },
                rules: {
                    userName: [{
                        required: true, message: '请输入用户姓名', trigger: 'blur'
                    }],
                    passWord: [{
                        required: true, message: '请输入密码', trigger: 'blur'
                    }],
                    email: [{
                        required: true, message: '请输入邮箱', trigger: 'blur'
                    }],
                },
                roleData:[], //角色数据
                gameData:[],    //游戏数据
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
            getRoleData() {
                var self = this;
                self.$ajax.get('wadmin/admin/role/list').then(function (response) {
                    if (response.code === 1) {
                        self.roleData = response.data
                    }
                })
            },
            submitForm(formName) {
                var self = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax({
                            url: 'wadmin/admin/user/',
                            method: self.method,
                            data: self.ruleForm
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '用户添加成功',
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


