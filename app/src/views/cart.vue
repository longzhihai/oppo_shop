<template>
    <NavbarPage title="购物车">
        <!-- 编辑 -->
    <template #right>
      <!-- <van-icon name="edit" size="20" /> -->
      <van-icon
        name='edit'
        size='20'
        @click="edit=!edit"
      ></van-icon>
    </template>

    <!-- 进度条 -->
    <van-steps :active="active">
      <van-step>购物车</van-step>
      <van-step>确认订单</van-step>
      <van-step>付款</van-step>
      <van-step>完成</van-step>
    </van-steps>

    <!-- 购物车为空 -->
    <van-empty
      description="您的购物车空空如也"
      v-if="userData.length === 0"
    >
      <van-button
        round
        type='primary'
        size='small'
        @click="goto('/discover')"
      >去购物</van-button>
    </van-empty>
    
    <!-- 商品栏 -->
    <van-swipe-cell
      v-for="item in cartlist"
      :key="item.id"
      style="background-color:#fff;margin-top:15px"
    >
      <van-row
        type="flex"
        align="center"
        gutter=""
      >
        <!-- van-row 一共二十四列布局  span表示占二十四列的多少分-->
        <!-- 复选框 -->
        <van-col span="2">
          <van-checkbox
            :value="selectIds.includes(item.id)"
            @click="selectitem(item.id)"
          ></van-checkbox>
        </van-col>

        <!-- 商品信息栏 -->
        <van-col span="22">
          <van-card
            :num="item.qty"
            :origin-price="item.originalPrice==='null'?'' : item.originalPrice"
            :price="item.price || item.sales_price ||0.01"
            :thumb-link="'#/goods/'+item.id"
            :title="item.title"
            :thumb="item.url"
            style="margin:8px;padding:12px"
          >
            <template #num>
              <van-stepper
                v-model="item.qty"
                theme="round"
                button-size="20"
                :max="5"
                disable-input
                :name="item.id"
              />
            </template>
          </van-card>
        </van-col>
      </van-row>
      <template #right>
        <van-button
          text='删除'
          square
          style="height:100%"
          size='mini'
          type='danger'
          @click='removeitem(item.id)'
        >

        </van-button>
      </template>
    </van-swipe-cell>

    <!-- 分割线 -->
    <van-divider :style="{ color: '#ccc', borderColor: '#ccc', padding: '0',margin:'40px' }">为你推荐</van-divider>

    <!-- 推荐商品 -->
    <van-row gutter='10' type="flex" justify="space-around">
      <van-col
        class="goodCard"
        span="11"
        style="height:260px"
        v-for="item in recommendGoods"
        :key='item.title'   
      >
        <div
          style="text-align:center"
          @click="goto('goods/'+item.id)"
        >
          <van-image :src='item.url' />
        </div>
        <h4 style="font-size:16px;text-align:center;margin-bottom:8px">{{item.title}}</h4>
        <span v-show='item.secondTitle' style="margin-top:8px;color:rgba(243,65,65,.5);
        border:1px solid rgba(243,65,65,.5);background:#fff;
        font-size:12px;margin-left:25px">
        {{item.secondTitle}}</span>
        <p class="price" style="margin-left:30px">
         
          <span style="margin-right:8px">{{item.price || item.sales_price}}</span>
           <del v-show="item.originalPrice">{{item.originalPrice}}</del>
        </p>

      </van-col>
    </van-row>

    <!-- 提交选项 -->
    <van-submit-bar
    v-show="cartlist.length!==0"
      :disabled='disabled'
      :price="totalPrice"
      button-text="去结算"
      @submit="onSubmit"
    >
      <van-checkbox v-model="selectAll">全选</van-checkbox>

      <!-- 编辑选项 -->
      <template
        #button
        v-if="edit"
      >
        <div>
          <van-button
            size="mini"
            type="primary"
            plain
            round
          >加入收藏</van-button>
          <van-button
            size="mini"
            type="danger"
            plain
            round
            @click="removeitem(selectIds)"
          >批量删除</van-button>
        </div>
      </template>
    </van-submit-bar>
  </NavbarPage>
</template>


<script>
import NavbarPage from "@/layout/NavbarPage.vue";
import { Toast, Dialog } from "vant";
export default {
     name: "cart",
  data() {
    return {
      disabled:false,
      active: 0,
      edit: false,
      checked:false,
      selectIds: [],
      recommendGoods:[],
      submitList:{},
      userData:[]
    };
  },
  methods: {
    // 路由跳转
    goto(url) {
      this.$router.push(url);
    },
    // 获取购物车列表
    getCartList() {},
   
    // 推荐商品
    getLike(goodsid) {
      this.$request.get('/goods/list',{
        params:{
          category:'热门推荐'
        }
      }).then(({data})=>{
        this.recommendGoods = data.data
      })
    },
    // 选择商品
    selectitem(id) {
      const idx = this.selectIds.indexOf(id);
      if (idx >= 0) {
        this.selectIds.splice(idx, 1);
      } else {
        this.selectIds.unshift(id);
      }
    },
    // 删除单个商品
    removeitem(id) {
      if (typeof id === "string") {
        // 删除单个商品
        this.cartlist = this.cartlist.filter((item) => {
          return item.id != id;
        });
      } else {
        // 批量删除
        this.cartlist = this.cartlist.filter((item) => {
          return !this.selectIds.includes(item.id);
        });
      }
      this.$store.commit("cart/remove", { id: id });
    },
    // 清空购物车
    clearCart() {},
    // 提交订单
    onSubmit() {
     this.submitList =  this.cartlist.filter(item=>{
        if(this.selectIds.includes(item.id)) {
          return item
        }
      })

      localStorage.setItem('submitList',JSON.stringify(this.submitList))
     
      this.$router.push('submit/'+'fromcart');
    },
  },
  computed: {
    totalPrice() {
        let total = 0;
        this.cartlist.forEach(item=>{
            if(this.selectIds.includes(item.id)) {
                total+=(item.price || item.sales_price || 0.01)*item.qty
            }
        })
        return total*100
      // return 100*this.$store.getters['cart/totalPrice']
    },
    selectAll: {
      get() {
        return this.cartlist.every((item) => this.selectIds.includes(item.id));
      },
      set(newVal) {
        this.selectIds = newVal ? this.cartlist.map((item) => item.id) : [];
      },
    },
    cartlist: {
      get() {
        // 模块化vuex以后，$store.state包含了各个模块
        return this.$store.state.cart.cartlist;
      },
      set(newVal) {
        this.$store.state.cart.cartlist = newVal;
      },
    },
  },
  components: {
    NavbarPage,
  },
  created() {
      const id = JSON.parse(localStorage.getItem('userInfo'))._id
      this.$request.get('/cart',{
        params:{
          userid:id
        }
      }).then(({data})=>{
        this.userData = data.data
      })
      this.getLike()
  },
  beforeUpdate() {
      this.disabled = this.selectIds.length>0?false:true
    
  },
}
</script>


<style>
* {
    margin: 0;
    padding: 0;
}
body {
    background: #f7f8fa
}
.van-card__price {
    color: red;
}
.goodCard {
  background-color: #fff;
  margin-bottom: 8px;
  /* margin: 5px; */
}
.van-card__price-integer {
  color: red;
}
</style>