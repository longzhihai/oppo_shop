<template>
  <div>
    <div
      style="margin-bottom: 20px"
      aria-label="Breadcrumb"
      role="navigation"
      class="el-breadcrumb"
    >
      <span class="el-breadcrumb__item"
        ><span role="link" class="el-breadcrumb__inner is-link">首页</span
        ><i class="el-breadcrumb__separator el-icon-arrow-right"></i></span
      ><span class="el-breadcrumb__item"
        ><span role="link" class="el-breadcrumb__inner is-link">用户管理</span
        ><i class="el-breadcrumb__separator el-icon-arrow-right"></i></span
      ><span class="el-breadcrumb__item" aria-current="page"
        ><span role="link" class="el-breadcrumb__inner">用户列表</span
        ><i class="el-breadcrumb__separator el-icon-arrow-right"></i
      ></span>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="selectItem"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="#" width="55"> </el-table-column>
        <el-table-column type="expand" width="55"> </el-table-column>
        <el-table-column prop="username" label="用户名">
          <template v-slot="{ row }">
            <strong>{{ row.username +( row.power?"(" + row.power + ")":"" )}}</strong>
          </template>
        </el-table-column>
        <el-table-column prop="regtime" label="注册时间" v-slot="{ row }">
          {{ formatDate(row.addtime) }}
        </el-table-column>
        <el-table-column label="操作" v-slot="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="editItem(row._id, row.username)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="removeItem(row._id)"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
      <div style="display: flex;">
        <el-pagination
          :page-size="size"
          layout="total, prev, pager, next,sizes"
          :total="total"
          @current-change="pageChange"
          @size-change="sizeChange"
        >
        </el-pagination>
        <el-button
          type="danger"
          round
          medium
          class="button3"
          plain
          size="small"
          @click="removeItems"
          >批量删除</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserList",
  data() {
    return {
      tableData: [],
      total: 0,
      size: 10,
      page: 1,
      multipleSelection: [],
      selectedIds: [],
    };
  },
  //监听
  watch: {
    $route(n, o) {
      this.getData();
    },
  },
  created() {
    console.log("List.created");
    this.getData();
  },
  updated() {
    console.log("List.updated");
  },
  methods: {
    reloads() {
      location.reload();
    },
    async getData() {
      console.log(2, this.size, this.page);
      const { data } = await this.$request.get("/user/list", {
        params: {
          page: this.page,
          size: this.size,
        },
      });
      this.tableData = data.data.data;
      this.total = data.data.total;
    },
    //页码
    pageChange(pageNum) {
      this.page = pageNum;
      this.getData();
    },
    // 大小
    sizeChange(size) {
      this.size = size;
      this.getData();
    },
    //格式化时间
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    //提示删除单个用户确认框
    delete(id) {
      this.$confirm("你确定要删除这条数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.remove(id);
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //删除数据库用户
    async remove(id) {
      const { data } = await this.$request.delete("/user/delete", {
        params: {
          id,
        },
      });
    },
    //删除单个用户
    removeItem(id) {
      this.delete(id);
    },
    //删除多个用户
    removeItems() {
      this.deletes();
    },
    //批量删除
    removes() {
      this.$request
        .delete("/user/deletes", {
          data: {
            queryArr: this.selectedIds,
          },
        })
        .then(({ data }) => {
          if (data.code === 200) {
            this.getData();
          }
        });
    },
    //提示删除多个用户确认框
    deletes(id) {
      this.$confirm("你确定要删除这些数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.removes(id);
          this.getData();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //进入编辑
    editItem(id, username) {
      // this.$router.push('/manage/user/edit/'+id)
      this.$router.push({
        name: "UserEdit",
        params: { id, username },
      });
    },
    //全选/与选择
    selectItem(val) {
      this.multipleSelection = val;
      this.selectedIds = [];
      this.multipleSelection.forEach((item) => {
        this.selectedIds.push(item._id);
      });
    },
  },
};
</script>
<style>
/* #app {
 
  height: 100%;
  overflow-y: visible;
}
#app .el-main {
  overflow-y: scroll !important;
} */

</style>