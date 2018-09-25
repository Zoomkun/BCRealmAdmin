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
                    <el-select v-model="filters.refGameId" clearable placeholder="请选择游戏">
                        <el-option
                            v-for="item in gameData"
                            :key="item.id"
                            :label="item.gameName"
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
                width = "155"
                prop="createTime"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="refGameName"
                label="游戏名称"
                :span="2"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="registerNumber"
                label="激活人数">
            </el-table-column>
            <el-table-column
                prop="activeTotal"
                label="活跃用户数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="realActive"
                label="真实活跃数"
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
            <el-table-column
                prop="coinOutput"
                label="货币产出"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="coinRemain"
                label="货币余量"
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
    export default {
        name: "gameStatistics",
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
                gameData:[], //游戏列表
            };
        },
        mounted() {
            this.getData();
            this.getGameData();
        },
        methods: {
            getGameData(){
                var self = this;
                self.$ajax.get('wgame/admin/game/all').then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;
                    }
                })
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wuser/admin/player/statistics/page?size=" + self.pageSize + "&page=" + self.currentPageData,
                        {
                            startTime: this.filters.startTime,
                            endTime: this.filters.endTime,
                            refGameId:this.filters.refGameId
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
