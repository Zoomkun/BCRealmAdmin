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
                prop="freeProbability"
                label=" 免费概率"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="pointProbability"
                label=" 积分概率"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="rewardQuantity"
                label="奖励数量"
                :span="12">
            </el-table-column>
            <el-table-column
                prop="rewardType"
                label="奖励类型"
                :formatter="formatRewardType"
                :span="2"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="isImportant"
                label="是否重要"
                :formatter="isImportant"
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
        name: 'topicList',
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
            //计算奖励类型
            formatRewardType(row, col) {
                let data = ['算力', '积分', '经验', 'DBEX']
                return data[(row.rewardType - 1)]
            },
            isImportant(row, column) {
                return row.isImportant == 1 ? '是' : '否';
            },
            getData() {
                var self = this;
                self.$ajax.get('rewardSector/list').then(function (response) {
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
                self.$ajax.delete('rewardSector/' + row.id).then(function (response) {
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
                this.$router.push({path: '/addReward', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


