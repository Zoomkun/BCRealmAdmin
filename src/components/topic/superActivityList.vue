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
                    prop="description"
                    label="活动描述"
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
                    prop="rewardType"
                    label="奖励类型"
                    :formatter="formatRewardType"
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
        name:'superActivityList',
        data() {
            return {
                totalPages:0,
                currentPageData:1,
                tableData: [
                    {
                        "activityId": 0,
                        "answerStatus": 1,
                        "answerTime": 0,
                        "description": "string",
                        "endTime": "2018-07-30T11:29:19.839Z",
                        "previewTime": "2018-07-30T11:29:19.839Z",
                        "questionNumber": 0,
                        "rewardQuantity": 0,
                        "rewardType": 1,
                        "startTime": "2018-07-30T11:29:19.839Z"
                    },
                    {
                        "activityId": 0,
                        "answerStatus": 2,
                        "answerTime": 0,
                        "description": "string",
                        "endTime": "2018-07-30T11:29:19.839Z",
                        "previewTime": "2018-07-30T11:29:19.839Z",
                        "questionNumber": 0,
                        "rewardQuantity": 0,
                        "rewardType": 2,
                        "startTime": "2018-07-30T11:29:19.839Z"
                    },
                    {
                        "activityId": 0,
                        "answerStatus": 0,
                        "answerTime": 0,
                        "description": "string",
                        "endTime": "2018-07-30T11:29:19.839Z",
                        "previewTime": "2018-07-30T11:29:19.839Z",
                        "questionNumber": 0,
                        "rewardQuantity": 0,
                        "rewardType": 3,
                        "startTime": "2018-07-30T11:29:19.839Z"
                    },
                    {
                        "activityId": 0,
                        "answerStatus": 0,
                        "answerTime": 0,
                        "description": "string",
                        "endTime": "2018-07-30T11:29:19.839Z",
                        "previewTime": "2018-07-30T11:29:19.839Z",
                        "questionNumber": 0,
                        "rewardQuantity": 0,
                        "rewardType": 4,
                        "startTime": "2018-07-30T11:29:19.839Z"
                    }
                ],
                multipleSelection: []
            }
        },
        mounted(){
            this.getData()
        },
        methods: {
            //活动状态数据处理
            formatStatus(row, column){
                return row.answerStatus == 1 ? '未开始' : row.answerStatus == 2 ? '进行中' : '已结束';
            },
            // 奖励类型
            formatRewardType(row, column){
                let data = ['算力', '积分','经验', 'DBEX']
                return data[(row.rewardType-1)]
            },
            getData(){
                var self = this;
                self.$ajax.post('activity/page?size=20&page=' + self.currentPageData ,{}).then(function (response) {
                    if(response.code === 1){
                        self.tableData = response.data.content
                        self.totalPages = response.data.totalPages
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
                    title:'提示',
                    message: '全选功能正在升级中。。。',
                    type: 'success',
                    duration:3000
                });
            },
            currentChange(){
                this.getData()
            },
            handleDelete(index,row){
                var self = this
                self.$ajax.delete('activity/'+row.activityId).then(function (response) {
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
                this.$router.push({path: '/topic.html/addSuperActivity', query: {data:row}});
            }
        }
    }
</script>

<style lang="stylus">

</style>


