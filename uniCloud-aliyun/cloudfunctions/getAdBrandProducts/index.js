'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
})
exports.main = async (event, context) => {
  try {
    const validBrands = ['B0010', 'B0011', 'B0012'];
    const brand_id = event.brand_id || '';

    if (!validBrands.includes(brand_id)) {
      return {
        code: 400,
        message: '无效的页面参数',
        validBrands, // 返回有效参数供前端参考
        suggest: '可用值: B0010,B0011,B0012'
      };
    }
    const adBrandProductsRes = await db.collection('products')
      .where({
        brand_id: brand_id
      })
      .limit(10).orderBy('sort_order', 'asc')
      .get();
    const adBrandProducts = adBrandProductsRes.data
    const brandRes = await db.collection('brands')
      .where({
        _id: brand_id
      })
      .get();
    const brand = brandRes.data[0]
    const adBrandProductInfo = adBrandProducts.map(product => ({
      ...product,
      brand_en_name: brand.en_name.toUpperCase()
    }));

    console.log("dwaesfgrthyjukghfdsadfg", adBrandProductInfo)
    return {
      code: 200,
      data: adBrandProductInfo,
      length: adBrandProductInfo.length
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