const {
    Router
} = require('express')
const router = Router()
module.exports = router
const db = require('../db')
const {
    formatData
} = require('../utils')


// 获取购物车列表
router.get('/', async(req, res) => {
    const {
        userid
    } = req.query;
    // const skip = (page - 1) * size
    // const limit = size * 1;
    const totalData = await db.find('cart', { userId: userid });
    // const total = totalData.length
    // const data = await db.find('oppo_category_goods', {}, {
    //     skip,
    //     limit
    // });

    res.send(
        formatData.success(totalData)
    )

})

// 购物车增加商品
router.post('/', async(req, res) => {
    console.log('data=', req.body);
    const {
        username,
        userId,
        title,
        price,
        sales_price,
        originalPrice,
        url,
        secondTitle,
        category,
        views,
        qty,
    } = req.body
    const result = await db.create('cart', {
        username,
        userId,
        title,
        price,
        sales_price,
        originalPrice,
        url,
        secondTitle,
        category,
        views,
        qty,
    });
    res.send(
        result ?
        formatData.success() :
        formatData.fail()
    )

})

// 购物车删除商品
router.delete('/', async(req, res) => {
    const id = req.params

})

// 购物车修改商品数量
router.put('/', async(req, res) => {
    const id = req.params

})