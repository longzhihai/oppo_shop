<template>
  <NavbarPage title="收银台">
    <div class="top">
      <p class="aprice">{{parseInt(totalPrice)}}</p>
      <p class="tip">支付剩余时间
        <van-count-down
          :time="time"
          style="display:inline-block"
        >
          <template #default="timeData">
            <span class="num">{{ timeData.hours }}</span>
            <span class="font">:</span>
            <span class="num">{{ timeData.minutes }}</span>
            <span class="font">:</span>
            <span class="num">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </p>
    </div>
  </NavbarPage>
</template>

<script>
import NavbarPage from "../layout/NavbarPage";

export default {
  data() {
    return {
      totalPrice: 0,
      time: 120 * 60 * 60 * 1000,
      timeData: {
        hours: 120,
        minutes: 60,
        seconds: 60,
      },
    };
  },
  methods: {
    getAmount() {},
  },
  created() {
    const { amount } = this.$route.params;
    this.totalPrice = amount * 1;
  },
  components: {
    NavbarPage,
  },
};
</script>

<style>
.top {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 45px 24px 30px;
}
.aprice {
  color: red;
  font-weight: bolder;
  font-size: 22px;
}
.aprice::before {
  content: "￥";
}
.tip {
  display: inline-block;
  margin-top: 15px;
}
.num {
  background-color: transparent;
  color: #f63434;
  font-size: 16px;
}
.font {
  color: #f63434;
  margin: 0 1px;
  font-size: 16px;
}
</style>