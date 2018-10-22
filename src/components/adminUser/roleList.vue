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
                label="角色id"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="name"
                label=" 角色名称"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="description"
                label=" 角色描述"
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
                        type="primary"
                        @click="handlePermissions(scope.$index, scope.row)">功能权限
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
        name: 'roleList',
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
            getData() {
                var self = this;
                self.$ajax.get('wadmin/admin/role/list').then(function (response) {
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
                self.$ajax.delete('wadmin/admin/role/' + row.id).then(function (response) {
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
                this.$router.push({path: '/user/addRole', query: {data: row}});
            },
            handlePermissions(index, row){
                this.$router.push({path: '/user/config', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


