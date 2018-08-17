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
					<el-button type="primary" v-on:click="getData">查询</el-button>
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
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="totalRegister"
                    label="总注册用户数">
            </el-table-column>
            <el-table-column
                    prop="totalRealRegister"
                    label="总的真实注册数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="averageActivity"
                    label="平均活跃"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="avgSecondDay"
                    label="平均次日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="avgThirdDay"
                    label="平均三日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="avgSeventhDay"
                    label="平均七日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="avgFifteenthDay"
                    label="平均十五日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="avgThirtiethDay"
                    label="平均三十日留存"
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
  name: "userStatistics",
  data() {
    return {
      totalPages: 0,
      currentPageData: 1,
      tableData: [],
      multipleSelection: [],
      filters: {
        startTime: '',
        endTime:''
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      var self = this;
      self.$ajax
        .post(
          "user/statistics/total/page?size=20&page=" + self.currentPageData,
          {
              startTime:this.filters.startTime,
              endTime:this.filters.endTime
          }
        )
        .then(function(response) {
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
    currentChange() {
      console.log(this.currentPageData);
    }
  }
};
</script>

<style lang="stylus">
</style>