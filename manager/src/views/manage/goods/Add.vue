<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/manage/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/manage/goods/list' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单区域 -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      style="margin-top:15px"
    >

      <!-- 商品名称 -->
      <el-form-item label="商品名称"
        prop="title"
      >
        <el-input v-model="form.title"></el-input>
      </el-form-item>

        <!-- 商品描述 -->
      <el-form-item label="商品描述">
        <el-input v-model="form.secondTitle"></el-input>
      </el-form-item>

      <!-- 商品分类 -->
      <el-form-item label="分类" prop="category">
        <el-select
          v-model="form.category"
          placeholder="请选择商品分类"
        >
          <el-option
            :label="item"
            :value="item"
            v-for="item in categorys"
            :key='item'
          ></el-option>

        </el-select>
      </el-form-item>

      <!-- 商品图片 -->
      <el-form-item label="商品图片" >
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :on-change='(file,fileList)=>{
              form.url=file.url;
              files=fileList
          }'
        >
          <i
            slot="default"
            class="el-icon-plus"
          ></i>
          <div
            slot="file"
            slot-scope="{file}"
          >
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            >
            <!-- 缩略图操作 -->
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
       <!--  <el-dialog :visible.sync="dialogVisible">
          <img
            width="100%"
            :src="form.url"
            alt=""
          >
        </el-dialog> -->
      </el-form-item>

      <!-- 商品价格 -->
      <el-form-item label="原价" >
          <el-row :gutter="20">
        <el-col :span=8>
          <el-input v-model="form.originalPrice"></el-input>
        </el-col>
        <el-col :span=12>
          <el-form-item label="销售价" prop="price">
            <el-input v-model="form.sales_price"></el-input>
          </el-form-item>
        </el-col>
          </el-row>
      </el-form-item>

      <!-- 商品数量 -->
      <el-form-item label="库存" >
        <el-col :span=8>
          <el-input-number
            v-model="form.qty"
            controls-position="right"
            @change="changeNum"
            :min="1"
            :max="10"
          >
          </el-input-number>
        </el-col>
        <el-col :span=12>
          <el-form-item label="浏览量" >
            <el-input-number v-model="form.views"></el-input-number>
          </el-form-item>
        </el-col>
      </el-form-item>

      <!-- 商品下架 -->
      <el-form-item label="下架">
        <el-switch v-model="form.unsale"></el-switch>
      </el-form-item>

      <!-- 提交 -->
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
        >添加商品</el-button>

      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: "GoodsAdd",
  data() {
    return {
        disabled:false,
        dialogVisible: false,
      form: {
        title: "",
        category: "",
        url:'',
        originalPrice: "",
        sales_price: "",
        qty:0,
        unsale: false,
        secondTitle:'',
        views:0,
        type: [],
        resource: "",
        desc: "",
        
      },
        files:[],
      categorys: [
        "热门推荐",
        "OPPO",
        "OnePlus",
        "智能耳机",
        "智能电视",
        "智能穿戴",
        "生活百货",
      ],
        rules: {
          title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入商品销售价格', trigger: 'change' }
          ],
          category: [
            {  required: true, message: '请选择商品分类', trigger: 'change' }
          ]
        }
    };
  },
  methods: {
    changeNum() {
      this.num++;
    },
    onSubmit() {
        // this.form.validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });
        this.$request.post('/goods',{
            params:{
                data:this.form
            }
        }).then(({data})=>{
            if(data.code===200) {
               this.$message({
              message: "添加成功",
              type: "success",
            });
            }
        })

    },
    handleRemove(file) {
        console.log(file);
    }
  },
};
</script>