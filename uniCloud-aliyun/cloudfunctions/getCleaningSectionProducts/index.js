'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});
exports.main = async (event, context) => {
  let sectionsRes = null;

  sectionsRes = await db.collection('cleaningSections').get();
  //板块数据
  const sections = sectionsRes.data;
  // 为每个板块查询相关的商品
  const sectionsWithProductInfo = [];
  for (let section of sections) {
    const productsRes = await db.collection('cleaningSectionProducts').where({
      section_id: section.section_id
    }).get();
    const products = productsRes.data;
    const productIds = products.map(item => item.product_id); // 获取所有product_id
    if (productIds.length > 0) {
      const productInfoRes = await db.collection('products')
        .where({
          product_id: db.command.in(productIds)
        })
        .get();

      const productInfo = productInfoRes.data;
      let brandIds = productInfo.map(product => product.brand_id);
      brandIds = [...new Set(brandIds)];
      // 批量查询所有品牌信息
      const brandsRes = await db.collection('brands')
        .where({
          _id: db.command.in(brandIds)
        })
        .get();
      const brandsMap = brandsRes.data.reduce((acc, brand) => {
        acc[brand._id] = brand.en_name ? brand.en_name.toUpperCase() : '';
        return acc;
      }, {});
      // console.log("test", brandsMap)
      // 将品牌信息添加到商品信息
      const productInfoWithBrand = productInfo.map(product => {
        product.brand_en_name = brandsMap[product.brand_id] || ''; // 如果品牌未找到，设置为空
        return product;
      });

      sectionsWithProductInfo.push({
        ...section,
        products: productInfoWithBrand // 将查询到的商品信息添加到板块数据中
      })
    } else {
      sectionsWithProductInfo.push({
        ...section,
        products: []
      })
    }
  }
  // return sectionsWithProductInfo
  return sectionsWithProductInfo

};