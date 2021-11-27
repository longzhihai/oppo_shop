<template>
  <div>
    <!-- 顶部导航区域 -->
    <van-nav-bar>
      <!-- 自定义内容 -->
      <template #left>
        <van-icon
          name="arrow-left"
          size="24"
          @click="gotoBack()"
          style="margin-right:8px"
        />
        <van-icon
          name="wap-home-o"
          size="24"
          @click="gotoHome()"
          style="margin-right:28px"
        />
        <van-tabs v-model="active">
          <van-tab title="商品详情"></van-tab>
          <van-tab title="用户评价"></van-tab>
          <van-tab title="参数及包装"></van-tab>
        </van-tabs>
      </template>

    </van-nav-bar>

    <!-- 商品图片轮播展示 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      height='375'
    >
      <van-swipe-item>
        <van-image
          width='100%'
          height='100%'
          :src='goodInfo.url'
        >
        </van-image>
      </van-swipe-item>
    </van-swipe>

    <!-- 倒计时区域 -->
    <van-row
      class='runTime'
      type="flex"
      justify="space-around"
      style='height:40px;background: linear-gradient(228deg,#ff4343,#ff8243);color:#fff'
      align='center'
    >
      <van-col
        span="4"
        style="font-size:14px;margin-left:0;text-align: center;
        background: hsla(0,0%,100%,.2);border-radius:15px;"
      >补贴价</van-col>
      <van-col span="4">￥{{goodInfo.price-250 || goodInfo.sales_price-250}}</van-col>
      <van-col
        span="16"
        style="font-size:14px;text-align:center"
      >
        <span>距离活动结束:</span>
        <van-count-down
          :time="time"
          style="display:inline-block"
        >
          <template #default="timeData">
            <span class="block">{{ timeData.hours }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.minutes }}</span>
            <span class="colon">:</span>
            <span class="block">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </van-col>
    </van-row>

    <!-- 商品基本参数 -->
    <van-row
      class='payload'
      type="flex"
      justify="space-around"
      align='center'
      style='height:83px;color:#ccc'
    >
      <van-col
        span="6"
        style="display:flex;flex-direction:column;align-items:center ;
"
      >
        <van-icon name="photograph" />
        <p class="mtb-2">摄像</p>
        <p>规格参数</p>
      </van-col>
      <van-col
        span="6"
        style="display:flex;flex-direction:column;align-items: center;
"
      >
        <van-icon name="photograph" />
        <p class="mtb-2">屏幕</p>
        <p>规格参数</p>
      </van-col>
      <van-col
        span="6"
        style="display:flex;flex-direction:column;align-items: center;
"
      >
        <van-icon name="photograph" />
        <p class="mtb-2">机身</p>
        <p>规格参数</p>
      </van-col>
      <van-col
        span="6"
        style="display:flex;flex-direction:column;align-items: center;
"
      >
        <van-icon name="photograph" />
        <p class="mtb-2">CPU</p>
        <p>规格参数</p>
      </van-col>
    </van-row>

    <!-- 商品信息 -->
    <van-row
      class="goodmsg"
      style="background:#fff;margin:8px"
    >
      <van-col style='padding:12px;box-sizing: border-box;'>
        <h4 style="font-size:16px;color:#333;font-weight:400;">{{goodInfo.title}}</h4>
        <div
          class='goodtxt'
          style="margin-top:10px；color:#666"
        >
          <font
            color='#f79a47'
            style="font-size:12px;margin-bottom:15px"
          >[OPPO官方商城]</font>
          <p class='fsz-12'>①[旗舰影像]双5000W像素主摄</p>
          <p class='fsz-12'>②[旗舰影像]双5000W像素主摄</p>
          <p class='fsz-12'>③[旗舰影像]双5000W像素主摄</p>
          <p
            class='fsz-12'
            style="color:#f79a47"
          >以旧换新最高额外补贴1380元>></p>
        </div>
        <p class='price'>￥{{goodInfo.price || goodInfo.sales_price}}</p>
        <p style="font-size:12px;color:orange;text-indent:18px">最高补贴3000元</p>

      </van-col>
    </van-row>

    <!-- 销售信息 -->
    <van-row
      class="salemsg"
      style="background:#fff;margin:8px;padding:0 12px;font-size:12px"
    >
      <div class="cuxiao">
        <h4 class='mt-2'>促销</h4>
        <div class="more mt-2">
          <p><span class="mr-2 lbox mb-2">立减</span><span>下单立减￥100</span></p>
          <p><span class="mr-2 lbox mb-2">分期</span><span>花呗分期12期免息</span></p>
          <p><span class="mr-2 lbox mb-2">积分</span><span>购买赠送积分</span></p>
        </div>
      </div>
      <van-divider :style="{ color: '#ccc', borderColor: '#ccc', padding: '0',margin:'0' }"></van-divider>
      <div class="lingquan">
        <van-cell
          title="领券"
          is-link
          value="OPPO手机优惠券"
          style="color:red"
        />

      </div>
    </van-row>

    <!--   选购配置 数量-->
    <van-row
      class="buyinfo sbox"
      style="margin:8px;padding:12px;color:#000"
    >
      <van-col
        span="4"
        style='line-height:32px'
      >颜色</van-col>
      <van-col
        span="18"
        style="display:flex;justify-content:space-around;"
      >
        <van-button
          type=''
          size='small'
          color="pink"
          style="margin-left:5px;"
        >夏日晴海</van-button>
        <van-button
          type=''
          size='small'
          color="pink"
        >夜海</van-button>
        <van-button
          type=''
          size='small'
          color="pink"
        >星河入梦</van-button>
        <van-button
          type=''
          size='small'
          color="pink"
        >星黛紫</van-button>
      </van-col>
      <van-col
        span="4"
        style='line-height:32px'
      >配置</van-col>
      <van-col
        span="18"
        style='line-height:32px'
      >
        <van-button
          type='primary'
          size='small'
        >选择您的配置</van-button>
      </van-col>
      <!-- 选择数量 -->
      <van-col
        span="4"
        style='line-height:32px'
      >数量</van-col>
      <van-col
        span="18"
        style='line-height:32px'
      >
        <van-stepper
          v-model="num"
          theme="round"
          button-size="20"
          :max="5"
          disable-input
        />
      </van-col>
    </van-row>

    <!-- 服务 -->
    <template class="goodserve mt-2">
      <van-cell
        title="保障服务"
        is-link
        value=""
        class='mb-2 sbox'
      />
      <van-cell
        title="尊享服务"
        is-link
        value=""
        class='mb-2 sbox'
      />
      <van-cell
        title="排行榜"
        is-link
        value=""
        class='mb-2 sbox'
      />
    </template>

    <!-- 搭配 -->
    <div class="duoduan sbox">
      <h4 style='font-weight:400;margin-left:10px'>
        <font class="fsz-14">超值搭配</font>
        <font class="fsz-12 ml-2">超值搭配最高省￥1370</font>
      </h4>
      <van-row
        gutter="20"
        style="display:flex;overflow-x:auto;overflow-y:hidden;white-space:nowrap
     ;margin-top:6px"
      >
        <van-col
          v-for="item in goodslist"
          :key="item.id"
          style="width:92px;height:143px;margin:0 10px;
      border: 1px solid rgba(0,0,0,.06);display:inline-block;padding:0;box-sizing:border-box"
        >
          <van-image :src='item.url' @click='goto(item.id)'></van-image>
          <h4 style="font-size:12px;overflow: hidden;    
text-overflow:ellipsis;    
whitewhite-space: nowrap;">{{item.title}}</h4>
          <p style='margin-top:4px'><span style="color: #f63434;">{{'￥'+item.sales_price}}</span>
            <del style='color: #b2b2b2;'>{{'￥'+parseInt(item.sales_price*1.25)}}</del>
          </p>
          <p>
            <input type="checkbox" style="float:right">
          </p>
        </van-col>
      </van-row>
    </div>

    <!-- 用户评价 -->
    <div
      class="sbox"
      style="height:100px;"
    >

    </div>

    <!-- 用户选择 -->
    <!-- 底部用户选择区域 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge='cartlist.length'
        @click='gotoCart()'
      />
      <van-goods-action-icon
        icon="shop-o"
        text="店铺"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click='addToCart(goodInfo.id)'
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buyNow(goodInfo.id)"
      />
    </van-goods-action>

  </div>
</template>

<script>

// let userInfo = localStorage.getItem('userInfo'); // null
// try {
//     userInfo = JSON.parse(userInfo) || [];
// } catch (err) {
//     userInfo = []
// }

export default {
  data() {
    return {
      data: {},
      goodInfo: {},
      goodslist: [],
      num: 1,
      active: 0,
      from_path: "",
      show: false,
      time: 120 * 60 * 60 * 1000,
      timeData: {
        hours: 120,
        minutes: 60,
        seconds: 60,
      },
    };
  },
  computed: {
    showlist() {
      return this.goodslist
        .filter((item) => item.id !== this.data.id)
        .slice(0, 6);
    },
    cartlist: {
      get() {
        return this.$store.state.cart.cartlist;
      },
      set(newVal) {
        this.$store.state.cart.cartlist = newVal;
      },
    },
    isLogin() {
      return this.$store.getters['user/isLogin']
    }
  },
  methods: {
    goto(id) {
      this.$router.push("id=" + id);
    },
    gotoCart() {
      this.$router.push("/cart");
    },
    gotoBack() {
      this.$router.back();
    },
    gotoHome() {
      this.$router.push("/home");
    },
    // 点击获取单个相关商品   及单个相关商品的相关商品
    getData(id) {
      // const id = goodsid || this.$route.params.id;
      // 判断用户从哪里跳转详情页（首页、分类页） 连接不同的接口渲染单个商品详情
      // let { id } = this.$route.params;
      if (id.indexOf("id") !== -1) {
        const newid = id.split("=");
        id = newid[1];
        this.$request.get("/goods/category/" + id).then((res) => {
          const { data } = res.data;
          this.goodInfo = data[0];
        });
      } else {
        this.$request.get("/goods/" + id).then((res) => {
          const { data } = res.data;
          this.goodInfo = data[0];
        });
      }
    },
    // 请求相关商品
    getList() {
      // axios 的传参方式  params通过url传参与Vue路由传参不同
      let idx = parseInt(Math.random() * 4);
      const random_category = ["智能耳机", "智能穿戴", "智能电视", "智能配件"];
      // console.log(random_category[idx]);
      this.$request
        .get("/goods/category", {
          params: {
            category: random_category[idx],
            size: 8,
          },
        })
        .then(({ data }) => {
          this.goodslist = data.data;
        });
    },
    // 添加至购物车
    addToCart() {
      if(this.isLogin) {
      const {
        id,
        title,
        price,
        sales_price,
        originalPrice,
        url,
      } = this.goodInfo;
      const current = this.cartlist.find((item) => item.id === id);
      if (current) {
        this.$store.commit("cart/changeQty", {
          id: id,
          qty: current.qty + this.num,
        });

          // 数据库
      } else {
        const goodsData = {
          id,
          title,
          price,
          sales_price,
          originalPrice,
          url,
          qty: this.num,
        };
        this.$store.commit("cart/add", goodsData);
        // 添加至数据库
          this.goodInfo.qty = 1
          this.goodInfo.username = JSON.parse(localStorage.getItem('userInfo')).username
          this.goodInfo.userId = JSON.parse(localStorage.getItem('userInfo'))._id
          console.log(this.goodInfo);
 //  添加至数据库
        this.$request.post('/cart',this.goodInfo).then(res=>console.log(res))
      }
      }else {
        confirm('请先登录')
        this.$router.push('/login')
      }

    },
    // 立即购买
    buyNow(id) {
      this.$router.push("/submit/" + id);
    },
  },
  // 路由变化之前触发
  beforeRouteUpdate(to, from, next) {
    let { id } = to.params;
    this.getData(id);
    this.getList();
    next();
  },
  created() {
    // 判断用户从哪里跳转详情页（首页、分类页） 连接不同的接口渲染单个商品详情
    let { id } = this.$route.params;
    if (id.indexOf("id") !== -1) {
      const newid = id.split("=");
      id = newid[1];
      this.$request.get("/goods/category/" + id).then((res) => {
        const { data } = res.data;
        this.goodInfo = data[0];
      });
    } else {
      this.$request.get("/goods/" + id).then((res) => {
        const { data } = res.data;
        this.goodInfo = data[0];
      });
    }
    // this.getData()
    // 获取搭配商品
    this.getList();
    // 隐藏父组件中的底部导航栏区域
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
#app {
  overflow-x: hidden;
}
body {
  background: #f7f8fa;
}
.fsz-12 {
  font-size: 12px;
  margin-bottom: 5px;
  color: #ccc;
}
.fsz-14 {
  font-size: 14px;
}
.swiper {
  display: flex;
  margin-bottom: 0.24rem;
  overflow-x: auto;
  overflow-y: hidden;
}
.price {
  color: #f63434;
  font-weight: 500;
  font-size: 16px;
  margin-top: 15px;
}
.item {
  width: 94px;
  height: 145px;
  /* background: #000; */
  margin-right: 8px;
}
p {
  font-size: 14px;
  line-height: 14px;
}
.sale {
  margin-top: 10px;
  height: 140px;
  padding: 8px;
}
.cuxiao {
  display: flex;
  height: 72px;
  margin-bottom: 15px;
}
.lingquan {
  height: 32px;
  margin-bottom: 15px;
}
.more {
  margin-left: 10px;
}
.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.sbox {
  margin: 8px;
  padding: 12px;
  background: #fff;
}
.quan {
  width: 71px;
  height: 20px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAA8CAYAAAAuRYXWAAADoElEQ…bPneqOOLfOhoG/Lj3LI5BuBIjquTp3uBzHB9rvT9LqfgFqbjXmOLvrTwAAAABJRU5ErkJggg==) 0 no-repeat !important;
  background-size: 100% 100% !important;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.lbox {
  color: #ff722c;
  background: #fff5e8;
  display: inline-block;
}
.mtb-2 {
  margin: 10px 0;
}
.ml-2 {
  margin-left: 10px;
}
.mb-2 {
  margin-bottom: 10px;
}
.mt-2 {
  margin-top: 10px;
}
.mr-2 {
  margin-right: 10px;
}
</style>