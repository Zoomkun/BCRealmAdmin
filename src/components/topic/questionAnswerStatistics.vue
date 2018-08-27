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
                prop="startTime"
                label="开始时间">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间">
            </el-table-column>
            <el-table-column
                prop="participantsPeopleNumber"
                label="参与人数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="getRewardsPeopleNumber"
                label="获得奖励人数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="rewardQuantity"
                label="发送奖励数量"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="wrongQuestionId"
                label="错题率最高的题目ID"
                show-overflow-tooltip>
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
        name: "topicList",
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                multipleSelection: []
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
                        "dbex/admin/answer/statistics/page?size=20&page=" + self.currentPageData,
                        {}
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
                console.log(this.currentPageData);
            }
        }
    };
</script>

<style lang="stylus">
</style>
