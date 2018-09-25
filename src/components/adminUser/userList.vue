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
                label="用户ID"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="userName"
                label=" 用户名"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="email"
                label=" 邮箱"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="flag"
                label="用户状态"
                :formatter="formatFlag"
                :span="12">
            </el-table-column>
            <el-table-column
                prop="lastLoginTime"
                label="最后登录时间"
                :span="2"
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
    </div>
</template>

<script>
    export default {
        name: 'userList',
        data() {
            return {
                tableData: [],
                multipleSelection: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            //用户状态
            formatFlag(row, col) {
                return row.flag == 1 ? '启用' : '禁用';
            },
            getData() {
                var self = this;
                self.$ajax.get('wadmin/admin/user/list').then(function (response) {
                    if (response.code === 1) {
                        self.tableData = response.data
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
            handleDelete(index, row) {
                var self = this
                self.$ajax.delete('wadmin/admin/user/' + row.id).then(function (response) {
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
                this.$router.push({path: '/addUser', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


