<template>
  <div>
    <van-search
      show-action
      v-model="value"
      placeholder="OPPO Reno6"
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

    <h4>热门推荐</h4>
    <van-row
      type="flex"
      justify="space-around"
      gutter="5"
    >
      <van-col
        span="12"
        @click="goto(item.id)"
        v-for="item in goods_intro"
        :key="item.id"
        style="overflow:hidden"
      >
        <p>{{item.title}}</p>
      </van-col>

    </van-row>
  </div>
</template>
<script>
const items= [
        { text: "热门推荐" },
        { text: "OPPO" },
        { text: "OnePlus" },
        { text: "realme" },
        { text: "智能耳机" },
        { text: "智能穿戴" },
        { text: "智能电视" },
        { text: "原装配件" },
        { text: "日用百货" },
        { text: "数码周边" },
        { text: "家用电器" },
        { text: "个护健康" },
        { text: "家纺餐厨" },
        { text: "运动户外" },
        { text: "母婴亲子" },
        { text: "出行车品" }
      ]
export default {
    created(){
      let idx = parseInt(Math.random()*10)
     
        this.$request.get('/goods/category',{
            params:{
                category:items[idx].text,
            }
        }).then(({data})=>{
            this.goods_intro=data.data.length>10?data.data.slice(0,10):data.data
        })

       
    },
  name: "search",
  data() {
    return {
      active:true,
      value: "",
      goods_intro:[],
     
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    goto(id){
      console.log(id);
      this.$router.push('goods/id='+id)
    },
    onSearch(val) {
     
      this.$router.push('/searchresult?keyword='+val)

    },
  },
};
</script>

<style scoped>
h4 {
  font-size: 16px;
  font-weight: 500;
  height: 50px;
  line-height: 50px;
}
p {
  text-align: center;
  height: 35px;
  line-height: 35px;
  background-color: #ebedf0;
  border-radius: 20px;
  margin-top: 8px;
}
.erji {
  background-color: rgb(255, 102, 0);
}
</style>