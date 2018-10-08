<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="gameData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                :span="2">
            </el-table-column>
            <el-table-column
                prop="id"
                label="游戏ID"
                :span="2">
            </el-table-column>
            <el-table-column
                width="300"
                prop="gameName"
                label="游戏名称"
                :span="2">
            </el-table-column>
            <el-table-column
                width="300"
                prop="gameAddress"
                label="游戏地址"
                :span="12">
            </el-table-column>
            <el-table-column
                prop="gameCode"
                label="游戏编码"
                :span="3">
            </el-table-column>
            <el-table-column
                prop="status"
                label="游戏状态"
                :formatter="formatShow">
            </el-table-column>
            <el-table-column label="操作" :span="4">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEditGame(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleOptionList(scope.row.id)">查看配置
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
            <!--绑定游戏参数列表页面外层-->
            <el-dialog title="游戏参数配置" :visible.sync="dialogTableVisible" width='55%'
                    :close-on-click-modal="true" center>
                    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="filters" @submit.native.prevent>
                        <el-form-item>
				            <el-input v-model="filters.gkey" placeholder="键名称"></el-input>
				        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" v-on:click="handleOptionList(gameId)">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-table
                    ref="multipleTable"
                    :data="optionData"
                    height="450"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;"
                    :cell-style="{'text-align':'center'}"
                    :header-cell-style="{'text-align':'center'}">
                    <el-table-column
                        prop="id"
                        width="80"
                        label="ID">
                    </el-table-column>
                    <el-table-column
                        prop="gkey"
                        label="键"
                        :span="2"
                        width="300"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="gvalue"
                        label="值"
                        :span="2"
                        width="100"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="description"
                        label="配置说明"
                        :span="2"
                        width="280"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="isCommon"
                        label="是否公用"
                        :span="2"
                        width="100"
                        :formatter="formatCommon"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="操作" :span="4">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEditOption(scope.$index, scope.row)">编辑
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="currentChange"
                    :current-page.sync="currentPageData"
                    background
                    layout="prev, pager, next"
                    :page-count="totalPages"
                    style="margin-top: 20px">
                </el-pagination>
                    <!-- 编辑配置参数form表单内层 -->
                    <el-dialog title="编辑配置参数" :visible.sync="dialogFormVisible" width='40%'
                            :close-on-click-modal="true" center append-to-body>
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="键" prop="gkey">
                                <el-input v-model="ruleForm.gkey"></el-input>
                            </el-form-item>
                            <el-form-item label="值" prop="gvalue">
                                <el-input v-model="ruleForm.gvalue"></el-input>
                            </el-form-item>
                            <el-form-item label="配置说明" prop="description">
                                <el-input v-model="ruleForm.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="updateForm('ruleForm')">修改</el-button>
                                <el-button @click.native="dialogFormVisible=false">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
            </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'miningActivityList',
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                gameData: [],
                multipleSelection: [],
                dialogFormVisible: false,   //游戏配置参数修改弹框
                dialogTableVisible: false,  //游戏配置参数列表弹框
                optionData: [],
                gameId:'', //游戏ID
                filters:{
                    gkey:'',
                },
                // 编辑界面数据
                ruleForm: {
                    id: '0',
                    gkey: '',
                    gvalue: '',
                    description: ''
                },
                rules: {
                    gkey: [{
                        required: true, message: "请输入配置键", trigger: "blur"
                    }],
                    gvalue: [{
                        required: true, message: "请输入配置值", trigger: "change"
                    }],
                    description: [{
                        required: true, message: "请输入配置说明", trigger: "change"
                    }],
                },
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            //配置是否公用
            formatCommon(row, column) {
                return row.isCommon == false ? '否' : '是';
            },
            //游戏状态显示转换
            formatShow: function (row, column) {
                return row.status == 1 ? '开始' : '关闭';
            },
            //获取列表数据
            getData() {
                var self = this;
                self.$ajax.get('wgame/admin/game/all').then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;
                    }
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    0
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$notify({
                    title: '提示',
                    message: '全选功能正在升级中。。。',
                    type: 'success',
                    duration: 3000
                });
            },
            //编辑游戏
            handleEditGame(index, row) {
                this.$router.push({path: '/addGame', query: {data: row}});
            },
            //显示编辑游戏参数页面
            handleEditOption(index, row) {
                this.dialogFormVisible = true
                this.ruleForm = Object.assign({}, row)
            },
            //修改游戏配置参数
            updateForm(formName) {
                var self = this
                if(self.ruleForm.isCommon == true){
                    self.ruleForm.refGameId = self.gameId
                }
                let data = self.ruleForm
                let gameId = self.gameId
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        self.$ajax.put('wglobal/admin/option/',data).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '成功',
                                    message: '游戏配置参数修改成功！',
                                    type: 'success',
                                    duration: 1000
                                });
                            }
                            self.dialogFormVisible = false
                            self.dialogTableVisible = false
                            self.handleOptionList(gameId)
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
            //游戏配置分页查询
            currentChange() {
                var self = this;
                let gameId = self.gameId;
                self.handleOptionList(gameId);
            },
            // 查看游戏配置
            handleOptionList(gameId) {
                this.dialogTableVisible = true
                var self = this
                self.$ajax.post('wglobal/admin/option/page?size=10&page=' + self.currentPageData,
                    {
                        refGameId:gameId,
                        gkey:self.filters.gkey
                    }
                ).then(function (response) {
                    if (response.code === 1) {
                        self.optionData = response.data.content;
                        self.totalPages = response.data.totalPages;
                        self.gameId = gameId;
                    }
                })
            },
        }
    }
</script>

<style lang="stylus">

</style>


