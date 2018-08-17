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
                    prop="createTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="registerNum"
                    label="注册用户数">
            </el-table-column>
            <el-table-column
                    prop="realRegister"
                    label="真实注册用户数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="activeTotal"
                    label="活跃用户数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="realActive"
                    label="真实活跃用户数"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="secondDay"
                    label="次日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="thirdDay"
                    label="三日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="seventhDay"
                    label="七日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="fifteenthDay"
                    label="十五日留存"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="thirtiethDay"
                    label="三十日留存"
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
      multipleSelection: []
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
          "user/statistics/page?size=20&page=" + self.currentPageData,
          {}
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