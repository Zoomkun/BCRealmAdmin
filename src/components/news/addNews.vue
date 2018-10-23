<template>
    <el-col :span="13">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="新闻标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="新闻内容" prop="content">
                <button @click="check">获取内容</button>
                <button @click="getUEContent()">获取内容</button>
                <VueUEditor  @ready="editorReady" v-model="ruleForm.content" :ueditor-config="config"></VueUEditor>
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
                    initialFrameWidth: 1000,
                    initialFrameHeight: 350,
                    BaseUrl: '',
                    UEDITOR_HOME_URL: '/static/ueditor/'
                },
                ruleForm: {
                    title: "",
                    content: "",
                    isShow: 0,
                    roleId:''
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
            };
        },
        methods: {
            editorReady(editorInstance){
                this.editor = editorInstance
                console.log(editorInstance)
                if(this.$route.query.data && this.$route.query.data.content){
                    editorInstance.setContent(this.$route.query.data.content)
                }
            },
            //获取文档内容
            check(){
                alert(this.editor.getContent())
            },
            getUEContent(editorInstance) {
                let content = editorInstance.getContent();
                console.log(content);
                alert(content);
            },
            submitForm(formName) {
                var self = this;
                self.ruleForm.roleId = JSON.parse($cookies.get('user')).roleId;
                self.ruleForm.content = self.editor.getContent();
                console.log( this.$refs[formName])
                this.$refs[formName].validate(valid => {
                    console.log(valid)
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
            }
        },
        components:{
            VueUEditor
        }
    };
</script>

<style lang="stylus">
</style>


