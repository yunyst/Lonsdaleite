// 用户调用 this.$smartCloud()
//         ↓
// [生成请求key requestKey]
//         ↓
// 【检查缓存cloudCallCache】
//         ├─ 有效+命中缓存 → 直接返回缓存数据 (结束)
//         └─ 无缓存或已过期 → 继续
//         ↓
// 【检查请求队列cloudCallQueue】
//         ├─ 有正在进行的请求 → 复用Promise (结束)
//         └─ 没有 → 创建新请求
//         ↓
// [显示Loading]
//         ↓
// 【发起uniCloud.callFunction请求】
//         ↓
// 【收到返回结果】
//         ↓
// 【判断返回结果】
//         ├─ code == 200 
//         │    └─ 成功，保存缓存(如果配置了缓存)，resolve数据
//         └─ code != 200 (业务错误)
//              └─ 标记为业务错误，直接reject
//         ↓
// 【catch错误】
//         ├─ 业务错误 → 直接处理reject
//         └─ 网络错误
//              ├─ 未超出最大重试次数 → 延迟retry
//              └─ 超出重试次数 → reject
//         ↓
// [隐藏Loading (第一次请求后)]
//         ↓
// [从请求队列cloudCallQueue移除 requestKey]
//         ↓
// 【流程结束】

let cloudCallQueue = new Map(); //请求队列（防止重复请求）
let cloudCallCache = new Map(); //缓存队列

export default {
  install(Vue) {
    Vue.prototype.$smartCloud = function(cloudFunctionName, data = {}, options = {}) {
      const {
        loading = true, // 是否显示loading
          loadingText = '加载中...', // loading文字
          cacheExpire = 0, // 缓存有效期（秒）
          retryTimes = 0, // 最大重试次数
          retryDelay = 500, // 每次重试的间隔（毫秒）
          retryOnNetworkError = true // 只有网络错误/超时才重试
      } = options;

      const requestKey = `${cloudFunctionName}_${JSON.stringify(data)}`;
      // console.log('data', data)
      // 先查缓存
      if (cacheExpire > 0 && cloudCallCache.has(requestKey)) {
        const {
          data: cachedData,
          timestamp
        } = cloudCallCache.get(requestKey);
        const now = Date.now();
        if (now - timestamp < cacheExpire * 1000) {
          console.log(`[SmartCloud] 命中缓存：${requestKey}`);
          return Promise.resolve(cachedData);
        } else {
          cloudCallCache.delete(requestKey);
        }
      }

      // 防止重复请求
      if (cloudCallQueue.has(requestKey)) {
        return cloudCallQueue.get(requestKey);
      }

      //对请求真正的处理核心
      const callPromise = new Promise(async (resolve, reject) => {
        let attempt = 0;

        const makeCall = async () => {
          try {
            attempt++
            if (loading && attempt === 1) {
              uni.showLoading({
                title: loadingText,
                mask: true
              });
            }

            const res = await uniCloud.callFunction({
              name: cloudFunctionName,
              data //确保解构的参数名相同
            });

            if (res.result.code !== 200) {
              // 业务错误，不需要重试
              throw {
                isBusinessError: true,
                message: res.result.message || '业务错误',
                code: res.result.code
              };
            }

            // 成功处理
            if (cacheExpire > 0) {
              cloudCallCache.set(requestKey, {
                data: res.result.data,
                timestamp: Date.now()
              });
            }
            cloudCallQueue.delete(requestKey);
            resolve(res.result.data);
          } catch (error) {
            let shouldRetry = retryOnNetworkError && !error.isBusinessError && attempt <= retryTimes
            if (shouldRetry) {
              console.warn(`[SmartCloud] 网络错误，准备第${attempt}次重试...`);
              setTimeout(makeCall, retryDelay);
            } else {
              cloudCallQueue.delete(requestKey);
              reject(error);
            }
          } finally {
            if (loading && !cloudCallQueue.has(requestKey)) {
              uni.hideLoading();
            }
          }
        };
        makeCall();
      });

      cloudCallQueue.set(requestKey, callPromise);
      return callPromise;
    };

  }
};