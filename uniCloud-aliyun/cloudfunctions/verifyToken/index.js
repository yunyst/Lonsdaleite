const {
  generateToken,
  verifyToken
} = require('../common/token-util/index.js');
const db = uniCloud.database();

exports.main = async (event) => {
  // 增强型Token验证
  const verification = verifyToken(event.token);
  console.log("verification", verification)
  if (!verification.isValid) {
    return {
      code: verification.error === 'EXPIRED' ? 401 : 403,
      message: verification.error === 'EXPIRED' ? 'Token已过期' : '无效Token'
    };
  }
  console.log("uid", verification.uid)
  //检查用户状态
  const user = await db.collection('users')
    .where({
      account: verification.uid
    })
    .field({
      password: 0
    })
    .get();
  console.log("user", user)
  if (!user.data[0]) {
    return {
      code: 404,
      message: '用户不存在'
    };
  }

  // 返回结果
  return {
    code: 200,
    userInfo: user.data[0].account,
    tokenInfo: { // 返回Token元信息
      issuedAt: new Date(verification.iat * 1000),
      expiresAt: new Date(verification.exp * 1000),
      remainingValidDays: Math.ceil((verification.exp - Date.now() / 1000) / 86400)
    },
    // 自动续期
    newToken: shouldRefresh(verification) ? generateToken(verification.uid) : null
  };
};

// 判断是否需要刷新Token（剩余有效期小于1天时刷新）
function shouldRefresh(verification) {
  const remainingTime = verification.exp - Date.now() / 1000;
  return remainingTime < 86400;
}