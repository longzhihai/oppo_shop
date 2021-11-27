const {
    Router
} = require('express')
const router = Router()
module.exports = router
const db = require('../db')
const {
    formatData
} = require('../utils')


// 获取订单列表
router.get('/order', async(req, res) => {
    const id = req.params

})



// 删除订单
router.delete('/order', async(req, res) => {
    const id = req.params

})