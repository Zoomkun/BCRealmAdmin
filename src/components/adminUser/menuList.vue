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
                label="菜单id"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="name"
                label=" 菜单名称"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="url"
                label=" 菜单路径"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="display"
                label="排列序号"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="parentName"
                label=" 所属父级"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="menuType"
                label=" 状态"
                :formatter="formatMenuType"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="status"
                label=" 状态"
                :formatter="formatStatus"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="powerList"
                label=" 菜单权限"
                :span="4">
            </el-table-column>
            <el-table-column label="操作" :span="4">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
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
            //菜单类型
            formatMenuType(row){
                let data = ['菜单', '链接网址', '隐藏链接']
                return data[(row.menuType)]
            },
            //菜单状态
            formatStatus(row) {
                return row.status == 1 ? '启用' : '禁用';
            },
            getData() {
                var self = this;
                self.$ajax.get('wadmin/admin/menu/list').then(function (response) {
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
            handleEdit(index, row) {
                this.$router.push({path: '/addMenu', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


