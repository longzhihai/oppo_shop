<template>
  <div style="background: #f7f8fa;">
    <!-- 搜索框 -->
    <van-sticky>
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        disabled
        @click="gotoSearch"
      >
        <!-- 插槽 -->
        <template #action v-if="!isLogin">
          <div @click="gotologin">登录</div>
        </template>
      </van-search>
    </van-sticky>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="item in swiperList"
        :key="item.id"
        @click="gotoDetail(item.id)"
      >
        <van-image width="100%" height="100%" :src="item.url"></van-image>
      </van-swipe-item>
      <!-- <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item> -->
    </van-swipe>
    <!-- 功能区 -->
    <ul class="nav-icon-ul space-around">
      <li class="nav-item">
        <a
          href="https://danghuan.heytap.com/static/index.html#/?channelId=100010&utm_source=Mzhan&utm_medium=icon"
        >
          <img
            class="oc-image__img"
            src="https://dsfs.oppo.com/archives/202105/20210508050541609653b192b23.png?_w_=132&amp;_h_=132&amp;x-oss-process=image/format,webp"
          />
        </a>
        <div class="item-text-bottom">以旧换新</div>
      </li>
      <li class="nav-item">
        <a
          href="https://danghuan.heytap.com/static/index.html#/?channelId=100010&utm_source=Mzhan&utm_medium=icon"
        >
          <img
            class="oc-image__img"
            src="https://dsfs.oppo.com/archives/202105/202105080505036096543f689fd.png?_w_=132&amp;_h_=132&amp;x-oss-process=image/format,webp"
          />
        </a>
        <div class="item-text-bottom">赚积分</div>
      </li>
      <li class="nav-item">
        <a href="">
          <img
            class="oc-image__img"
            src="https://dsfs.oppo.com/archives/202110/202110151110146168fbde0dc67.png?_w_=132&amp;_h_=132&amp;x-oss-process=image/format,webp"
          />
        </a>
        <div class="item-text-bottom">智能硬件</div>
      </li>
      <li class="nav-item">
        <a href="https://www.opposhop.cn/app/download.html">
          <img
            class="oc-image__img"
            src="https://dsfs.oppo.com/archives/202105/20210508050534609653e699ca0.png?_w_=132&amp;_h_=132&amp;x-oss-process=image/format,webp"
          />
        </a>
        <div class="item-text-bottom">下载APP</div>
      </li>
    </ul>

    <!-- 大图列表区 -->
    <div style="padding: 10px">
        <van-row gutter="10">
        <van-col
          style=""
          span="12"
          v-for="item in datulist"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="170" height="107" :src="item.url" />
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="6">
          <van-image
            width="80"
            height="107"
            src="https://dsfs.oppo.com/archives/202111/2021111605114961937f71976c8.png?_w_=240&_h_=306&x-oss-process=image/format,webp"
        /></van-col>
        <van-col span="6">
          <van-image
            width="80"
            height="107"
            src="https://dsfs.oppo.com/archives/202111/2021111605114061937fe07815d.png?_w_=240&_h_=306&x-oss-process=image/format,webp"
        /></van-col>
        <van-col span="6">
          <van-image
            width="80"
            height="107"
            src="https://dsfs.oppo.com/archives/202111/20211112051128618e3a886cd42.png?_w_=240&_h_=306&x-oss-process=image/format,webp"
        /></van-col>
        <van-col span="6">
          <van-image
            width="80"
            height="107"
            src="https://dsfs.oppo.com/archives/202111/20211112051153618e3aa19b87a.png?_w_=240&_h_=306&x-oss-process=image/format,webp"
        /></van-col>
      </van-row>
    </div>
    <!-- 倒计时 -->
    <div style="margin-top: 20px">
      <van-count-down :time="time" style="padding: 0 10px">
        <template #default="timeData">
          <span style="margin-right: 5px">今日必抢</span>
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block" style="margin-right: 5px">{{ timeData.seconds }}</span>
          <span>后结束</span>
          <span style="margin-left: 120px">更多&gt;</span>
        </template>
      </van-count-down>
    </div>

    <!-- 今日必抢区 -->
    <ul
      style="
        display: flex;
        padding: 10px;
        height: 180px !important;
        overflow-x: scroll;
        overflow-y: hidden !important;

      "
    >
      <li v-for="item in activitylist" :key="item.id" style="width: 104px">
        <div style="text-align: center" @click="gotoDetail(item.id)">
          <van-image width="92" height="92" :src="item.url" />
        </div>
        <!-- <h5>{{ item.title }}</h5> -->
        <van-nav-bar
          :title="item.title"
        />
        <p class="price">
          <span>{{ item.price }}</span>
          <del>{{ item.originalPrice }}</del>
        </p>
      </li>
    </ul>
    <!-- 手机专区 -->
    <div style="display: flex; justify-content: space-between; padding: 10px">
      <span>手机专区</span><span>更多&gt;</span>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row gutter="10">
        <van-col
          style="height: 204px !important; border: 1px solid rgb(250, 246, 246)!important;"
          span="8"
          v-for="item in phonelist"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="115" height="116" :src="item.url" />
          </div>
          <p style="margin-top: 10px;margin-bottom: 10px">{{ item.title }}</p>
          <p class="price">
            <span>{{ item.price }}</span>
            <del>{{ item.originalPrice }}</del>
          </p>
        </van-col>
      </van-row>
    </div>
    <!-- 智能声学 -->
    <div style="display: flex; justify-content: space-between; padding: 10px">
      <span>智能声学</span>
    </div>
    <div style="padding: 10px">
      <van-row type="flex" justify="center">
        <van-col span="24">
          <van-image
            width="350"
            height="105"
            src="https://dsfs.oppo.com/archives/202108/202108230808546123940e3833a.png?_w_=1008&_h_=300&x-oss-process=image/format,webp"
        /></van-col>
      </van-row>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row gutter="10">
        <van-col
          style="height: 204px !important;border: 1px solid rgb(250, 246, 246)!important;"
          span="8"
          v-for="item in earphones"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="115" height="116" :src="item.url" />
          </div>
          <p>{{ item.title }}</p>
          <p class="price">
            <span>{{ item.price }}</span>
          </p>
        </van-col>
      </van-row>
    </div>
    <!-- 智能穿戴 -->
    <div style="display: flex; justify-content: space-between; padding: 10px">
      <span>智能穿戴</span>
    </div>
    <div style="padding: 10px">
      <van-row type="flex" justify="center">
        <van-col span="24">
          <van-image
            width="350"
            height="105"
            src="https://dsfs.oppo.com/archives/202108/20210823080826612393f2c1ebd.png?_w_=1008&_h_=300&x-oss-process=image/format,webp"
        /></van-col>
      </van-row>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row gutter="10">
        <van-col
          style="height: 220px !important;border: 1px solid rgb(250, 246, 246)!important;"
          span="8"
          v-for="item in wearlist"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="115" height="116" :src="item.url" />
          </div>
          <p style="margin-top: 10px;margin-bottom: 10px">{{ item.title }}</p>
          <p class="price">
            <span>{{ item.price }}</span>
          </p>
        </van-col>
      </van-row>
    </div>
    <!-- 智能电视 -->
    <div style="display: flex; justify-content: space-between; padding: 10px">
      <span>智能电视</span>
    </div>
    <div style="padding: 10px">
      <van-row type="flex" justify="center">
        <van-col span="24">
          <van-image
            width="350"
            height="105"
            src="https://dsfs.oppo.com/archives/202109/20210929120941615342f517351.png?_w_=1008&_h_=300&x-oss-process=image/format,webp"
        /></van-col>
      </van-row>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row gutter="10">
        <van-col
          style="height: 204px !important;border: 1px solid rgb(250, 246, 246)!important;"
          span="8"
          v-for="item in tvlist"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="115" height="116" :src="item.url" />
          </div>
          <p style="margin-top: 10px;margin-bottom: 10px">{{ item.title }}</p>
          <p class="price">
            <span>{{ item.price }}</span>
          </p>
        </van-col>
      </van-row>
    </div>
    <!-- 手机配件 -->
    <div style="display: flex; justify-content: space-between; padding: 10px">
      <span>手机配件</span>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row gutter="10">
        <van-col
          style="height: 204px !important;border: 1px solid rgb(250, 246, 246)!important;"
          span="8"
          v-for="item in phonepartslist"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="115" height="116" :src="item.url" />
          </div>
          <p style="margin-top: 10px;margin-bottom: 10px">{{ item.title }}</p>
          <p class="price">
            <span>{{ item.price }}</span>
          </p>
        </van-col>
      </van-row>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row type="flex" justify="center">
        <van-col span="24">
          <van-image
            width="350"
            height="105"
            src="https://dsfs.oppo.com/archives/202103/2021032205030160586105230ba.png?_w_=1008&_h_=300&x-oss-process=image/format,webp"
        /></van-col>
      </van-row>
    </div>
    <div style="padding: 10px;background: #fff;">
      <van-row gutter="10">
        <van-col
          style="height: 204px !important;border: 1px solid rgb(250, 246, 246)!important;"
          span="8"
          v-for="item in phonepartslist"
          :key="item._id"
        >
          <div style="text-align: center" @click="gotoDetail(item.id)">
            <van-image width="115" height="116" :src="item.url" />
          </div>
          <p style="margin-top: 10px;margin-bottom: 10px">{{ item.title }}</p>
          <p class="price">
            <span>{{ item.price }}</span>
          </p>
        </van-col>
      </van-row>
    </div>

    <!-- 底部 -->
    <div style="margin-top: 24px;margin-bottom: 70px;">
      <ul style="display: flex;  margin-bottom:20px ;">
        <li style="display: flex; justify-content: center; width: 187px;font-size:13px;">
          <van-icon style=" font-size: 13px !important;" name="phone-circle-o" />下载app
        </li>
        <li style="display: flex; justify-content: center; width: 187px;font-size:13px">
          <van-icon style=" font-size: 13px !important;" name="contact" />登录账号
        </li>
      </ul>
      <ul
        class="license-privacy-user"
        style="display: flex; justify-content: space-around;font-size:13px; margin-bottom:10px ;"
      >
        <li class="pointer">营业执照</li>
        <li class="pointer">隐私政策</li>
        <li class="pointer">用户协议</li>
      </ul>
      <div class="copyright-box" style="font-size:12px;text-align:center">
        ©2005 - 2021 OPPO 版权所有 粤ICP备14056724号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      value: "OPPO Reno6",
      activitylist: [],
      swiperList: [],
      phonelist: [],
      earphones: [],
      wearlist: [],
      tvlist: [],
      phonepartslist: [],
      datulist:[],
      time: 30 * 60 * 60 * 1000,
    };
  },
   computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    isLogin() {
      return this.$store.getters["user/isLogin"];
    },
  },
  methods: {
    //搜索
    gotoSearch() {
      this.$router.push({
        path: "/search",
        query: { value: this.value },
      });
    },
    gotologin() {
      this.$router.push("/login");
    },
    // 轮播图渲染
    getSwiperData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "首页轮播",
            size: 4,
          },
        })
        .then(({ data }) => {
          this.swiperList = data.data;
        });
    },
    // 今日必抢渲染
    getActivityData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "今日必抢",
          },
        })
        .then(({ data }) => {
          this.activitylist = data.data;
        });
    },
    // 手机专区渲染
    getPhoneData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "手机",
            size: 9,
          },
        })
        .then(({ data }) => {
          this.phonelist = data.data;
        });
    },
    // 智能声学
    getearphonesData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "智能声学",
            size: 9,
          },
        })
        .then(({ data }) => {
          this.earphones = data.data;
        });
    },
    // 智能穿戴
    getwearData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "智能穿戴",
          },
        })
        .then(({ data }) => {
          this.wearlist = data.data;
        });
    },
    // 智能电视
    getTvData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "智能电视",
          },
        })
        .then(({ data }) => {
          this.tvlist = data.data;
        });
    },
    // 手机配件
    getPhonepartsData() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "手机配件",
            size: 9,
          },
        })
        .then(({ data }) => {
          this.phonepartslist = data.data;
        });
    },
    // 大图列表
    getdatulist() {
      this.$request
        .get("/goods/list", {
          params: {
            category: "大大图",
          },
        })
        .then(({ data }) => {
          this.datulist = data.data;
        });
    },
    gotoDetail(id) {
      this.$router.push("/goods/" + id);
    },
  },
  created() {
    this.getSwiperData();
    this.getActivityData();
    this.getPhoneData();
    this.getearphonesData();
    this.getwearData();
    this.getTvData();
    this.getPhonepartsData();
    this.getdatulist();
  },
};
</script>


<style>
/* .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
} */
.nav-icon-ul {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  height: 99px;
  padding-bottom: 22px;
 
}
.nav-icon-ul .nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.nav-icon-ul .nav-item img {
  width: 45px;
  height: 45px;
 
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
  border: rgb(250, 246, 246);
}
</style>