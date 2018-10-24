<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" @submit.native.prevent>
                <span v-if="roleId == 1">
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
                </span>
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
                :formatter="dateFormat"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="refGameName"
                label="游戏名称"
                :span="2"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="totalRegister"
                label="总激活人数">
            </el-table-column>
            <el-table-column
                prop="averageActivity"
                label="平均活跃"
                show-overflow-tooltip>
            </el-table-column>
            <span v-if="roleId == 1">
                <el-table-column
                    prop="totalRealRegister"
                    label="真实激活数"
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
            </span>
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
        name: "gameTotalStatistics",
        data() {
            return {
                currentPageData: 1,
                total: 0,
                pageSize: 10,
                tableData: [],
                multipleSelection: [],
                filters: {
                    startTime: '',
                    endTime: '',
                    refGameId:''
                },
                gameData:[], //游戏列表
                roleId:JSON.parse($cookies.get('user')).roleId
            };
        },
        mounted() {
            this.getData();
            this.getGameData();
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
                let gameId = ''
                if((JSON.parse($cookies.get('user')).gameId) == null){
                    gameId = this.filters.refGameId
                }else {
                    gameId = JSON.parse($cookies.get('user')).gameId
                }
                self.$ajax
                    .post(
                        "wuser/admin/player/statistics/total/page?size=" + self.pageSize + "&page=" + self.currentPageData,
                        {
                            startTime: this.filters.startTime,
                            endTime: this.filters.endTime,
                            refGameId: gameId
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
