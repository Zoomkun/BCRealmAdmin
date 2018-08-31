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
                        size="small"
                        @click="handleGameList(scope.$index, scope.row)">绑定游戏
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
                    type="selection"
                    :span="2">
                </el-table-column>
                <el-table-column
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
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="addGames()" :disabled="this.selectionList.length===0">确定</el-button>
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
                newsId: '',
                index: ''
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            // 显示转换
            formatShow: function (row, column) {
                return row.isShow == 1 ? '是' : '否';
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wuser/admin/news/page?page=" + self.currentPageData + "&pageSize=10",
                        {}
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
            //绑定游戏
            addGames() {
                var self = this;
                this.$confirm('确认绑定该新闻吗？', '提示', {
                    type: 'warning'
                })
                    .then(function () {
                        let data = self.getId(self.selectionList, 'id');
                        // data.push(self.newsId)
                        self.$ajax.post('wnews/admin/news/news/join', {
                            newsId: self.newsId,
                            gameId: data
                        }).then(function (response) {
                            if (response.code === 1) {
                                self.$notify({
                                    title: '提示',
                                    message: '绑定成功',
                                    type: 'success',
                                    duration: 1000
                                })
                            self.dialogFormVisible = false
                            self.getData()
                            }
                        })
                    }).catch(function () {
                    alert(0)
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
            },
            handleEdit(index, row) {
                this.$router.push({path: '/addNews', query: {data: row}});
            },
            currentChange() {

            },
            // 显示游戏列表
            handleGameList(index, row) {
                this.dialogStatus = 'detail'
                this.dialogFormVisible = true
                var self = this
                self.$ajax.get('wgame/admin/game/list?newsId=' + row.id).then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;
                        self.newsId = row.id;
                    }
                })
            },
        }
    };
</script>

<style lang="stylus">
</style>
