<template>
  <div id="app" style="background-color: #fff">
    <div class="page" style="padding: 20px 0">
      <div
        class="header-userinfo-wrap"
        style="
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 0 12px;
        "
      >
        <div class="user-avator oc-image">
        <img
            src="../assets/img/touxiang.png"
            class="oc-image__img"
            style="height: 62px; width: 62px"
          />
        </div>
        <div
          class="user-container"
          style="
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 216px;
          "
        >
          <template v-if="isLogin">
            <div>用户名：{{parseInt(Math.random()*1000000000) }}</div>
            <div class="user-name" style="width: 200px">
              账      号：{{ userInfo.username }}
            </div>
          </template>
          <div v-else>
            <div class="user-name" style="font-size: 17px">登录账号</div>
            <div class="user-id" style="font-size: 13px; margin-top: 8px">
              体验更多功能
            </div>
          </div>
        </div>
        <template v-if="isLogin">
          <van-button block type="danger" size="small" @click="logout"
            >退出账号</van-button
          >
        </template>
        <van-button
          style="width: 64px !important"
          v-else
          round
          size="small"
          @click="gotologin"
          type="danger"
          >登录</van-button
        >
      </div>
      <div
        class="header-property oc-row"
        style="
          display: flex;
          justify-content: space-around;
          margin-bottom: 10px;
          font-size: 13px;
        "
      >
        <div
          class="oc-col oc-col--8"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <div class="property-value">--</div>
          <div class="property-name">优惠券</div>
        </div>
        <div
          class="oc-col oc-col--8"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <div class="property-value">--</div>
          <div class="property-name">回收代金券</div>
        </div>
        <div
          class="oc-col oc-col--8"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <div class="property-value">--</div>
          <div class="property-name">积分</div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-between; padding: 10px">
      <span style="font-size: 15px">我的订单</span
      ><span style="color: #666; font-size: 13px">全部订单&gt;</span>
    </div>
    <ul
      class="order-list__bd flexbox wrap"
      style="display: flex; justify-content: space-around"
    >
      <li class="order-item">
        <div class="order-item__bd">
          <van-icon class="g1" name="pending-payment" />
          <div class="list-name">待付款</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-icon name="paid" />
          <div class="list-name">待发货</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-icon name="peer-pay" />
          <div class="list-name">已发货</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-icon name="comment-o" />
          <div class="list-name">待评价</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-icon name="gold-coin-o" />
          <div class="list-name">退换/售后</div>
        </div>
      </li>
    </ul>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin-top: 20px;
      "
    >
      <span style="font-size: 15px">互动乐园</span>
    </div>
    <li class="column-item flexbox">
      <div class="column-title-wrap">
        <h4>新人福利</h4>
      </div>
      <div class="cart-item-banner oc-image">
        <img
          src="https://dsfs.oppo.com/archives/202111/2021110510115761849db52d57c.png?_w_=132&amp;_h_=132&amp;x-oss-process=image/format,webp"
          class="oc-image__img"
          style="object-fit: cover"
        />
      </div>
    </li>
    <div
      style="
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin-top: 20px;
      "
    >
      <span style="font-size: 15px">常用工具</span>
    </div>

    <ul class="order-list__bdss flexbox wrap">
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src="https://dsfs.oppo.com/archives/201912/201912020712185de4f76eba47b.png?x-oss-process=image/format,webp"
          />
          <div class="list-name">服务网点</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/201912/201912020712065de4f79ee379f.png?x-oss-process=image/format,webp"
          />
          <div class="list-name">保障服务</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/201912/201912020712335de4f7b9dcd4b.png?x-oss-process=image/format,webp"
          />
          <div class="list-name">真为查询</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/201912/201912020712115de4f7df611f6.png?x-oss-process=image/format,webp"
          />
          <div class="list-name">维修服务</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/202109/20210926020942615015aec6b9b.png?_w_=90&_h_=90&x-oss-process=image/format,webp"
          />
          <div class="list-name">收货地址</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/202109/2021092603093261501b085cce0.png?_w_=90&_h_=90&x-oss-process=image/format,webp"
          />
          <div class="list-name">回收单</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/202106/2021060211064460b6f768514e6.png?_w_=90&_h_=90&x-oss-process=image/format,webp"
          />
          <div class="list-name">学生优惠</div>
        </div>
      </li>
      <li class="order-item">
        <div class="order-item__bd">
          <van-image
            width="31"
            height="31"
            src=" https://dsfs.oppo.com/archives/202109/20210926020942615015aec6b9b.png?_w_=90&_h_=90&x-oss-process=image/format,webp"
          />
          <div class="list-name">地址</div>
        </div>
      </li>
    </ul>
    <!-- 底部 -->
    <div style="margin-top: 24px; margin-bottom: 70px">
      <ul style="display: flex; margin-bottom: 20px">
        <li
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 187px;
            font-size: 13px;
            line-height: 41px;
          "
        >
          <van-icon
            style="font-size: 13px !important"
            name="phone-circle-o"
          />下载app
        </li>
        <li
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            width: 187px;
            font-size: 13px;
            line-height: 41px;
          "
        >
          <van-icon style="font-size: 13px !important" name="contact" />登录账号
        </li>
      </ul>
      <ul
        class="license-privacy-user"
        style="
          display: flex;
          justify-content: space-around;
          font-size: 13px;
          margin-bottom: 10px;
        "
      >
        <li class="pointer">营业执照</li>
        <li class="pointer">隐私政策</li>
        <li class="pointer">用户协议</li>
      </ul>
      <div class="copyright-box" style="font-size: 12px; text-align: center">
        ©2005 - 2021 OPPO 版权所有 粤ICP备14056724号
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mine",
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
   
  },
  methods: {
    gotologin() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.commit("user/logout");
    },
    // suijishu(){
    //    parseInt(Math.round()*10000) 
    // }
  },
};
</script>
<style>
#app .flexbox {
  margin-top: 20px;
}
#app .order-item .order-item__bd {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

#app .order-item .order-item__bd {
  margin: 7.5px;
  line-height: 45px;
}

.van-icon {
  font-size: 24px !important;
  color: #666;
}
#app .column-item {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 172px;
  background-color: #f7f8fa;
  border-radius: 8px;
  margin-left: 10px;
}
#app .column-item img {
  width: 47px;
  height: 47px;
}

.list-name {
  font-size: 13px;
  color: #666;
}
.order-list__bdss {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 12px;
  margin-bottom: 30px;
}

.order-list__bdss .order-item {
  width: 87px;
  height: 63px;
}
</style>