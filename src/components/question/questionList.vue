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
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                :span="2">
            </el-table-column>
            <el-table-column
                prop="refGameName"
                label="游戏名称"
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
                prop="rewardValue"
                label="奖励数量"
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
            <el-table-column
                prop="difficultya"
                label="难度1题数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="difficultyb"
                label="难度1题数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="difficultyc"
                label="难度1题数"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="refRewardName"
                label="奖励类型"
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
                filters: {
                    startTime: '',
                    endTime: '',
                    refGameId:''
                },
            }
        },
        mounted() {
            this.getData();
            this.getGameData();
        },
        methods: {
            // 难度系数处理
            formatDifficulty(row, column) {
                let data = ['简单', '容易', '难', '较难', '非常难']
                return data[(row.difficulty - 1)]
            },
            getData() {
                var self = this;
                self.$ajax.post('wquestion/admin/question/page?size=20&page=' + self.currentPageData,
                    {
                        startTime: this.filters.startTime,
                        endTime: this.filters.endTime,
                        refGameId:this.filters.refGameId
                    }).then(function (response) {
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
                this.$router.push({path: '/question/addQuestion', query: {data: row}});
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
