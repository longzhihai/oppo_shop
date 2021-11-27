const path = require('path')
const express = require('express');
const router = require('./router')


const app = express();

// 静态资源
// 资源存在： 返回静态资源到浏览器
// 资源不存在： next()
app.use(express.static('../app'))

// 数据接口

app.use('/api', router)


const PORT = 2108;
app.listen(PORT, () => {
    console.log('server is running at port ' + PORT)
})