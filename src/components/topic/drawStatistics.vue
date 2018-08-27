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
                prop="createTime"
                label="时间">
            </el-table-column>
            <el-table-column
                prop="drawTimes"
                label="每日抽奖次数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="userId"
                label="抽奖最多的玩家ID"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="maxDrawTimes"
                label="用户最多抽奖次数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" :span="4">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        @click="handleList(scope.$index, scope.row)">查看中奖详情
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
                :data="shadowData"
                border
                tooltip-effect="dark"
                style="width: 100%;"
                :cell-style="{'text-align':'center'}"
                :header-cell-style="{'text-align':'center'}"
                @selection-change="handleSelectionChange">
                <el-table-column
                    prop="sectorId"
                    label="扇区ID">
                </el-table-column>
                <el-table-column
                    prop="rewardType"
                    label="奖励类型"
                    :formatter="formatRewardType"
                    :span="2"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="rewardQuantity"
                    label="奖励数量"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="winningTimes"
                    label="中奖次数"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="sectorGetRate"
                    label="中奖比例"
                    show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </el-dialog>
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
                shadowData: [],
                multipleSelection: [],
                dialogStatus: '',
                textMap: {
                    detail: '奖励获得比率详情'
                },
                dialogFormVisible: false,
            };
        },
        mounted() {
            this.getData();
        },
        methods: {

            formatRewardType(row, col) {
                let data = ['算力', '积分', '经验', 'DBEX']
                return data[(row.rewardType - 1)]
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "dbex/admin/draw/statistics/page?size=20&page=" + self.currentPageData,
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
            // 显示详情界面
            handleList(index, row) {
                this.dialogStatus = 'detail'
                this.dialogFormVisible = true
                var self = this
                self.$ajax.get('dbex/admin/draw/statistics/' + row.id).then(function (response) {
                    if (response.code === 1) {
                        self.shadowData = response.data;
                        self.getSectorGetRate()
                    }
                })
            },

            // 正确率数据处理
            getSectorGetRate() {
                var self = this;

                let content = self.shadowData
                for (let i in content) {
                    let sectorGetRate = ''
                    if (content[i].sectorGetRate > 0) {
                        sectorGetRate = (content[i].sectorGetRate * 100).toFixed(2) + "%"
                    } else {
                        sectorGetRate = 0
                    }

                    self.shadowData[i].sectorGetRate = sectorGetRate
                }

            },
            currentChange(){
                this.getData()
            }
        }
    };
</script>

<style lang="stylus">
</style>
