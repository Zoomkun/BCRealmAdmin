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
                prop="state"
                :formatter="formatStatus"
                label="活动状态"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="previewTime"
                label="预告时间"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="rewardCoinId"
                label="奖励类型"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="rewardTime"
                label="奖励时间间隔"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="stageGainMaxValue"
                label="阶段最大奖励值"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="totalRewardValue"
                label="总奖励值"
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
    // import bus from '@/js/event'

    export default {
        name: "miningActivityList",
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                multipleSelection: [],
                rewardTypeData: []
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            //活动状态数据处理
            formatStatus(row, column) {
                return row.state == 1 ? "未开始" : row.state == 2 ? "进行中" : "已结束";
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wplatform/admin/mining/activity/page?size=20&page=" +
                        self.currentPageData, {}
                    )
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData = response.data.content;
                            self.totalPages = response.data.totalPages;
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
            currentChange() {
                this.getData();
            },
            handleDelete(index, row) {
                var self = this;
                self.$ajax
                    .delete("wplatform/admin/mining/activity/" + row.activityId)
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData.splice(index, 1);
                            self.$notify({
                                title: "提示",
                                message: "删除成功",
                                type: "success",
                                duration: 3000
                            });
                        }
                    });
            },
            handleEdit(index, row) {
                this.$router.push({path: "/addMiningActivity", query: {data: row}});
            }
        }
    };
</script>

<style lang="stylus">
</style>


