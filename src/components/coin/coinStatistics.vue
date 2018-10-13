<template>
    <div>
        <el-col :span="20" class="toolbar" style="padding-bottom: 0px;">
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
                    <el-select v-model="filters.refCoinId" clearable filterable placeholder="请选择货币">
                        <el-option
                            v-for="item in coinData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
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
                prop="coinName"
                label="货币名称">
            </el-table-column>
            <el-table-column
                prop="coinRemain"
                label="货币余量"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="coinProduce"
                label="货币产出"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="obtainUserNum"
                label="获取人数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="checkoutAmount"
                label="提现总额"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="checkoutUser"
                label="提现人数"
                show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-size.sync="pageSize"
            :current-page.sync="currentPageData"
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
        name: "coinStatistics",
        data() {
            return {
                currentPageData: 1,
                pageSize: 10,
                total: 0,
                tableData: [],
                multipleSelection: [],
                filters: {
                    startTime: '',
                    endTime: '',
                    refGameId:''
                },
                coinData:[],//货币列表
            };
        },
        mounted() {
            this.getData();
            this.getCoinType();
        },
        methods: {
            //创建时间显示格式处理
            dateFormat:function(row) {
                var date = row.createTime;
                if (date == undefined) {
                    return "";
                }
                return moment(date).format("YYYY-MM-DD");
            },
            //获取奖励类型接口
            getCoinType() {
                var self = this;
                self.$ajax.get('wcoin/admin/coin/list').then(function (response) {
                    if (response.code === 1) {
                        self.coinData = response.data;
                    }
                })
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wcoin/admin/coin/statistics/page?size=" + self.pageSize + "&page=" + self.currentPageData,
                        {
                            startTime: this.filters.startTime,
                            endTime: this.filters.endTime,
                            refCoinId:this.filters.refCoinId
                        }
                    )
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData = response.data.list;
                            self.total = response.data.pages;
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
            sizeChange(val) {
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
