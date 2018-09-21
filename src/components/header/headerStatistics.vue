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
                prop="refGameId"
                label="游戏名称"
                :formatter="formatGameType"
                :span="2"
                show-overflow-tooltip>
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
                prop="reviveFrequency"
                label="复活人次"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="revivePeopleNumber"
                label="复活人数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="rewardQuantity"
                label="奖励数量"
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
                multipleSelection: [],
                gameData:[],    //游戏数据
            };
        },
        mounted() {
            this.getData();
            this.getGameData();
        },
        methods: {
            //游戏类型名称处理
            formatGameType(row, col) {
                var self = this
                let data = self.gameData;
                for(let i in data){
                    if(row.refGameId = data[i].id){
                        return data[i].gameName
                    }
                }
            },
            getData() {
                var self = this;
                self.$ajax
                    .post(
                        "wquestion/admin/header/statistics/page?size=20&page=" + self.currentPageData,
                        {}
                    )
                    .then(function (response) {
                        if (response.code === 1) {
                            self.tableData = response.data.content;
                            self.totalPages = response.data.totalPages;
                        }
                    });
            },
            getGameData(){
                var self = this;
                self.$ajax.get('wgame/admin/game/all').then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;             
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
                    title: "提示",
                    message: "全选功能正在升级中。。。",
                    type: "success",
                    duration: 3000
                });
            },
            currentChange() {
                this.getData()
            }
        }
    };
</script>

<style lang="stylus">
</style>
