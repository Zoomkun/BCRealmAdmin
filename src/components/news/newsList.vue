<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                :span="2">
            </el-table-column>
            <el-table-column
                prop="id"
                width="200"
                label="新闻ID">
            </el-table-column>
            <el-table-column
                prop="title"
                width="400"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="isShow"
                label="是否显示"
                width="150"
                :formatter="formatShow">
            </el-table-column>
            <el-table-column
                prop="sourceType"
                label="来源渠道"
                width="180"
                :formatter="formatSourceType">
            </el-table-column>
            <el-table-column
                v-if="roleId == 1"
                prop="gameName"
                label="绑定游戏"
                width="250">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"
                width="200"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" :span="4">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button
                        v-if="scope.row.sourceType == 2 && scope.row.isExamine == 0 && roleId == 1"
                        size="mini"
                        type="primary"
                        @click="handleExamine(scope.row.id)">审核
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
    </div>
</template>

<script>
    export default {
        name: "news",
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                gameData: [],
                multipleSelection: [],
                dialogStatus: '',
                textMap: {
                    detail: '可绑定游戏列表'
                },
                dialogFormVisible: false,
                selectionList: [], // 列表选中列
                selectionListIds: [], // 列表选中列ID
                newsId:'',
                roleId:JSON.parse($cookies.get('user')).roleId
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            //新闻来源渠道转换
            formatSourceType:function(row){
                return row.sourceType == 1 ? "内部渠道" :"外部渠道";
            },
            // 显示转换
            formatShow: function (row, column) {
                return row.isShow == 0 ? '是' : '否';
            },
            disabled(row, column) {
                return row.disabled == false ? '是' : '否';
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wnews/admin/news/page?page=" + self.currentPageData + "&pageSize=10",
                        {
                            roleId : JSON.parse($cookies.get('user')).roleId,
                            gameId : JSON.parse($cookies.get('user')).gameId
                        }
                    )
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData = response.data.list;
                            self.totalPages = response.data.pages;
                        }
                    });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            // 全选单选多选
            selsChange(val) {
                this.selectionList = val
            },
            getId(data, key) {// 数据过滤
                let arr = [];

                if (!key) {
                    return;
                }

                for (let i in data) {
                    arr.push(data[i][key])
                }

                return arr;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$notify({
                    title: "提示",
                    message: "全选功能正在升级中。。。",
                    type: "success",
                    duration: 3000
                });
            },
            handleDelete(index, row) {
                var self = this
                this.$confirm('确认删除吗?', '提示', {
                    type: 'warning'
                }).then(function(){
                    self.$ajax.delete('wnews/admin/news/' + row.id).then(function (response) {
                        if (response.code === 1) {
                            self.tableData.splice(index, 1)
                            self.$notify({
                                title: '提示',
                                message: '删除成功',
                                type: 'success',
                                duration: 1500
                            })
                        }
                    })
                })
            },
            // 审核外部新闻
            handleExamine(row) {
                var self = this
                this.$confirm('确认审核通过吗?', '提示', {
                    type: 'warning'
                }).then(function(){
                    self.$ajax.post('wnews/admin/news/examine/' + row).then(function (response) {
                        if (response.code === 1) {
                            self.$notify({
                                title: '提示',
                                message: '审核成功',
                                type: 'success',
                                duration: 1500
                            })
                            self.getData();
                        }
                    })
                }).catch(function () {
                    console.log('error submit!!');
                    return false;
                })
            },
            handleEdit(index, row) {
                this.$router.push({path: '/news/addNews', query: {data: row}});
            },
            currentChange(){
                this.getData();
            },
            // 显示游戏列表
            handleGameList(row) {
                this.dialogStatus = 'detail'
                this.dialogFormVisible = true
                var self = this
                self.$ajax.get('wnews/admin/news/notjoinNewsGame/'+ row).then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;
                        self.newsId = row;
                    }
                })
            },
            //复选框(已经绑定的游戏禁用不可点击选择)
            checkboxT(row){
                return row.disabled;
            },
        }
    };
</script>

<style lang="stylus">
</style>
