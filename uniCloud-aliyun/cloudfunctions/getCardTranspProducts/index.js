'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});

exports.main = async (event, context) => {
  try {
    const validPages = ['makeup', 'skincare', 'bodycare']; // 可用页面类型
    const pageType = event.pageType;

    if (!validPages.includes(pageType)) {
      return {
        code: 400,
        message: '无效的页面参数',
        validPages, // 返回有效参数供前端参考
        suggest: '可用值:  skincare, makeup, bodycare'
      };
    }
    // 查询数据
    const cardTranspProductsRes = await db.collection('cardProductsTranp')
      .where({
        category: pageType
      }).get();
    const cardTranspProducts = cardTranspProductsRes.data;
    const productIds = cardTranspProducts.map(item => item.product_id);
    const productInfoRes = await db.collection('products')
      .where({
        product_id: db.command.in(productIds)
      })
      .orderBy('sort_order', 'asc') // 按照 sort_order 升序排序
      .get();
    const cardTranspProductInfo = productInfoRes.data;


    return {
      code: 200,
      message: '商品数据查询成功',
      data: cardTranspProductInfo,
      count: cardTranspProductInfo.length
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