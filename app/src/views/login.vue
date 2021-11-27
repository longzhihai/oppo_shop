<template>
  <div>
  
      <div style="text-align:right;margin-top:10px;margin-right:30px">
          <span style="font-size:14px;color:#7f7f7f;margin-right:25px">帮助中心</span>
          <span style="font-size:14px;color:#7f7f7f">简体中文</span>
      </div>

      <div style="display:flex; flex-direction: column; justify-content: center;">
          <h1 style="text-align:center;margin-top:30px">OPPO</h1>
          <p style="text-align:center;margin-top:10px;font-size:12px;margin-bottom:20px;">登录欢太帐号可享受更多的服务</p>
      </div>

      <div style="display:flex; justify-content: space-around; margin-bottom:20px;">
          <span>短信验证码登录</span>
          <span>密码登录</span>

      </div>
    
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
         name="username"
        label="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        name="password"
        label="密码"
        type="password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 18px">
        <van-button style="background-color:#2ad181"
          round
          block
          type="info"
          native-type="submit"
        >登录</van-button>
      </div>
    </van-form>
    <div style="text-align:center;">
    <a style="color: #2ad181;" href="javascript:;" @click="goto('/reg')">注册账号</a>
    </div>

    <div>
        <p style="text-align:center;margin-top:180px;color: #5a6e97;">隐私政策</p>
    </div>

    <div style="text-align:center;margin-top:10px;font-size:12px;color:#9b9b9b">
    <p style="font-size:12px;">© 2005 - 2021 广东欢太 版权所有 粤ICP备 14056724 号-2</p>
    <p style="font-size:12px;">联系方式：4001-999-666</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
       goto(url) {
      this.$router.push(url);
    },

    ...mapActions('user',{
      login:'login',
      login2:async function(dispatch,payload) {
        const data = await dispatch('login',payload)
         if(data.code === 200) {
        this.$toast('登录成功')
        console.log(this.$route.query);
        const {targetUrl='/mine'} = this.$route.query;
        console.log(targetUrl);
        this.$router.replace('/home')
       }else {
             this.$toast('用户名或密码错误')
           }
      }
    }),

   async onSubmit(values) {
        // 在此处调用user模块中的actions异步请求操作login
      //  const data = await this.$store.dispatch('login',values)
      //  console.log(data);
      //  if(data.code === 200) {
      //   this.$toast('登录成功')

      //   const {targetUrl='/mine'} = this.$route.query;
      //   this.$router.replace(targetUrl)
      //  }else {
      //        this.$toast('用户名或密码错误')
      //      }
      // console.log(values);
      this.login2(values)
    },
  },
};
</script>

<style>

</style>