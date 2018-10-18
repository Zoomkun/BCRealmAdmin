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
                label="消息Id"
                width="150"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="refGameName"
                label="游戏名称"
                width="200">
            </el-table-column>
            <el-table-column
                prop="messageTitle"
                label=" 消息标题"
                width="400"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="messageContent"
                label="消息内容"
                width="750"
                :span="4">
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
        name: 'messageList',
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                multipleSelection: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData() {
                var self = this;
                self.$ajax.post('wmessage/admin/message/page?size=20&page=' + self.currentPageData,
                    {}
                    ).then(function (response) {
                    if (response.code === 1) {
                        self.tableData = response.data.content
                        self.totalPages = response.data.totalPages
                    }
                })
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
                    title: '提示',
                    message: '全选功能正在升级中。。。',
                    type: 'success',
                    duration: 1500
                });
            },
            currentChange() {
                this.getData()
            },
            handleDelete(index, row) {
                var self = this
                self.$ajax.delete('wmessage/admin/message/' + row.id).then(function (response) {
                    if (response.code === 1) {
                        self.tableData.splice(index, 1)
                        self.$notify({
                            title: '提示',
                            message: '删除成功',
                            type: 'success',
                            duration: 1500
                        });
                    }
                })
            },
            handleEdit(index, row) {
                this.$router.push({path: 'message/addMessage', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


