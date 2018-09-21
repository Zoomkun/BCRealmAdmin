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
            }
        },
        mounted() {
            this.getData()
            this.getGameData()
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
                self.$ajax.post('wlottery/admin/lottery/page?page=' + self.currentPageData + "&pageSize=10",
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


