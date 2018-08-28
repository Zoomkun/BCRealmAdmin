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
                    prop="id"
                    label="游戏ID"
                    :span="2">
            </el-table-column>
            <el-table-column
                    prop="gameName"
                    label="游戏名称"
                    :span="2">
            </el-table-column>
            <el-table-column
                    prop="gameAddress"
                    label="游戏地址"
                    :span="12">
            </el-table-column>
            <el-table-column
                    prop="gameCode"
                    label="游戏编码"
                    :span="3">
            </el-table-column>
            <el-table-column 
                prop="status" 
                label="游戏状态" 
                :formatter="formatShow">
			</el-table-column>
            <el-table-column label="操作" :span="4">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="small"
                        @click="handleOptionList(scope.$index, scope.row)">查看配置
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    // import bus from '@/js/event'

    export default {
        name:'miningActivityList',
        data() {
            return {
                total:0,
                currentPageData:1,
                pageSize: 10,
                tableData: [],
                multipleSelection: [],
            }
        },
        mounted(){
          this.getData()
        },
        methods: {
            // 显示转换
            formatShow: function(row, column) {
                return row.status == 1 ? '开始' : '关闭';
            },
            //获取列表数据
            getData(){
                var self = this;
                self.$ajax.get('admin/game/all').then(function (response) {
                    if(response.code === 1){
                        self.tableData = response.data;
                    }
                })
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {0
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$notify({
                    title:'提示',
                    message: '全选功能正在升级中。。。',
                    type: 'success',
                    duration:3000
                });
            },
            currentChange(){
                this.getData()
            },
            handleSizeChange(val){
                this.pageSize = val
                this.getData()
            },
            handleEdit(index,row){
                this.$router.push({path: '/addGame', query: {data:row}});
            },
            // 查看游戏配置
            handleGameList(index, row) {
                this.dialogStatus = 'detail'
                this.dialogFormVisible = true
                var self = this
                self.$ajax.get('http://localhost:8000/admin/game/list?newsId='+ row.id).then(function (response) {
                    if(response.code === 1){
                        self.gameData = response.data;
                        self.newsId = row.id;
                    }
                })
            },
        }
    }
</script>

<style lang="stylus">

</style>


