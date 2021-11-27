const {
    Router
} = require('express')
const router = Router()
module.exports = router
const db = require('../db')
const {
    formatData
} = require('../utils')
const { MongoClient, ObjectId } = require('mongodb');


// 多个商品 首页
router.get('/list', async(req, res) => {
    const {
        page = 1, size = 10, sort, category
    } = req.query;
    const skip = (page - 1) * size
    const limit = size * 1;

    const data = await db.find('oppo_home_goods', { bigCategory: category }, {
        skip,
        limit,
        sort,
    });
    res.send(
        formatData.success(data)
    )
})

// 多个商品 搜索
router.get('/search', async(req, res) => {
    const {
        page = 1, size = 10, sort
    } = req.query;
    const skip = (page - 1) * size
    const limit = size * 1;
    const data = await db.find('oppo_home_goods', { bigCategory: /OPPO/i }, {
        skip,
        limit,
        sort,
    });
    res.send(
        formatData.success(data)
    )
})

// 获取分类商品 分类页
router.get('/category', async(req, res) => {
    const {
        page = 1, size = 10, sort, category
    } = req.query;
    const skip = (page - 1) * size
    const limit = size * 1;
    const data = await db.find('oppo_category_goods', { bigCategory: category }, {
        skip,
        limit,
        sort,
    });
    res.send(
        formatData.success(data)
    )
})

// 获取所有商品
router.get('/category/all', async(req, res) => {
    const {
        page,
        size
    } = req.query;
    const skip = (page - 1) * size
    const limit = size * 1;
    console.log(page, size);
    const totalData = await db.find('oppo_category_goods', {});
    const total = totalData.length
    const data = await db.find('oppo_category_goods', {}, {
        skip,
        limit
    });

    res.send(
        formatData.success({ data: data, total: total })
    )
})

// 单个商品
router.get('/:id', async(req, res) => {
    const {
        id
    } = req.params;
    // const skip = (page - 1) * size
    // const limit = size * 1;
    // console.log('homeid=', typeof id, id);
    const data = await db.find('oppo_home_goods', { id: id });
    res.send(
        formatData.success(data)
    )
})

// 单个商品 分类页 oppo_category_goods
router.get('/category/:id', async(req, res) => {
    const {
        id
    } = req.params;
    // console.log('categoryid=', typeof id, id);
    const data = await db.find('oppo_category_goods', { id: id }, { limit: 1 });
    res.send(
        formatData.success(data)
    )
})

// 增加商品
router.post('/', async(req, res) => {
    console.log('data=', req.body);
    const {
        title,
        sales_price,
        originalPrice,
        url,
        secondTitle,
        category,
        views,
        qty,
    } = req.body.params.data
    const result = await db.create('oppo_category_goods', {
        title,
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

// 删除商品
router.delete('/', async(req, res) => {
    const { id } = req.query
    const result = await db.remove('oppo_category_goods', { id: id })
    res.send(result)
})

// 删除多个商品
router.delete('/deletes', async function(req, res) {
    const {
        queryArr
    } = req.body
    const Arr = queryArr.map(item => {
        return ObjectId(item)
    })
    let obj = {}
    obj.$in = Arr
    let obj2 = {}
    obj2._id = obj
    const result = await db.remove('oppo_category_goods', obj2)

    res.send(formatData({
        code: result.code
    }))
})

// 修改单个商品
router.put('/:id', async(req, res) => {
    const { id } = req.params
    const { data } = req.body.params
    console.log(req.body);
    const result = await db.update('oppo_category_goods', { id: id }, data)
    res.send(result)
})