const {
    Router
} = require('express')

const router = Router();
module.exports = router;

const db = require('../db')
const {
    formatData,
    jiamiPassword
} = require('../utils')

//  api/login
//oppo用户登录接口
router.get('/', async(req, res) => {
    let {
        username,
        password
    } = req.query;
    //加密
    password = jiamiPassword(password);

    const result = await db.find('user', {
        username,
        password
    })
    res.send(
        formatData({
            data: result,
            code: result.length > 0 ? 200 : 400
        })
    )


})


//管理员后台登录接口
router.get('/user_vip', async(req, res) => {
    let {
        username,
        password
    } = req.query;
    //加密
    // password = jiamiPassword(password);
    console.log(req.query);
    const result = await db.find('user_vip', {
        username: username,
        password: password
    })

    console.log(111, result);
    res.send(
        formatData({
            data: result,
            code: result.length > 0 ? 200 : 400
        })
    )


})