<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="OPPO Reno6"
      @search="onSearch(value)"
    >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template>
      <template #left>
        <van-icon
          name="arrow-left"
          color="red"
          size="20px"
          @click="goBack()"
        />
      </template>
    </van-search>

    <van-row
      type="flex"
      justify="space-around"
      class="list"
      style="margin-top:15px"
    >
      <van-col
        span="10"
        v-for="(item,idx) in searchResult"
        :key="idx"
        class="goodCard"
      >
        <van-image
          width="150"
          height="150"
          :src="item.url"
          @click="goto(item.id)"
        />
        <h4
          style="font-weight:500;"
          class="ellipsis"
        >{{item.title}}</h4>
        <div
          style='font-size:12px;color:pink;border:1px solid skyblue;margin-top:5px'
          class="ellipsis"
          v-show="item.secondTitle"
        >{{item.secondTitle}}</div>
        <p style="margin-top:15px;margin-right:15px"><span>{{item.sales_price}}</span>
          <del>{{item.originalPrice==='null'?'':'￥'+item.originalPrice}}</del>
        </p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  created() {
    let { keyword } = this.$route.query;
    // 请求所有商品
    this.$request.get("/goods/category/all").then(({ data }) => {
      this.allGoods = data.data;
      console.log(keyword);
      const reg = new RegExp(keyword, "i");
      this.searchResult = [];
      this.allGoods.forEach((item) => {
        if (reg.test(item.title)) {
          this.searchResult.push(item);
        }
      });
      console.log(this.searchResult);
    });
  },
  name: "searchresult",
  data() {
    return {
      value: "",
      allGoods: [],
      searchResult: [],
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goto(id) {
      this.$router.push("goods/id=" + id);
    },
    onSearch(keyword) {},
  },
};
</script>

<style scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goodCard {
  width: 170px;
  height: 240px;
  padding: 9px;
  background-color: #fff;
}
del {
  font-size: 20px;
  margin-left: 5px;
}
h4 {
  font-size: 18px;
}
.list {
  text-align: center;
}
span {
  color: red;
  font-size: 14px;
}
p::before {
  content: "￥";
  color: red;
  font-size: 14px;
}
del {
  color: rgba(0, 0, 0, 0.3);
  font-size: 14px;
}
</style>