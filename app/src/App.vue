<template>
  <div id="app">
    <router-view></router-view>
    <van-tabbar  route active-color="red" v-show="showTabbar">
      <van-tabbar-item
        v-for="item in menu"
        :key="item.text"
        :to="item.path"
        :icon="item.icon"
   :badge='item.path==="/cart" ? cartlist.length : "" '
        >{{item.text}}
        
       </van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: [
        {
          path: "/home",
          text: "首页",
          icon: "wap-home-o",
        },
        {
          path: "/discover",
          text: "分类",
          icon: "apps-o",
        },
        {
          path: "/cart",
          text: "购物车",
          icon: "cart-o",
        },
        {
          path: "/mine",
          text: "我的",
          icon: "manager-o",
        },
      ],
      showTabbar:true
    };
  },
  computed:{
    cartlist(){
      return this.$store.state.cart.cartlist
    },
    isLogin(){
      return this.$store.getters['user/isLogin']
    }
  }
 
};
</script>

<style>
.price del{color:#666;margin-right: 5px;}
.price del::before{
    content:'￥'
}
.price span{color:#f00}
.price span::before{
    content:'￥'
}
</style>
