// const { ObjectId } = require('bson');
const {
    MongoClient,
    ObjectId
} = require('mongodb');
const express = require('express')
const mongo = require('../db')
const {
    formatData,
    dataFilter,
    jiamiPassword
} = require('../utils');
const router = express.Router()
module.exports = router;

// 获取用户列表
router.get('/list', async (req, res) => {
    const totalData = await mongo.find('user', {})
    let total = totalData.length
    // console.log(44, total);

    let {
        page = 1, size = 10
    } = req.query;
    const skip = (page - 1) * 10
    const limit = size * 1
    // console.log(22, page, size);
    const data = await mongo.find('user', {}, {
        skip,
        limit,
        projection: {
            password: 0
        }
    })
    // console.log(77, data);


    res.send(formatData.success({
        data,
        total

    }))
})

//删除单个用户
router.delete('/delete', async function (req, res) {
    const {
        id
    } = req.query
    const result = await mongo.remove('user', {
        _id: id
    })
    // console.log(55, result);
    res.send(formatData({
        code: result.code
    }))
})
//删除多个用户
router.delete('/deletes', async function (req, res) {
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
    const result = await mongo.remove('user', obj2)

    res.send(formatData({
        code: result.code
    }))
})

// 添加用户
router.post('/add', async function (req, res) {
    // const {
    //     username,
    //     password
    // } = dataFilter(req.body, ['username', 'password'])

    const {
        username,
        password,
        gender,
        power,
    } = req.body
    console.log(33, username, password, gender,
        power);

    const result = await mongo.create("user", {
        username,
        password: jiamiPassword(password),
        gender,
        power,
        addtime: new Date()
    })

    res.send(formatData({
        code: result.code
    }))
})

//修改用户
router.put("/edit", async function (req, res) {
    const {
        id,
        password,
        gender,
        power,
    } = req.body
    console.log(66, password, gender,
        power);

    const result = await mongo.update("user", {
        _id: id
    }, {
        $set: {
            password: jiamiPassword(password),
            gender: gender,
            power: power
        },
    })

    res.send(formatData({
        code: result.code
    }))
})


// 获取单个用户信息
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params
    const Ids = await mongo.find('user', {
        _id: id
    })
    res.send(formatData({
        data: Ids
    }))
})