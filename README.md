# Lonsdaleite
my first individual WeChatProgram project
git add .
git commit -m "你的修改描述"
git push origin individual

sequenceDiagram
  participant 前端
  participant 云函数
  participant 本地存储
  
  前端->>云函数: 调用userLogin/userRegister
  云函数-->>前端: 返回token+用户数据
  前端->>本地存储: setStorageSync(token)
  前端->>API: 携带Token的请求
  API-->>前端: 返回业务数据
  alt Token过期
    API-->>前端: 401错误
    前端->>登录页: 自动跳转
  end

token part 
account.vue
login.js
index.js|token-util
index.js|userLogin
ps:index.js|userRegister 没有生成token

跳转到商品详情页报错WAServiceMainContext.js:1 [wxapplib]] Uncaught (in promise) FrameworkError {"errno":101,"errMsg":"private_getBackgroundFetchData:fail private_getBackgroundFetchData:fail:jsapi invalid request data"}