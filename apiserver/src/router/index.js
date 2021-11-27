const { Router, json, urlencoded } = require('express');

const router = Router();
module.exports = router;

const userRouter = require('./user')
const goodsRouter = require('./goods')
const regRouter = require('./reg')
const loginRouter = require('./login')
const cartRouter = require('./cart')


// 跨域解决方案：CORS
const whitList = ['http://localhost:8080', 'http://172.20.10.3:8080', 'http://localhost:2000']
router.use((req, res, next) => {
    const currentOrigin = req.get('Origin');
    const has = whitList.includes(item => item !== currentOrigin)
    if (true) {
        res.set({
            'Access-Control-Allow-Origin': currentOrigin
        })

        // 处理复杂跨域中的预检请求
        if (req.method == "OPTIONS") {
            // res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
            // 设置响应头
            res.set({
                "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With,aa",
                "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS"
            });
            res.sendStatus(200); /*让options请求快速返回*/
        } else {
            next();
        }
    } else {
        next()
    }
})

// 处理请求体数据
router.use(
    urlencoded({ extended: false }), // name=value&name=value, qs,querystring
    json(),
)

// /api/user
router.use('/user', userRouter);
router.use('/goods', goodsRouter);
router.use('/reg', regRouter);
router.use('/login', loginRouter);
router.use('/cart', cartRouter);