const { Router } = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const { formatData, jiamiPassword } = require('../utils')

//api/reg
//注册接口
router.post('/', async(req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const result = await db.create('user', {
        username,
        password: jiamiPassword(password),
        addtime: new Date()
    })

    res.send(formatData({
        code: result.code
    }))
})

// api/reg/check
//检查接口
router.get('/check', async(req, res) => {
    const { username } = req.query;
    const data = await db.find('user', { username })
    if (data.length > 0) {
        res.send(formatData.fail())
    } else {
        res.send(formatData.success())
    }
})