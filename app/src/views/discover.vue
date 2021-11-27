<template>
  <div>
    <!-- 搜索栏 -->
    <van-search placeholder="OPPO Reno6" disabled @click="goto('/search')" />

    <!-- 侧边导航栏 -->
    <van-tree-select
      height="560px"
      :items="items"
      :main-active-index.sync="active"
      @click-nav='index=>{
          this.req(items[index].text)
      }'
    >
    <!-- 商品展示区 -->
      <template #content>
        <div class="gehudianqi">
        <van-row v-for="(itema,idx) in category_small" :key='itema'>
        <h4>{{itema}}</h4>
        <van-col v-for="item in newGoods[idx]" style="float:none" :key='item.id'>
           <van-card
            class="goodCard"
            :desc='item.secondTitle'
            :origin-price="(item.originalPrice==='null')?'':item.originalPrice"
            :price="item.sales_price"
            :thumb-link="'#/goods/'+'id='+item.id"
            :title="item.title"
            :thumb="item.url"
            style="margin:8px;padding:12px"
          />
        </van-col>
        </van-row>
        </div>          
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  created() {
    this.req('热门推荐')
  },

  name: "Discover",

  data() {
    return {
      goods: [],
      active: 0,
      category_small:[],
      newGoods:[],
      category:'',
      items: [
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
      ],
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },  
    gototo(id){
        this.$router.push('goods/id='+id)
    },
    req(category){
        this.$request
      .get("/goods/category", {
        params: {
          category: category,
        },
      })
      .then(({ data }) => {
        this.category_small = []
        this.newGoods = []
        this.goods = data.data;
        this.goods.forEach(item=>{
          if(this.category_small.indexOf(item.category) === -1) {
            this.category_small.push(item.category)           
          }            
        })
        this.category_small.forEach((item,idx)=>{
             idx = []
          this.goods.forEach(i=>{
            if(i.category === item) {
              idx.push(i)              
            }
          })
          this.newGoods.push(idx)
          
        })
       
      });
    }
  },
};
</script>

<style scoped>
html,body{
  height: 100%;
}
.van-card__desc {
  margin-top: 15px;
}
.van-card__title {
  font-size: 14px;
   color: rgba(0,0,0,.85);
}
/* .goodCard {
      display: flex;
    align-items: center;
    height: 76px;
    margin-bottom: 8px;
    background: #f8f8f8;
    border-radius: 8px;
} */
</style>