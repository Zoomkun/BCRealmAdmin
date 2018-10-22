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
                label="新闻ID">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题">
            </el-table-column>
            <el-table-column
                prop="isShow"
                label="是否显示"
                :formatter="formatShow">
            </el-table-column>
            <el-table-column
                prop="sourceType"
                label="来源渠道"
                :formatter="formatSourceType">
            </el-table-column>
            <el-table-column
                prop="createTime"
                label="创建日期"
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
                        v-if="scope.row.sourceType == 1"
                        size="small"
                        @click="handleGameList(scope.row.id)">绑定游戏
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
        <!--绑定游戏页面-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='45%'
                   :close-on-click-modal="true" center>
            <el-table
                ref="multipleTable"
                :data="gameData"
                border
                tooltip-effect="dark"
                style="width: 100%;"
                :cell-style="{'text-align':'center'}"
                :header-cell-style="{'text-align':'center'}"
                @selection-change="selsChange">
                <el-table-column
                    width="100"
                    prop="id"
                    label="游戏ID">
                </el-table-column>
                <el-table-column
                    prop="gameName"
                    label="游戏名称"
                    :span="2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="gameCode"
                    label="游戏编码"
                    :span="2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    width="100"
                    prop="disabled"
                    label="是否已绑定"
                    :formatter="disabled"
                    :span="2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" :span="4" width="130">
                    <template slot-scope="scope">
                        <span v-if="scope.row.disabled == false">
                            <el-button
                                size="mini"
                                @click="delGames(scope.row.id)">解绑
                            </el-button>
                        </span>
                        <span v-if="scope.row.disabled == true">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addGames(scope.row.id)">绑定
                            </el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible=false">取消</el-button>
            </div>
        </el-dialog>
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
                            roleId : JSON.parse($cookies.get('user')).roleId
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
            //解绑游戏
            delGames(row) {
                var self = this;
                this.$confirm('确认解绑该新闻吗？', '提示', {
                    type: 'warning'
                }).then(function () {
                    let newsId = self.newsId;
                    self.$ajax.post('wnews/admin/news/del/news/join', {
                        newsId: newsId,
                        gameId: row
                    }).then(function (response) {
                        if (response.code === 1) {
                            self.$notify({
                                title: '提示',
                                message: '解绑成功',
                                type: 'success',
                                duration: 1000
                            })
                            self.dialogFormVisible = false
                            self.handleGameList(newsId)
                        }
                    })
                }).catch(function () {
                    console.log('error submit!!');
                    return false;
                })

            },
            //绑定游戏
            addGames(row) {
                var self = this;
                this.$confirm('确认绑定该新闻吗？', '提示', {
                    type: 'warning'
                }).then(function () {
                        let newsId = self.newsId;
                        self.$ajax.post('wnews/admin/news/news/join', {
                            newsId: newsId,
                            gameId: row
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '提示',
                                    message: '绑定成功',
                                    type: 'success',
                                    duration: 1000
                                })
                                self.dialogFormVisible = false
                                self.handleGameList(newsId)
                            }
                        })
                    }).catch(function () {
                     console.log('error submit!!');
                        return false;
                })

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
