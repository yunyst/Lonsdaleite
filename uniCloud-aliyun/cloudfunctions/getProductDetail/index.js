'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});

exports.main = async (event, context) => {
  try {
    const {
      product_id
    } = event

    const productInfoRes = await db.collection('products').where({
        product_id: product_id
      })
      .get();
    const productDetailRes = await db.collection('productsDetail').where({
        product_id: product_id
      })
      .get();

    const productInfo = productInfoRes.data[0]
    const productDetail = productDetailRes.data[0]
    const brandRes = await db.collection('brands')
      .where({
        _id: productInfo.brand_id // 查找多个品牌ID
      })
      .get();
    const brand = brandRes.data[0].en_name.toUpperCase()

    const product = {
      info: productInfo, // 产品基础信息
      detail: productDetail, // 产品详细信息
      brand_en_name: brand || '' //产品英文名
    }


    return {
      code: 200,
      message: '商品数据查询成功',
      data: product
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