<template>
    <NavbarPage title="新增地址页" >
   <van-address-edit
  show-postal
  show-delete
  show-set-default
  show-search-result
  :area-list="areaList"
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="content=>{
    this.onSave(content)}"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
</NavbarPage>
</template>

<script>
import NavbarPage from "../layout/NavbarPage";
import { areaList } from '@vant/area-data';
import {updateStroage} from '@/utils'

import { Toast } from 'vant';
let adressList = localStorage.getItem('adress')
try {
  adressList = JSON.parse(adressList) || {}
}catch {
  adressList = {}
}
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      
    };
  },
  methods: {
    onSave(content) {
      Toast('保存成功');
      // this.$router.back()
      adressList.push(content)
      updateStroage('adress',adressList)
      this.$router.back()
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '广州文化创意园',
            address: '广州千峰',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
  components:{
      NavbarPage
  }

};
</script>

<style>

</style>