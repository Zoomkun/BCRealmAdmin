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
                prop="startTime"
                label="开始时间"
                :span="2"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="maxReward"
                label="最大奖励"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="minReward"
                label="最小奖励"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="surplusReward"
                label="剩余奖励"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="getRewardPeopleNumber"
                label="获奖人数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="activityId"
                label="活动Id"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" :span="4">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        @click="handleList(scope.row.activityId)">查看挖矿详情
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
        <!--查看详情界面-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width='50%'
                   :close-on-click-modal="true" center>
            <el-table
                ref="multipleTable"
                :data="detailsData"
                border
                tooltip-effect="dark"
                style="width: 100%;"
                :cell-style="{'text-align':'center'}"
                :header-cell-style="{'text-align':'center'}"
                @selection-change="handleSelectionChange">
                <el-table-column
                    prop="playerId"
                    label="玩家ID">
                </el-table-column>
                <el-table-column
                    prop="playerName"
                    label="昵称"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="power"
                    label="引力"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="rewardValue"
                    label="获得奖励"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="dialogFormVisible=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import moment from "moment"
    export default {
        name: "miningActivityStatistics",
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                detailsData: [],//挖矿详情数据
                multipleSelection: [],
                dialogStatus: '',
                textMap: {
                    detail: '玩家挖矿详情'
                },
                dialogFormVisible: false,
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
                        "wplatform/admin/mining/activity/page/statistics?size=20&page=" + self.currentPageData,
                        {
                            startTime: this.filters.startTime,
                            endTime: this.filters.endTime
                        }
                    ).then(function (response) {
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
            // 显示详情界面
            handleList(row) {
                this.dialogStatus = 'detail'
                this.dialogFormVisible = true
                var self = this
                self.$ajax.get('wplatform/admin/mining/activity/detail/' + row).then(function (response) {
                    if (response.code === 1) {
                        self.detailsData = response.data;
                    }
                })
            },
            currentChange() {
                this.getData()
            }
        }
    };
</script>

<style lang="stylus">
</style>
