<template>
  <NavbarPage title="提交订单页" >
      <!-- 进度条 -->
    <van-steps :active="active">
      <van-step>购物车</van-step>
      <van-step>确认订单</van-step>
      <van-step>付款</van-step>
      <van-step>完成</van-step>
    </van-steps>

    <!-- 中间区域 -->
  <div style='padding:12px'>
    <!-- 收货地址 -->
    <van-row>
      <van-col class='common' span='24' style="height:47px" @click="addAdress" v-if="!this.adress">
       <van-icon name="plus" /> 新增收货地址
      </van-col>
      <van-col class='common' span='24' style="padding:20px 12px" @click="addAdress" v-else >
     <van-cell title="" is-link>
     <template #title>
    <span style="color:#333;font-weight:600;margin-right:10px">{{adress.name}}</span>
    <span style='color:#666'>{{adress.tel}}</span>
      <p style='margin-top:10px'>{{adress.province+adress.city+adress.county+adress.addressDetail}}</p>
  </template>
     </van-cell>
      </van-col>

      <!-- 订单信息 -->
      <van-col   v-for="item in submitList" :key='item.id'  class='common' span='24' style="min-height:154px">
        <van-card
            :num="item.qty"
            :origin-price="item.originalPrice==='null'?'':item.originalPrice"
            :thumb-link="'#/goods/'+item.id"
            style="width:100%;height:100%;background-color:#fff;padding:0px"
          
          >
          <template #thumb >
              <van-image :src='item.url' style="width:84px;height:84px;background-color: #f6f6f6"></van-image>
  </template>
          <template #title >
            <h4 style="margin-top:10px;font-size:18px;color:#333;font-weight:400">{{item.title}}</h4>
        </template>
          <template #price >
            <h4 style="font-size:18px;color:#f63434;font-weight:500">￥{{item.price || item.sales_price}}</h4>
        </template>
          <template #price >
            <h4 style="font-size:18px;color:#f63434;font-weight:500">￥{{item.price || item.sales_price}}</h4>
        </template>
         <template #footer >
     <van-tag plain type="danger" style='display:inline-block;text-align:center;margin:15px;'>赠品</van-tag>
    <span  style='margin:10px 130px 3px 0;overflow:hidden'>{{item.title.slice(0,4)}}入耳式蓝牙耳机{{Math.random().toFixed(2)}}mm口径</span>

  </template>
  
          </van-card>
      </van-col>

      <!-- 订单价格 -->
   
      <van-cell-group  :border='false' class='common' span='24' style="height:140px;flex-direction:column">
  <van-cell class="first" title="商品金额"  :value="'￥'+totalPrice/100"/>
  <van-cell title="运费" value=0 />
  <van-cell is-link title="优惠券" value='0.5元代金券' class='common' style="height:47px" />

  
</van-cell-group>
      <!-- 发票 -->
      <van-cell is-link title="发票" class='common' style="height:47px" />
    </van-row>
  </div>

<!-- 提交订单 -->
    <van-submit-bar
      :price="totalPrice"
      button-text="提交订单"
      @submit="onSubmit"
    >
    </van-submit-bar>
  </NavbarPage>
</template>

<script>
import NavbarPage from "../layout/NavbarPage";
import {updateStroage} from '@/utils'
import { Toast } from 'vant';

let adress = localStorage.getItem('adress')
try {
  adress = JSON.parse(adress)[0] || {}
}catch {
  adress = {}
}
export default {
  data() {
    return {
      active: 1,
      submitList:[],
      adress:adress
    };
  },
  components: {
    NavbarPage,
  },
  methods: {
    addAdress(){
      this.$router.push('/adress')
    },
    onSubmit() {
     Toast.loading({
     message: '订单生成中...',
      forbidClick: true,
});
setTimeout(a=>{
 this.$router.push('/payoff/'+this.totalPrice/100)
},1000)
    },
  },
  computed: {
    totalPrice() {
      return 100*this.submitList.reduce((val,item)=>val+(item.price || item.sales_price ||0.01)*item.qty,0
      )
    },
  },
//  beforeRouteEnter(to,from,next){
//    console.log(from);
//   if(from.name==='goods') {
//       console.log(this.submitList);
//   }
//    next()
//  },
  created() {
    // console.log(from);
    const {id} = this.$route.params
    console.log(id);
    if(id==='fromcart') {
    this.submitList = JSON.parse(localStorage.getItem('submitList'))
    }else {
    // this.submitList = JSON.parse(localStorage.getItem('submitList'))

      this.$request('/goods/'+id).then(({data})=>{
          // data.data[0].qty=1
        this.submitList = data.data
          
        })
      console.log(112);
    }
    this.$parent.showTabbar = false;
  },
  destroyed() {
    this.$parent.showTabbar = true;
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.first .van-cell__value span {
  color: #f63434;
  font-size:16px
}
.van-submit-bar__bar {
  justify-content: space-between!important;
}
.van-submit-bar__text {
  text-align: left!important;
}
.common {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 14px 12px;
  /* min-height: 47px; */
}
</style>