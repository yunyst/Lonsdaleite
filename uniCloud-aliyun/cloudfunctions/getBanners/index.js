'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
})
exports.main = async (event, context) => {
  try {
    // 1. 参数验证与处理
    const validPages = ['cleaning', 'skincare', 'makeup', 'fragrance', 'male'];
    const pageType = event.pageType || 'cleaning'; // 默认显示cleaning精选页

    if (!validPages.includes(pageType)) {
      return {
        code: 400,
        message: '无效的页面参数',
        validPages, // 返回有效参数供前端参考
        suggest: '可用值: cleaning, skincare, makeup, perfume, men'
      };
    }
    // 2. 查询数据
    const res = await db.collection('banner')
      .where({
        page_type: pageType // 直接匹配page_type字段
      })
      .get();

    // 3. 返回结果
    return {
      code: 200,
      data: res.data.map(item => ({
        id: item.banner_id,
        image: item.image_url
      })),
      count: res.data.length
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