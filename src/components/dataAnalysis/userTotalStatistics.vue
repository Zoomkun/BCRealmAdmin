<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" @submit.native.prevent>
                <el-form-item>
                    <el-date-picker
                        v-model="filters.startTime"
                        type="date"
                        placeholder="开始时间"
                        value-format="yyyy-MM-dd 00:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        v-model="filters.endTime"
                        type="date"
                        value-format="yyyy-MM-dd 23:59:59"
                        placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" v-on:click="getData">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table
            ref="multipleTable"
            border
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                :span="2">
            </el-table-column>
            <el-table-column
                prop="createTime"
                :formatter="dateFormat"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="totalRegister"
                label="总注册用户数">
            </el-table-column>
            <el-table-column
                prop="totalRealRegister"
                label="总的真实注册数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="averageActivity"
                label="平均活跃"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="avgSecondDay"
                label="平均次日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="avgThirdDay"
                label="平均三日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="avgSeventhDay"
                label="平均七日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="avgFifteenthDay"
                label="平均十五日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="avgThirtiethDay"
                label="平均三十日留存"
                show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="currentChange"
            :current-page.sync="currentPageData"
            :page-size.sync="pageSize"
            :page-sizes="[10, 20, 30, 50]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin-top: 20px">
        </el-pagination>
    </div>
</template>

<script>
    import moment from "moment"
    export default {
        name: "userStatistics",
        data() {
            return {
                currentPageData: 1,
                total: 0,
                pageSize: 5,
                tableData: [],
                multipleSelection: [],
                filters: {
                    startTime: '',
                    endTime: ''
                }
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            //创建时间显示格式处理
            dateFormat:function(row, column) {
                var date = row.createTime;
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wuser/admin/user/statistics/total/page?size=" + self.pageSize + "&page=" + self.currentPageData,
                        {
                            startTime: this.filters.startTime,
                            endTime: this.filters.endTime
                        }
                    )
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData = response.data.content;
                            self.total = response.data.totalElements;
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
            handleSizeChange(val) {
                this.pageSize = val
                this.getData()
            },
            currentChange() {
                this.getData()
            }
        }
    };
</script>

<style lang="stylus">
</style>
