'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ', event)

  // const res = await db.collection('products')
  //   .where({ // 查询条件（示例）
  //     category: 'lipstick'
  //   })
  //   .get()
  // return res // 返回查询结果
  //返回数据给客户端
  return event
};