'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
})
exports.main = async (event, context) => {
  try {
    const {
      brand_id
    } = event
    const res = await db.collection('brands')
      .where({
        _id: brand_id
      })
      .get();

    const countRes = await db.collection('products')
      .where({
        brand_id: brand_id
      })
      .get();
    const count = countRes.data;
    const brand = {
      ...res.data[0],
      count: count.length
    }
    // 3. 返回结果
    return {
      code: 200,
      data: brand,
    };
  } catch (err) {
    console.error('云函数错误:', err);
    return {
      code: 500,
      message: '服务器内部错误',
      error: err.message
    };
  }
};