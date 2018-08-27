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
                    <el-button type="primary" v-on:click="getData">查询</el-button>
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
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="registerNum"
                label="注册用户数">
            </el-table-column>
            <el-table-column
                prop="realRegister"
                label="真实注册用户数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="activeTotal"
                label="活跃用户数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="realActive"
                label="真实活跃用户数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="secondDay"
                label="次日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="thirdDay"
                label="三日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="seventhDay"
                label="七日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="fifteenthDay"
                label="十五日留存"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column    
                prop="thirtiethDay"
                label="三十日留存"
                show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChange"
            :page-size.sync="pageSizeData"
            @current-change="currentChange"
            :current-page.sync="currentPageData"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin-top: 20px">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "userStatistics",
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                pageSizeData: 10,
                total: 0,
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
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wuser/admin/user/statistics/page?size="+ self.pageSizeData + "&page=" + self.currentPageData,
                        {
                            startTime: this.filters.startTime,
                            endTime: this.filters.endTime
                        }
                    )
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData = response.data.content;
                            // self.totalPages = response.data.totalPages;
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
            sizeChange() {
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
