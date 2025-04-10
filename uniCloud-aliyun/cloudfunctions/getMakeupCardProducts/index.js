'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});

exports.main = async (event, context) => {
  try {
    // 查询数据
    const cardProductsRes = await db.collection('makeupCard').get();
    const cardProducts = cardProductsRes.data;
    const productIds = cardProducts.map(item => item.product_id);
    const productInfoRes = await db.collection('products')
      .where({
        product_id: db.command.in(productIds)
      })
      .orderBy('sort_order', 'asc') // 按照 sort_order 升序排序
      .get();
    const cardProductInfo = productInfoRes.data;
    const brandIds = cardProductInfo.map(product => product.brand_id);

    // 4. 查询品牌表，获取所有品牌ID对应的品牌英文名称
    const brandsRes = await db.collection('brands')
      .where({
        _id: db.command.in(brandIds) // 查找多个品牌ID
      })
      .get();

    const brandMap = brandsRes.data.reduce((acc, brand) => {
      acc[brand._id] = (brand.en_name || '').toUpperCase(); // 通过品牌ID映射到品牌英文名称
      return acc;
    }, {});

    const cardProductInfoAll = cardProductInfo.map(product => ({
      ...product,
      brand_en_name: brandMap[product.brand_id] || '' // 若品牌未找到，设置为空
    }));
    return {
      code: 200,
      message: '商品数据查询成功',
      data: cardProductInfoAll,
      count: cardProductInfoAll.length
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