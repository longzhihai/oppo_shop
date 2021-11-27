<template>
  <div>
    <div style="text-align: right; margin-top: 15px; margin-right: 30px">
      <span style="font-size:14px; color: #7f7f7f; margin-right: 20px"
        >帮助中心</span
      >
      <span style="font-size:14px; color: #7f7f7f">简体中文</span>
    </div>

    <div>
      <p style="font-size: 20px; text-align: center; margin-top: 40px;margin-bottom: 30px">
        注册账号
      </p>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        :rules="[{ validator, message: '请输入正确手机号' }]"
        @input="check(username)"
      >
      </van-field>
      <div v-if="checkUse" style="text-align: center; font-size: 14px">
        <span style="color: red" v-if="unUseful">你的用户名已存在</span>
        <span v-else>你的用户名可用</span>
      </div>
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        :rules="[{ pattern, message: '请输入正确密码' }]"
      />

      <div class="yanzheng" style="width:400px;margin-top:20px;padding:0 10px">
        <input type="text" style="width:190px;height:20px;float:left;border-radius: 10px;margin-left:15px;margin-right:10px; outline: none;border: none;padding:10px 15px;   background-color:rgb(233 229 229) ; " placeholder="请输入验证码">
        <button style="width:100px;height:40px;outline: none;border: none;font-size:.33333rem;padding:10px 0;background-color:rgba(0,0,0,.15);border-radius: 10px;color: #fff;background-color: #2ad181;">获取验证码</button>
      </div>

      <div>
        <p
          style="
            font-size: 0.33333rem;
            color: rgba(0, 0, 0, 0.3);
            margin-left: 35px;
            margin-right: 10px;
            margin-top:20px;
          "
        >
          密码由 6-16 位数字、字母或符号组成、至少包含两种字符
        </p>
      </div>

      <div style="margin: 16px">
        <van-button
          style="background-color: #2ad181"
          round
          block
          type="info"
          native-type="submit"
          :disabled="regAble"
          >注册</van-button
        >
      </div>

      <div style="text-align: center;height:19px;line-height:10px;">
        <input type="checkbox" v-model="value" style="padding:5px 0 0 0" />
        <span style="font-size: 12px; margin-left: 10px"
          >已阅读并同意<a style="color:#2AD181">《账号使用协议》</a>&<a style="color:#2AD181">《隐私政策协议》</a></span
        >
      </div>
    </van-form>

    <div style="text-align: center; margin-top: 20px;font-size:14px;">
      已有账号，去<a href="javascript:;" @click="goto('/login')">登录</a>
    </div>

    <div>
      <p
        style="
          text-align: center;
          margin-top: 100px;
          font-size: 0.33333rem;
          color: #9b9b9b;
        "
      >
        © 2005 - 2021 广东欢太 版权所有 粤ICP备 14056724 号-2
      </p>
      <p style="text-align: center; font-size: 0.33333rem; color: #9b9b9b">
        联系方式：4001-999-666
      </p>
    </div>
  </div>
</template>

<script>
import { Checkbox } from "vant";
export default {
  name: "reg",
  data() {
    return {
      username: "",
      password: "",
      status: false,
      unUseful: true,
      regAble: true,
      checkUse: false,
      pattern: /^[0-9A-Za-z]{6,16}$/,
      value:false,

    };
  },
  methods: {
    validator(val) {
      return /^1[35789]\d{9}$/.test(val);
    },
    goto(url) {
      this.$router.push(url);
    },
    onSubmit(values) {
      console.log(this.username);

    //   if ((this.username && this.password) !== undefined) {
    //     this.username = true;
    //     this.password = true;
    //   }
      if (this.username && this.password && this.value) {
        this.$request.post("/reg", values).then(({ data }) => {
          console.log(data);
          if (data.code === 200) {
            this.$toast("注册成功");
            this.$router.push("/login");
          }
        });
      }
    },
    check(values) {
      this.$request.get("/reg/check?username=" + values).then(({ data }) => {
        if (data.code === 200) {
          this.checkUse = true;
          this.unUseful = false;
          this.regAble = false;
          let timer = setTimeout(() => {
            this.checkUse = false;
            clearTimeout(timer);
          }, 2000);
        } else {
          this.checkUse = true;
          this.unUseful = true;
          this.regAble = true;
        }
      });
    },
  },
};
</script>

<style>
/* div{
  
 
} */
</style>