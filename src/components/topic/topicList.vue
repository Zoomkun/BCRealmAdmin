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
                    prop="topicId"
                    label="题目ID"
                    :span="2">
            </el-table-column>
            <el-table-column
                    prop="difficulty"
                    label="题目难度"
                    :span="2">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="题目名称"
                    :span="12">
            </el-table-column>
            <el-table-column
                    prop="answerBox"
                    label="题目答案"
                    :span="3"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="correctRate"
                    label="题目正确率"
                    :span="2">
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
    // import bus from '@/js/event'

    export default {
        name:'topicList',
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
            //获取列表数据
            getData(){
                var self = this;
                self.$ajax.post('dbex/admin/topic/page?size='+ self.pageSize + '&page=' + self.currentPageData ,{}).then(function (response) {
                    if(response.code === 1){
                        self.tableData = response.data.content;
                        self.total = response.data.totalElements;
                        self.getAnswer()
                        self.getCorrectRate()
                    }
                })
            },
            // 正确率数据处理
            getCorrectRate(){
                var self = this;

                let content = self.tableData
                for(let i in content){
                    let correctRate = ''
                    if(content[i].correctRate > 0){
                        correctRate = (content[i].correctRate * 100).toFixed(2) + "%"
                    }else {
                        correctRate = 0
                    }

                    self.tableData[i].correctRate = correctRate
                }
            },
            // 答案数据处理
            getAnswer(){
                var self = this;

                let answerListData = self.tableData
                for(let i in answerListData){
                    let answerData = answerListData[i].answerList;
                    let answerBox = ''
                    for(let j in answerData){
                        if(answerData[j].isRightAnswer){
                            answerBox += answerData[j].answer +','
                        }
                    }

                    if(answerBox.length>0){
                        answerBox = answerBox.substring(0,answerBox.length-1)
                    }

                    self.tableData[i].answerBox = answerBox
                }
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
            handleDelete(index,row){
                var self = this
                self.$ajax.delete('dbex/admin/topic/'+row.topicId).then(function (response) {
                    if(response.code === 1){
                        self.tableData.splice(index,1)
                        self.$notify({
                            title:'提示',
                            message: '删除成功',
                            type: 'success',
                            duration:3000
                        });
                    }
                })
            },
            handleEdit(index,row){
                this.$router.push({path: '/addTopic', query: {data:row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


