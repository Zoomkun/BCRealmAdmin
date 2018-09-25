<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters" @submit.native.prevent>
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
                prop="freeSpan"
                label=" 免费概率"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="pointSpan"
                label=" 积分概率"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="rewardAmount"
                label="奖励数量"
                :span="12">
            </el-table-column>
            <el-table-column
                prop="weight"
                label=" 奖励重量"
                :span="4">
            </el-table-column>
            <el-table-column
                prop="refGameId"
                label="奖励类型"
                show-overflow-tooltip>
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
    export default {
        name: 'lotterySectorList',
        data() {
            return {
                totalPages: 0,
                currentPageData: 1,
                tableData: [],
                multipleSelection: [],
                gameData:[],    //  游戏数据
                filters: {
                    refGameId:''
                },
            }
        },
        mounted() {
            this.getData()
            this.getGameData()
        },
        methods: {
            isImportant(row, column) {
                return row.isImportant == 1 ? '是' : '否';
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
                self.$ajax.post('wlottery/admin/lottery/page?page=' + self.currentPageData + "&pageSize=10&gameId=" + this.filters.refGameId,
                    {}
                ).then(function (response) {
                    if (response.code === 1) {
                        self.tableData = response.data.list;
                        self.totalPages = response.data.pages;
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
                    title: '提示',
                    message: '全选功能正在升级中。。。',
                    type: 'success',
                    duration: 1500
                });
            },
            currentChange(){
                this.getData();
            },
            handleDelete(index, row) {
                var self = this
                self.$ajax.delete('wlottery/admin/lottery/' + row.id).then(function (response) {
                    if (response.code === 1) {
                        self.tableData.splice(index, 1)
                        self.$notify({
                            title: '提示',
                            message: '删除成功',
                            type: 'success',
                            duration: 1500
                        });
                    }
                })
            },
            handleEdit(index, row) {
                this.$router.push({path: '/addLotterySector', query: {data: row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


