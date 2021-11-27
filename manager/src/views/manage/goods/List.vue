<template>
  <div>
      <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage/goods/list' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 操作区域 -->
    <div style="margin-top:15px;margin-bottom:15px">
      <el-row type="flex" justify="space-between" >
          <!-- 搜索 -->
        <el-col :span="8" style="margin-right:20px">
            <el-input placeholder="请输入内容"  prefix-icon="el-icon-search" size="small">
                <el-button slot="append" >搜索</el-button>
            </el-input>
            
         </el-col
        >
        <!-- 操作 -->
        <el-col :span="16" style="text-align:right"
          ><div class="grid-content bg-purple-light">
              <el-upload style="display:inline-block;margin-right:5px" 
              action="https://jsonplaceholder.typicode.com/posts/">
            <el-button type="primary" size="small" plain
              ><i class="el-icon-download">导入</i></el-button
            >
            </el-upload>
            <el-button type="primary" size="small" plain
              ><i class="el-icon-upload2">导出</i></el-button
            >
            <el-button-group style='margin-left:20px'>
            <el-button type="primary" size="small" >批量上架</el-button>
            <el-button type="primary" size="small">批量下架</el-button>
            <el-button type="danger" size="small" @click="removeGoods">批量删除</el-button>
            </el-button-group>
          </div></el-col
        >
      </el-row>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%" @selection-change="selectItem">
        <!-- 复选框-->
      <el-table-column
      type="selection"
      v-model="checked"
      width="55">
    </el-table-column>
    <!-- 索引号 -->
      <el-table-column
      label="#"
      width="55"
      data='tableDate'
      type="index"
      >
    </el-table-column>
    <!-- 图片信息 -->
      <el-table-column label="图片" width="100" >
          <template v-slot="{ row }">
             
        <el-image
      style="width: 100px; height: 100px"
      :src='row.url'
      ></el-image>
          </template>
     
      </el-table-column>
      <!-- 文字信息 -->
      <el-table-column label="商品信息" width="180" style="text-align: left;">
        <template slot-scope="scope">
          <h4 style="margin-left: 10px">{{ scope.row.title}}</h4>
          <span style="margin-left: 10px">分类：</span>
          <el-tag size="small">{{scope.row.bigCategory||scope.row.category}}</el-tag>
          <div style="margin-left:10px;margin-top:10px">
              <del v-if="scope.row.originalPrice!=='null'">￥{{scope.row.originalPrice}}</del>
              <span style="margin-left: 10px;color:red">
                  {{!scope.row.sales_price?'免费领取':'￥'+scope.row.sales_price}}
                  </span>
              </div>
        </template>
      </el-table-column>
      <!-- 销量 -->
      <el-table-column label="销量" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <!-- 上下架 -->
      <el-table-column label="上下架" width="180">
        <template>
          <p style="margin:0" >已上架</p>
          <el-button type="primary" plain size="small">上架</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" round  @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            round
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
     <el-pagination
     background
      :page-size="size"
      layout="total, prev, pager, next,sizes"
      :total="total"
    @current-change="pageChange"
    @size-change="sizeChange"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "goodslist",
  created(){
      this.getData()
  },
  data() {
    return {
        checked:false,
      value: "",
      tableData: [],
       total:0,
        size:20,
        page:1,
        selectedIds:[]
    };
  },
  methods: {
     pageChange(pageNum) {
      this.page = pageNum;
      this.getData();
    },
    sizeChange(size) {
      this.size = size;
      this.getData();
    },
    getData(){
 this.$request.get('/goods/category/all',{
         params:{
              page:this.page,
              size:this.size
          }
    }).then(({data})=>{
      this.tableData=data.data.data
      this.total = data.data.total
     
    })
    },
    handleEdit(index, row) {
      this.$router.push('/manage/goods/edit/'+row.id)
    },

    handleDelete(index, row) {
      // 提示信息
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
          // 删除操作
           this.$request.delete('/goods', {
            params:{
                id:row.id
            }
        }).then(({data})=>{
            if(data) {
                this.tableData = this.tableData.filter(item=>{
                  return  item.id!==row.id
                })
            }
        })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      
    },
  
  //全选/与选择
    selectItem(val) {
      this.multipleSelection=val
      this.selectedIds=[]
       this.multipleSelection.forEach((item) => {         
        this.selectedIds.push(item._id);
      });
    },

  //批量删除
    removeGoods(){
      
 // 提示信息
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
          this.$request
        .delete("/goods/deletes", {
          data: {
            queryArr: this.selectedIds,
          },
        })
        .then(({ data }) => {
          if (data.code === 200) {
            this.getData();
          }
        });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
};
</script>

<style>
.cell {
    text-align: center;
}
</style>
