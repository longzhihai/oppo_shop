<template>
  <div class="login-page">
    <h1>OPPO商城后台管理系统</h1>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username" :error="errorMsg">
        <el-input type="text" v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :error="errorMsg">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <!-- <el-form-item label="验证码" prop="vcode">
        <el-input v-model="ruleForm.vcode">
          <template v-slot:append>
            <div v-html="vcodeSvg" class="vcode" @click="getVcode"></div>
          </template>
        </el-input>
      </el-form-item> -->
      <el-form-item>
        <el-checkbox label="下次免登陆" v-model="ruleForm.mdl"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click.prevent="submitForm"
          native-type="submit"
          >登录</el-button
        >
        <el-button type="text" @click="goto('/forgotpassword')"
          >忘记密码?</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import authRoutes from "../router/authRoutes";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        // vcode: "",
        mdl: true,
      },
      vcodeSvg: "",
      errorMsg: "",
      rules: {
        password: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "用户名必填",
            trigger: "blur",
          },
        ],
        vcode: [
          {
            required: true,
            message: "请填写验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {
    ...mapActions({
      login(dispatch, payload) {
        return dispatch("login", payload);
      },
    }),
    submitForm() {
      this.$refs["ruleForm"].validate(async (valid) => {
        // valid为校验结果，全部校验通过是值为true,否则为false
        if (valid) {
          //   const {data} = await this.$request.post('/login',this.ruleForm);
          //     console.log('data=',data)

          // this.$store.dispatch('login',this.ruleForm)
          console.log(99,this.ruleForm);
          const data = await this.login(this.ruleForm);
          console.log(88,data);
          if (data.code === 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });

            // 动态登录成功后，添加路由
            // this.$router.addRoute(authRoutes)
            // this.$store.commit('addRoute')

            // const { redirectTo = "/manage/home" } = this.$route.query;

            this.$router.replace('/manage/home').catch(err=>err)
          } else {
            if (data.code === 400) {
              this.$message({
                message: "用户名或密码错误",
                type: "error",
              });
            } 
            // else if (data.code === 401) {
            //   this.errorMsg = "用户名或密码错误";
            // }
            // this.getVcode();
          }
        }
      });
    },
    async getVcode() {
      const { data } = await this.$request.get("/vcode/picture");
      this.vcodeSvg = data.data;
    },
  },
  created() {
    // if (this.isLogin) {
    //   this.$router.replace({ name: "Home" });
    //   return;
    // }
    // this.getVcode();
  },
};
</script>
<style  lang="scss">
body {
  background:url(../assets/背景照片.jpg) no-repeat;
  background-size: cover;
}
.login-page {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 30px 50px 30px 30px;
  border-radius: 1em;
  background-color: rgba(255, 255, 255, 0.8);
  h1 {
    text-align: center;
  }
}
.el-input ::v-deep .el-input-group__append {
  padding: 0;
}

.vcode {
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 38px;
  /* padding: 0 10px; */
  /* background-color: #58bc58; */
}
// css选择器可以用  /deep/ 或 >>>，但sass不支持，需要用::v-deep
.vcode ::v-deep svg {
  position: absolute;
  top: -3px;
  left: -15px;
  height: 43px;
  
}
</style>