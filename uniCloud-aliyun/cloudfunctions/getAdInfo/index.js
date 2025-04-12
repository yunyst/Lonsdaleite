'use strict';
let db = uniCloud.database({
  throwOnNotFound: false
})
exports.main = async (event, context) => {
  try {
    // 1. 参数验证与处理
    const validPages = ['skincare', 'fragrance', 'bodycare'];
    const pageType = event.pageType || '';

    if (!validPages.includes(pageType)) {
      return {
        code: 400,
        message: '无效的页面参数',
        validPages, // 返回有效参数供前端参考
        suggest: '可用值: skincare,fragrance,bodycare'
      };
    }
    // 2. 查询数据
    const res = await db.collection('adInfo')
      .where({
        pageType: pageType // 直接匹配page_type字段
      })
      .get();
    // 3. 返回结果
    return {
      code: 200,
      data: res.data[0],
      length: res.data.length
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