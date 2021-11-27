const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
    // const db = require('db')


const {
    find,
    create,
    remove,
    update
} = require('../db')

superagent.get('https://www.heytap.com/cn/oapi/goods/web/info/search/keyword/040110?keyword=%E6%89%8B%E6%9C%BA&currentPage=1&pageSize=10')

.then((res) => {
    console.log(res);
    // const data = JSON.parse(res.text).data



    // data.map(item => {
    //         const category = item.category.name
    //         if (item.child === null) {
    //             item.category.goods.map(async item => {
    //                 const {
    //                     skuId,
    //                     spuName,
    //                     marketingText,
    //                     price,
    //                     mainImg
    //                 } = item
    //                 const sales_price = price.price
    //                 const originalPrice = price.originalPrice
    //                 const result = await create('oppo_category_goods', {
    //                     id: skuId,
    //                     title: spuName,
    //                     secondTitle: marketingText,
    //                     thirdTitle: '',
    //                     originalPrice,
    //                     sales_price,
    //                     url: mainImg,
    //                     category: category,
    //                     bigCategory: 'OnePlus'
    //                 })
    //             })
    //         } else {
    //             item.child.map(async item => {
    //                 const {
    //                     categoryCode,
    //                     name,
    //                     logo
    //                 } = item.category
    //                 const url = logo.mainPic
    //                 const result = await create('oppo_category_goods', {
    //                     id: categoryCode,
    //                     title: name,
    //                     url,
    //                     category: category,
    //                     bigCategory: '出行车品'
    //                 })
    //             })
    //         }
    //         console.log('数据导入成功');
    //     })


        
        /*  const name = data.name
         data.map(async item => {
             const {
                 skuId,
                 spuName,
                 marketingText,
                 price,
                 mainImg
             } = item
             const sales_price = price.price
             const originalPrice = price.originalPrice
             const result = await create('oppo_category_goods', {
                 id: skuId,
                 title: spuName,
                 secondTitle: marketingText,
                 thirdTitle: '',
                 originalPrice,
                 sales_price,
                 url: mainImg,
                 category: '',
                 bigCategory: '热门推荐'
             })
             console.log(result);
         }) */


        const data = JSON.parse(res.text).data

       console.log(8888888,data);
       data.map(item => {
           const name = item.name
           item.productDetailss.map(async item => {
               const {
                   id,
                   title,
                   originalPrice,
                   price,
                   url,
                   pricePrefix
               } = item
               const result = await create('phone', {
                   id,
                   title,
                   originalPrice,
                   price,
                   url,
                   pricePrefix,
                   category: name,
                   bigCategory: '日用百货'
               })
               console.log(result);
               console.log('数据导入成功');
           })


       }) 
})