<template>
    <el-col :span="17">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新闻标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容" prop="content">
                <VueUEditor  @ready="editorReady" v-model="ruleForm.content" :ueditor-config="config"></VueUEditor>
            </el-form-item>
            <el-form-item label="绑定游戏" v-if="roleId == 1">
                <el-checkbox-group v-model="selectionList" @change="selsChange">
                    <el-checkbox
                        border
                        v-for="item in gameData"
                        :label="item.id"
                        :key="item.id">
                        {{item.gameName}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="是否显示">
                <el-radio-group v-model="ruleForm.isShow">
                    <el-radio class="radio" :label=0>是</el-radio>
                    <el-radio class="radio" :label=1>否</el-radio>
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
    import VueUEditor from './UEditor';
    export default {
        name: "addNews",
        mounted() {
            this.getGameData()
            let self = this;
            let data = self.$route.query.data;
            if (data) {
                self.addTitle = "立即修改";
                self.ruleForm = data;
                self.method = "PUT";
            } else {
                self.method = "POST";
            };
        },
        data() {
            return {
                editor: null,
                defaultMsg: '',
                gameData: [],
                addTitle: "立即添加",
                max: 3,
                config:{
                    autoHeightEnabled: false,
                    autoFloatEnabled: true,
                    initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                    autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                    initialFrameWidth: 1200,
                    initialFrameHeight: 350,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: '/static/ueditor/'
                },
                ruleForm: {
                    title: "",
                    content: "",
                    isShow: 0,
                    roleId:'',
                    gameId:'',
                },
                rules: {
                    title: [{
                        required: true, message: "请输入新闻标题", trigger: "blur"
                    }],
                    content: [{
                        required: true, message: "请输入新闻内容", trigger: "change"
                    }]
                },
                content: "",
                gameData:[],    // 游戏列表数据
                selectionList: [], // 列表选中列
                gameIds:[],     //  多个游戏ID
                roleId:JSON.parse($cookies.get('user')).roleId
            };
        },
        methods: {
            editorReady(editorInstance){
                this.editor = editorInstance
                if(this.$route.query.data && this.$route.query.data.content){
                    editorInstance.setContent(this.$route.query.data.content)
                }
            },
            getGameData(){
                var self = this;
                self.$ajax.get('wgame/admin/game/all').then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;
                    }
                })
            },
            submitForm(formName) {
                var self = this;
                self.ruleForm.roleId = JSON.parse($cookies.get('user')).roleId;
                self.ruleForm.gameId = JSON.parse($cookies.get('user')).gameId;
                self.ruleForm.content = self.editor.getContent();
                self.ruleForm.gameIds = self.selectionList
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        self
                            .$ajax({
                                url: "wnews/admin/news/",
                                data: self.ruleForm,
                                method: self.method
                            })
                            .then(function (response) {
                                if (response.code === 1) {
                                    self.$notify({
                                        title: "成功",
                                        message: "新闻添加成功",
                                        type: "success",
                                        duration: 1000
                                    });
                                }
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            destroyed() {
                this.editor.destroy();
            },
            // 全选单选多选
            selsChange(item) {
                this.selectionList = item;
                console.log(item);
            },
        },
        components:{
            VueUEditor
        }
    };
</script>

<style lang="stylus">
</style>


