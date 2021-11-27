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
        ><span role="link" class="el-breadcrumb__inner">用户编辑</span
        ><i class="el-breadcrumb__separator el-icon-arrow-right"></i
      ></span>
    </div>
    <div style="display: flex">
      <div style="width: 846px; margin-right: 20px">
        <form data-v-f7610db8="" class="el-form">
          <div
            data-v-f7610db8=""
            class="el-form-item el-form-item--feedback is-required"
          >
            <label
              for="username"
              class="el-form-item__label"
              style="width: 100px"
              >用户名</label
            >
            <div class="el-form-item__content" style="margin-left: 100px">
              <div data-v-f7610db8="" class="el-input is-disabled">
                <!----><input
                  type="text"
                  autocomplete="off"
                  class="el-input__inner"
                  disabled="disabled"
                  v-model="username"
                /><!----><!----><!----><!---->
              </div>
              <!---->
            </div>
          </div>
          <div data-v-f7610db8="" class="el-form-item el-form-item--feedback">
            <label
              for="password"
              class="el-form-item__label"
              style="width: 100px"
              >密码</label
            >
            <div class="el-form-item__content" style="margin-left: 100px">
              <div data-v-f7610db8="" class="el-input">
                <!----><input
                  type="password"
                  autocomplete="off"
                  class="el-input__inner"
                  v-model="password"
                /><!----><!----><!----><!---->
              </div>
              <!---->
            </div>
          </div>
          <div class="el-form-item el-form-item--feedback">
            <label for="role" class="el-form-item__label" style="width: 100px"
              >角色</label
            >
            <template>
              <el-select v-model="juese_value" placeholder="请选择">
                <el-option
                  v-for="item in options_juese"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </div>
          <div class="el-form-item el-form-item--feedback">
            <label for="role" class="el-form-item__label" style="width: 100px"
              >性别</label
            >
            <template>
              <el-select v-model="gender_value" placeholder="请选择">
                <el-option
                  v-for="item in options_gender"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </div>
          <div class="el-form-item el-form-item--feedback">
            <div class="el-form-item__content" style="margin-left: 100px">
              <template>
                <button
                  type="button"
                  class="el-button el-button--primary"
                  @click="getedit"
                >
                  <span>修改</span>
                </button>
              </template>
            </div>
          </div>
        </form>
      </div>
      <div>
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>       
        </el-upload>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserEdit",
  data() {
    console.log("$route", this.$route);
    return {
      password: "",
      username: this.$route.params.username || "",
      id: this.$route.params.id,
      imageUrl: "",
      juese_value: "普通会员",
      gender_value: "男",
      options_juese: [
        {
          value: "管理员",
          label: "管理员",
        },
        {
          value: "普通会员",
          label: "普通会员",
        },
        {
          value: "vip",
          label: "vip",
        },
      ],
      options_gender: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
        {
          value: "保密",
          label: "保密",
        },
      ],
    };
  },
  methods: {
    async getedit(id) {
      console.log(345, this.password, this.id);
      const { data } = await this.$request.put("/user/edit", {
        id: this.id,
        password: this.password,
        gender: this.gender_value,
        power: this.juese_value,
      });
      console.log(3489, data);
      if (data.code === 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.password = "";
      }
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>