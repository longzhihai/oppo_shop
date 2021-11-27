<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜素框 -->
    <el-row style="margin-top:15px">
      <el-col :span="8"
        ><div class="grid-content bg-purple-dark">
        <el-input placeholder="请输入用户名"  class="input-with-select">
    <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
  </el-input>
        </div></el-col
      >
    </el-row>

    <!-- 表单  -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="#" width="100" type="index"> </el-table-column>
      <el-table-column label="订单编号" width="380">
        <template slot-scope="scope">
          <p>{{ scope.row._id }}</p>
        </template>
      </el-table-column>
      <el-table-column label="是否付款" width="100">
        <el-tag type="danger">{{ "未付款" }}</el-tag>
      </el-table-column>
      <el-table-column label="是否发货" width="100">
        {{ "否" }}
      </el-table-column>
      <el-table-column label="下单时间" width="200">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  name: "orderList",
  data() {
    return {
      value: "",
      total: 0,
      size: 20,
      page: 1,
      tableData: [],
    };
  },
  methods: {
    onSearch(val) {
      let keyword = val;
      this.$request.get("/goods/category/all").then(({ data }) => {
        let allGoods = data.data.data;
        console.log(allGoods);
        const reg = new RegExp(keyword, "i");
        allGoods.forEach((item) => {
          if (reg.test(item._id)) {
            let tem = [];
            tem.push(item);
            this.tableData = tem;
          }
        });
      });
    },
    reset() {
      this.getData();
      this.value = "";
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.tableData = this.tableData.filter((item) => {
        return item.id !== row.id;
      });
    },
    getData() {
      this.$request
        .get("/goods/category/all", {
          params: {
            page: this.page,
            size: this.size,
          },
        })
        .then(({ data }) => {
          this.tableData = data.data.data;
          this.total = data.data.total;
          console.log(this.tableData);
        });
    },
  },
};
</script>