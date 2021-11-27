const { ObjectID } = require('bson');
const { MongoClient, ObjectId } = require('mongodb');

const url = "mongodb://127.0.0.1:27017";
const dbname = 'OPPO-shop'

/**
 * 连接数据库
 * @returns {Object}    包含数据库对象与客户端对象组成的对象
 */
async function connect() {
    // 创建客户端对象
    const client = new MongoClient(url);

    await client.connect()

    // 切换数据库
    const db = client.db(dbname)

    return {
        db,
        client
    }
}

/**
 * 
 * @param {String} colname 集合名称
 * @param {Object|Array} data   插入的数据
 * @returns {code,ids,msg}
 */
async function create(colname, data) {
    const { db, client } = await connect()
    const col = db.collection(colname)
    let result;

    // create方法返回值
    let res = {
        code: 200,
        ids: []
    }
    try {
        // insertMany()/insertOne()返回Promise对象
        if (Array.isArray(data)) {
            result = await col.insertMany(data)
            for (let key in result.insertedIds) {
                res.ids.push(result.insertedIds[key])
            }
        } else {
            result = await col.insertOne(data)
            res.ids = [result.insertedId]
        }

    } catch (err) {
        res.code = 400
        res.msg = err;
    }
    client.close()
    return res
}

async function remove(colname, query = {}) {
    const { db, client } = await connect()
    const col = db.collection(colname)
    if (typeof(query._id) === 'string') {
        query._id = ObjectID(query._id)
    }
    let res;
    console.log('query', query);
    try {
        await col.deleteMany(query)
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}

async function update(colname, query = {}, data = {}) {
    const { db, client } = await connect()
    const col = db.collection(colname)

    if (query._id) {
        query._id = ObjectId(query._id)
    }
    let res;
    try {
        await col.updateMany(query, data)
        res = true;
    } catch (err) {
        res = false;
    }
    return res;

}
// update('user',{role:'vip'},{$set:{role:'svip'},$inc:{age:1}})

/**
 * 查询数据库
 * @param {String}      colname     集合名称
 * @param {Object}      query       查询条件
 * @returns {Array}                 查询结果
 */
async function find(colname, query = {}, { sort, skip, limit, projection } = {}) {
    const { db, client } = await connect()
    const col = db.collection(colname)
    if (query._id) {
        query._id = ObjectId(query._id)
    }
    let result = col.find(query, {
            projection
        })
        // 排序
    if (sort) {
        // sort='price'
        // sort='price,1'
        let [key, type = -1] = sort.split(',')

        result = result.sort({
            [key]: type
        })
    }

    // 跳过数量
    if (skip) {
        result = result.skip(skip)
    }

    // 限制数量
    if (limit) {
        result = result.limit(limit)
    }


    const data = await result.toArray()
        // 关闭连接，释放资源占用
    client.close();
    return data;
}

module.exports = {
    create,
    remove,
    update,
    find,
}