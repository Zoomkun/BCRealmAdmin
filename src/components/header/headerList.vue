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
                prop="answerStatus"
                :formatter="formatStatus"
                label="活动状态"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="answerTime"
                label="答题时长"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="previewTime"
                label="预告时间"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="questionNumber"
                label="问题数量"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="rewardQuantity"
                label="奖励数量"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="failedShareRate"
                label="参与奖比率"
                :span="4">
            </el-table-column>
            <el-table-column label="操作" :span="4">
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
    // import bus from '@/js/event'

    export default {
        name: 'headerList',
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                multipleSelection: [],
                gameData:[],    // 游戏数据
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
            //活动状态数据处理
            formatStatus(row, column) {
                return row.answerStatus == 1 ? '未开始' : row.answerStatus == 2 ? '进行中' : '已结束';
            },
            // 奖励类型
            formatRewardType(row, column) {
                let data = ['算力', '积分', '经验', 'DBEX']
                return data[(row.rewardType - 1)]
            },
            getData() {
                var self = this;
                self.$ajax.post('wquestion/admin/header/page?size=20&page=' + self.currentPageData,
                    {
                        startTime: this.filters.startTime,
                        endTime: this.filters.endTime,
                        refGameId:this.filters.refGameId
                    }
                    ).then(function (response) {
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$notify({
                    title: '提示',
                    message: '全选功能正在升级中。。。',
                    type: 'success',
                    duration: 3000
                });
            },
            currentChange() {
                this.getData()
            },
            handleDelete(index, row) {
                var self = this
                self.$ajax.delete('wquestion/admin/header/' + row.id).then(function (response) {
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
            handleEdit(index, row) {
                this.$router.push({path: 'header/addHeader', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


