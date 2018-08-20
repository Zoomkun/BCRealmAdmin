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
                prop="content"
                label="内容"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="gameId"
                label="游戏ID"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="gameName"
                label="游戏名字"
                show-overflow-tooltip>
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
                multipleSelection: [],
                filters: {
                    startTime: '',
                    endTime: ''
                },
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "news/page?page=" + self.currentPageData + "&pageSize=10",
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
                self.$ajax.delete('news/' + row.id).then(function (response) {
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
                console.log(this.currentPageData);
            }
        }
    };
</script>

<style lang="stylus">
</style>
