<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
#app{height:100%;}
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}

.is-active {
  i {
    color: inherit !important;
  }
}
.price {
  margin: 5px 0;
  del {
    margin-right: 5px;
    color: #888;
    &::before {
      content: "￥";
    }
  }
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}
</style>