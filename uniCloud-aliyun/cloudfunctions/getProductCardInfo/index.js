'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
});

exports.main = async (event, context) => {
  try {
    // 1. 参数验证与处理
    const validPages = ['cleaning', 'makeup', 'skincare', 'fragrance', 'male']; // 可用页面类型
    const pageType = event.pageType || 'cleaning'; // 默认显示cleaning精选页
    const skip = event.skip || 0; // 分页参数，跳过多少条
    const limit = event.limit || 10; // 分页参数，每页多少条

    if (!validPages.includes(pageType)) {
      return {
        code: 400,
        message: '无效的页面参数',
        validPages, // 返回有效参数供前端参考
        suggest: '可用值: cleaning, skincare, makeup, fragrance, male'
      };
    }

    // 2. 查询商品表数据（根据 pageType 筛选商品）
    let productsRes = null;
    if (pageType === 'cleaning') {
      // 如果是cleaning，则返回所有商品
      productsRes = await db.collection('products')
        .skip(skip) //跳过加载过的商品
        .limit(limit) // 限制每次加载limit个商品
        .get();
    } else {
      // 否则根据main_category筛选商品
      productsRes = await db.collection('products')
        .where({
          main_category: pageType // 根据页面类型筛选商品
        })
        .skip(skip) //跳过加载过的商品
        .limit(limit) // 限制每次加载limit个商品
        .get();
    }

    const products = productsRes.data;

    // 3. 获取商品的品牌ID列表
    const brandIds = products.map(product => product.brand_id);

    // 4. 查询品牌表，获取所有品牌ID对应的品牌英文名称
    const brandsRes = await db.collection('brands')
      .where({
        _id: db.command.in(brandIds) // 查找多个品牌ID
      })
      .get();

    // 5. 创建品牌ID与品牌英文名称的映射关系
    const brandMap = brandsRes.data.reduce((acc, brand) => {
      acc[brand._id] = (brand.en_name || '').toUpperCase(); // 通过品牌ID映射到品牌英文名称
      return acc;
    }, {});

    // 6. 将品牌英文名称与商品数据合并
    const productsWithBrand = products.map(product => ({
      ...product,
      brand_en_name: brandMap[product.brand_id] || '' // 若品牌未找到，设置为空
    }));

    // 7. 返回商品数据
    return {
      code: 200,
      message: '商品数据查询成功',
      data: productsWithBrand,
      count: productsWithBrand.length
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