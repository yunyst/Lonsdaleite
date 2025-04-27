'use strict';

let db = uniCloud.database({
  throwOnNotFound: false
});

exports.main = async (event, context) => {
  const {
    account
  } = event
  const userInfoRes = await db.collection('users').where({
    account
  }).get();
  const userInfo = userInfoRes.data[0]
  console.log("userInfo", userInfo)
  return {
    code: 200,
    data: {
      userInfo: userInfo.account,
      permissions: userInfo.tag
    }
  }
};