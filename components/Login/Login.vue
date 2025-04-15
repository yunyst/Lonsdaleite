<template>
  <view class="container">
    <view class="tab">
      <view class="back" @click="back" style="color: gray;font-size:20rpx;">X</view>
      <view class="tip" @click="contactus">
        联系我们
      </view>
    </view>
    <view class="title-container">
      <view class="title">
        LONSDALEITE
      </view>
    </view>
    <view class="content-container">

      <view class="form-item">

        <view class="input-wrapper">
          <input class="phone-input" type="text" placeholder="请输入手机号/邮箱" v-model="inputValue" @input="validateInput"
            @blur="validateBlur" @focus="handleFocus" />
        </view>
        <view v-show="errorMessage" class="error-message">{{ errorMessage }}</view>
        <!-- 邮箱后缀提示 -->
        <view class="email-container" v-if="showEmailSuggestions">
          <view class="email-suggestions">
            <view v-for="(suggestion, index) in emailSuggestions" :key="index"
              @click="selectEmailSuggestion(suggestion)" class="email-suggestion-item">
              {{ suggestion }}
            </view>
          </view>
        </view>
      </view>

      <view class="form-item">
        <view class="input-wrapper">
          <input class="password-input" type="password" placeholder="请输入密码" :disabled="false" v-model="password"
            @input="validPasswordFormat" />
          <button :disabled="!allInfoValid" style="width: 80rpx;height: 80rpx;border-radius: 40rpx;color:#fff;
              display: flex; justify-content: center; align-items: center;"
            :style="{ backgroundColor: allInfoValid ? '#000' : '#a8a8a8'}" @click="register">
            <view>
              >
            </view>
          </button>
        </view>
        <view v-if="passwordError" class="error-message">{{ passwordError }}</view>
      </view>

    </view>
    <view class="agreement-tip">
      <view class="agree-privacy">
        <u-switch size="30" v-model="isAgree" active-color="gray"></u-switch>
      </view>
      <view class="agreement-links">
        <view @click="isAgree = !isAgree">登录即代表同意</view>
        <view class="link" @click="goToAgreement('agreement')">《用户服务协议》</view>
        <view class="link" @click="goToAgreement('privacy')">《隐私政策》</view>
      </view>
    </view>
    <view class="swift-way">
      <view class="other-way">登录</view>
      <view class="split">|</view>
      <view class="forget-pw">忘记密码</view>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    computed: {
      ...mapState({
        validEmails: state => state.login.validEmails
      }),
      allInfoValid() {
        return this.errorMessage == '' && this.passwordError == '' && this.isAgree
      }
    },
    data() {
      return {
        inputValue: '', // 用户输入的手机号或邮箱
        password: '', // 用户输入的密码
        errorMessage: '', // 错误提示
        passwordError: '', // 密码错误消息
        isAgree: false,
        showEmailSuggestions: false,
        emailSuggestions: ["gmail.com", "qq.com", "outlook.com", "163.com", "sina.com"], // 可用邮箱后缀
        // debounceTimer: null, // 用于存储定时器的引用
        validateTimer: null,
      }
    },

    methods: {
      //用户输入@后缀检测，失去焦点隐藏，重新获得焦点再次检测@
      handleFocus() {
        // 只在真正需要时触发验证
        if (this.inputValue.includes("@")) {
          this.validateInput();
        }
      },
      validateInput() {
        if (!this.inputValue) {
          this.errorMessage = '';
          return;
        }
        clearTimeout(this.validateTimer);
        this.validateTimer = setTimeout(() => {
          this.validAccountFormat();
          if (this.errorMessage == '') {
            this.showEmailSuggestions = false; // 如果已经有效，隐藏建议
          } else {
            const atIndex = this.inputValue.indexOf("@");
            if (atIndex !== -1) {
              const domainPart = this.inputValue.slice(atIndex + 1);
              this.filterEmailSuggestions(domainPart);
            } else {
              this.showEmailSuggestions = false;
            }
          }
        }, 200);
      },
      // 根据用户输入的 @ 后缀部分过滤可用后缀
      filterEmailSuggestions(domainPart) {
        if (domainPart.length === 0) {
          this.emailSuggestions = this.validEmails
          this.showEmailSuggestions = true;
        } else {
          // 过滤
          this.showEmailSuggestions = true;
          this.emailSuggestions = this.validEmails.filter((suggestion) =>
            suggestion.includes(domainPart)
          );
        }
      },
      // 用户点击某个建议后，自动填充到输入框
      selectEmailSuggestion(suggestion) {
        this.inputValue = this.inputValue.split("@")[0] + "@" + suggestion;
        this.showEmailSuggestions = false;
        this.emailSuggestions = this.validEmails
      },
      validAccountFormat() {
        // 正则表达式：手机号和邮箱格式
        const phoneRegex = /^1[3-9]\d{9}$/;
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        // 判断输入的内容是否为手机号或邮箱
        if (phoneRegex.test(this.inputValue)) {
          this.errorMessage = ''; // 如果是手机号格式正确，则不显示错误
        } else if (emailRegex.test(this.inputValue)) {
          this.errorMessage = ''; // 如果是邮箱格式正确，则不显示错误
        } else {
          this.errorMessage = '请输入有效的手机号或邮箱'; // 格式错误时显示提示
        }
      },
      validateBlur() {
        if (this.showEmailSuggestions) {
          this.showEmailSuggestions = false
        }
      },
      validPasswordFormat() {
        // 正则表达式：密码至少6个字符，最多20个字符，且不能包含奇怪的符号（只允许字母、数字、下划线）
        const passwordRegex = /^[A-Za-z0-9_]{6,20}$/;

        if (!this.password) {
          this.passwordError = ''; // 如果密码为空，移除错误消息
          return;
        }

        if (this.password.length < 6 || this.password.length > 20) {
          this.passwordError = '密码长度应为6到20个字符';
        } else if (!passwordRegex.test(this.password)) {
          this.passwordError = '密码只能包含字母、数字和下划线';
        } else {
          this.passwordError = ''; // 密码符合要求时，不显示错误
        }
      },
      goToAgreement(type) {
        const routes = {
          'agreement': '/pages/rules/agreement/agreement',
          'privacy': '/pages/rules/privacy/privacy'
        };
        uni.navigateTo({
          url: routes[type]
        });
      },
      register() {
        console.log("user click register")
        console.log("submit data to database")
      },
      contactus() {
        console.log("contactus")
      },
      back() {
        console.log("back")
      }
    }
  }
</script>

<style scoped lang="scss">
  .email-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .email-suggestions {
    border: 1px solid #d7d9d6;
    width: 90%;
    background: #fff;
    max-height: 150px;
    overflow-y: auto;
    position: absolute;
    z-index: 100;

    .email-suggestion-item {
      padding: 12px;
      font-size: 26rpx;
      line-height: 28rpx;
    }
  }


  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .tab {
    width: 100%;
    height: 130rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .back {
      margin-left: 45rpx;
      line-height: 32rpx;
    }

    .tip {
      margin-right: 30rpx;
      font-size: 26rpx;
      line-height: 32rpx;
      color: dimgray;
    }
  }

  .title-container {
    width: 100%;
    height: 330rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
      font-family: "boldonse";
      letter-spacing: 6rpx;
      font-size: 36rpx;
    }
  }

  .content-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form-item {
      width: 100%;

      .error-message {
        width: 640rpx;
        height: 30rpx;
        line-height: 26rpx;
        font-size: 24rpx;
        color: gray;
        padding-left: 60rpx;
      }

      .input-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;



        .phone-input {
          background-color: #dfdfdf;
          width: 640rpx;
          height: 20rpx;
          margin: 10rpx;
          padding: 30rpx;
          border-radius: 50rpx;
          font-size: 24rpx;
        }

        .password-input {
          background-color: #dfdfdf;
          width: 520rpx;
          height: 20rpx;
          margin: 10rpx 0 10rpx 30rpx;
          padding: 30rpx;
          border-radius: 50rpx;
          font-size: 24rpx;
        }
      }
    }
  }

  .agreement-tip {
    width: 100%;
    height: auto;
    padding: 24rpx;
    display: flex;
    gap: 30rpx;

    .agree-privacy {
      width: 60rpx;
      height: 30rpx;
      margin-left: 20rpx;
    }

    .agreement-links {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 24rpx;
      line-height: 26rpx;
      color: #aaaaaa;

      .link {
        font-size: 22rpx;
        color: #838383;
      }
    }
  }

  .swift-way {
    position: absolute;
    bottom: 50rpx;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 100rpx;
    font-size: 24rpx;
    color: #aaaaaa;

    .other-way {
      border: 0rpx;
    }

    .split {
      font-size: 20rpx;
    }

    .forget-pw {}
  }
</style>