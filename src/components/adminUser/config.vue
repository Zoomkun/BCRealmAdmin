<template>
    <el-form :model="formData" ref="configForm" status-icon label-width="100px" class="demo-ruleForm">
        <el-row>
            <el-col :span="7" :offset="1"><div class="grid-content bg-purple-dark">菜单名称</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-dark">操作</div></el-col>
        </el-row>

        <el-row :key="key" v-for="(item,key) in configData">
            <el-col :span="7" :offset="1"><div class="grid-content bg-purple-dark">{{item.name}}</div></el-col>
            <el-col :span="16">
                <el-checkbox-group v-model="configData[key]['selectData']">
                    <el-checkbox v-for="(feature,index) in configData[key].powerList" :label="feature.value" :key="index">{{feature.name}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-button type="primary" @click="submitForm">确定</el-button>
    </el-form>
</template>

<script>
    export default {
        name: 'config',
        mounted() {
            let data = this.$route.query.data;
            this.power.roleId = data.id
            this.getConfigData()
        },
        data() {
            return {
                configData:[],
                formData:null,
                power:{
                    menuResultVoList: [

                    ],
                    roleId: 0
                }
            }
        },
        methods: {
            submitForm(){
                let self = this
                let data = self.configData
                for(let i in data){
                    let obj = {}
                    if(data[i].selectData.length>0){
                        obj.menuId = data[i].menuId
                        obj.powerList = data[i].selectData.join(',')
                        self.power.menuResultVoList.push(obj)
                    }
                }
                if(self.power.menuResultVoList.length === 0){
                    this.$notify({
                        title: '提示',
                        message: '请选择权限',
                        type: 'error',
                        duration: 1500
                    });

                    return false;
                }

                self.$ajax.post('wadmin/admin/role/savePermissions',self.power).then(function (response) {
                    if(response.code === 1){
                        this.$notify({
                            title: '提示',
                            message: '提交成功',
                            type: 'success',
                            duration: 1500
                        });

                        self.power.menuResultVoList = []
                        this.$refs[configForm].resetFields();
                    }
                    for(let i in self.configData){
                        self.configData[i].selectData = []
                    }

                    self.power.menuResultVoList = []
                })
            },
            getConfigData() {
                var self = this;
                self.$ajax.get('wadmin/admin/menu/list').then(function (response) {
                    if (response.code === 1) {
                        let feature = [
                            {name: '增', value: 'u'},
                            {name: '删', value: 'd'},
                            {name: '改', value: 'c'},
                            {name: '查', value: 's'}
                        ]
                        let data = response.data

                        // json数据格式转数组
                        for(let i in data){
                            data[i].powerList = data[i].powerList.split(',')
                            data[i].selectData = []
                            for(let j in data[i].powerList){

                                for(let k in feature){

                                    if(data[i].powerList[j] === feature[k].value){
                                        data[i].powerList[j] = feature[k]
                                    }
                                }
                            }
                        }
                        self.configData = data
                    }
                })
            },
        }
    }
</script>

<style lang="stylus">
    .el-row
        padding 10px 0
        border-top 1px solid #ebebeb

        &:first-child
            border :none
            padding-top :0

    .grid-content
        font-size 16px
</style>
