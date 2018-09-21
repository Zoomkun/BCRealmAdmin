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
                prop="difficulty"
                label="难度系数"
                :formatter="formatDifficulty"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="rewardIsForce"
                label="奖励算力"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="rewardQuestionNumber"
                label="奖励题数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="topicNumber"
                label="题目数量"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作" width="200px">
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
    export default {
        name: 'questionList',
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                multipleSelection: [],
                gameData:[],    //游戏数据
            }
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
            // 难度系数处理
            formatDifficulty(row, column) {
                let data = ['简单', '容易', '难', '较难', '非常难']
                return data[(row.difficulty - 1)]
            },
            getData() {
                var self = this;
                self.$ajax.post('wquestion/admin/question/page?size=20&page=' + self.currentPageData, {}).then(function (response) {
                    if (response.code === 1) {
                        self.tableData = response.data.content
                        self.totalPages = response.data.totalPages
                    }
                })
            },
            getGameData(){
                var self = this;
                self.$ajax.get('wgame/admin/game/all').then(function (response) {
                    if (response.code === 1) {
                        self.gameData = response.data;             
                    }
                })
            },
            handleEdit(index, row) {
                this.$router.push({path: '/addQuestion', query: {data: row}});
            },
            handleDelete(index, row) {
                var self = this
                self.$ajax.delete('wquestion/admin/question/' + row.id).then(function (response) {
                    if (response.code === 1) {
                        self.tableData.splice(index, 1)
                        self.$notify({
                            title: '提示',
                            message: '删除成功',
                            type: 'success',
                            duration: 3000
                        });
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
            },
            currentChange() {
                console.log(this.currentPageData)
            }
        }
    }
</script>

<style lang="stylus">

</style>
