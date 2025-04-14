'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});

exports.main = async (event, context) => {
  try {
    const skip = event.skip || 0;
    const limit = event.limit || 10;
    const productInfo = event.productInfo || {};
    const {
      product_id,
      main_category,
      sub_category
    } = productInfo;
    // console.log(productInfo)
    // 1. 首先查询同子分类的商品（排除当前商品）
    let productsRes = await db.collection('products')
      .where({
        main_category: main_category,
        sub_category: sub_category,
        product_id: db.command.neq(product_id)
      })
      .skip(skip)
      .limit(limit)
      .orderBy('sort_order', 'asc')
      .get();

    let products = productsRes.data;
    let loadedProductIds = products.map(product => product.product_id);

    // 2. 如果数量不足，查询同主分类但不同子分类的商品
    if (products.length < limit) {
      const remainingLimit = limit - products.length;

      const additionalProductsRes = await db.collection('products')
        .where({
          main_category: main_category,
          sub_category: db.command.nin([sub_category]), // 使用 nin 排除当前子分类
          product_id: db.command.nin(loadedProductIds) // 排除已加载的商品
        })
        .skip(skip)
        .limit(remainingLimit)
        .orderBy('sort_order', 'asc')
        .get();

      const newProducts = additionalProductsRes.data;
      products = products.concat(newProducts);
      loadedProductIds = loadedProductIds.concat(newProducts.map(p => p.product_id));
    }

    // 3. 如果数量仍不足，查询其他主分类的商品
    if (products.length < limit) {
      const remainingLimit = limit - products.length;

      const otherProductsRes = await db.collection('products')
        .where({
          main_category: db.command.nin([main_category]), // 使用 nin 排除当前主分类
          product_id: db.command.nin(loadedProductIds) // 排除已加载的商品
        })
        .skip(skip)
        .limit(remainingLimit)
        .orderBy('sort_order', 'asc')
        .get();

      products = products.concat(otherProductsRes.data);
    }

    // 获取品牌信息
    const brandIds = [...new Set(products.map(p => p.brand_id))];
    const brandsRes = await db.collection('brands')
      .where({
        _id: db.command.in(brandIds)
      })
      .get();

    const brandMap = brandsRes.data.reduce((acc, brand) => {
      acc[brand._id] = (brand.en_name || '').toUpperCase();
      return acc;
    }, {});

    const result = products.map(product => ({
      ...product,
      brand_en_name: brandMap[product.brand_id] || ''
    }));

    return {
      code: 200,
      message: '商品数据查询成功',
      data: result,
      count: result.length
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