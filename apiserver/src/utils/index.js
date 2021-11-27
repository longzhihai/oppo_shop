const crypto = require('crypto')

// 封装formatDate函数，用以生产返回前端的数据格式
function formatData(obj = {}) {
    let { code = 200, data = [], msg = 'success' } = obj
    if (code === 400 && msg === 'success') {
        msg = 'fail'
    }
    return {
        code,
        data,
        msg
    }
}

formatData.fail = function() {
    return formatData({ code: 400 })
}
formatData.success = function(data) {
    return formatData({ data })
}



//封装加密函数
function jiamiPassword(str, sf = 'sha256', out = 'hex') {
    // 加密
    // 1.以md5加密算法创建一个hash对象
    const hash = crypto.createHash(sf)
        // 2.加密数据
    hash.update(str)
        // 3.输出密文（hex,base64,Buffer）
    const res = hash.digest(out)

    return res

}

//封装一个可能有些值不传进来的函数，封装函数要懂得传参
function dataFilter(data,filter){
    let res = {}
    filter.forEach(item=>{
        let key = item
        let value = data[key];
        
        if(typeof item === 'object'){
            key = item.key;
            value = data[key]; 
            // 如果value得到undefined且item.default有值
            if(value === undefined && item.default !== undefined){
                value = item.default;
            }else{
                switch(item.type){
                    case 'number':
                        value = Number(value);
                        break;
                    case 'boolean':
                        value = ['false','0'].includes(value) ? false : true;
                        break;
                }

            }
        }
        
        if(value !== undefined){
            res[key] = value;
        }
        
    })
    return res;
}

module.exports = {
    formatData,
    jiamiPassword,
    dataFilter
}