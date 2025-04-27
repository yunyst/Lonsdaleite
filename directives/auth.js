//无效不用管

const AuthDirective = {
  async inserted(el, binding, vnode) {
    const {
      value,
      modifiers
    } = binding;
    const context = vnode.context;

    // 等待用户数据加载（如果有异步获取的情况）
    if (context.$store && context.$store.state.userInfo.pending) {
      await new Promise(resolve => {
        const unwatch = context.$store.watch(
          state => state.user.pending,
          pending => {
            if (!pending) {
              resolve();
              unwatch();
            }
          }
        );
      });
    }

    // 获取当前用户权限
    const getPermissions = () => {
      // 优先从Vuex获取
      console.log(" 获取当前用户权限")
      if (context.$store) {
        console.log("vuex", context.$store.state.userInfo?.permissions)
        return context.$store.state.userInfo?.permissions || [];
      }
      // 其次从本地存储获取
      return uni.getStorageSync('userPermissions') || [];
    };

    const userPermissions = getPermissions();
    const requiredPermissions = Array.isArray(value) ? value : [value];

    // 超级管理员跳过检查
    if (modifiers.superadmin && userPermissions.includes('superadmin')) {
      return;
    }

    // 权限检查逻辑
    const hasPermission = requiredPermissions.length === 0 ||
      requiredPermissions.some(perm => userPermissions.includes(perm));

    // 没有权限时的处理方式
    if (!hasPermission) {
      if (modifiers.hide) {
        el.style.display = 'none';
      } else if (modifiers.disable) {
        el.disabled = true;
        el.classList.add('is-disabled');

        // 小程序环境需要手动设置disabled属性
        if (el.tagName === 'BUTTON') {
          el.setAttribute('disabled', true);
        }
      } else {
        el.parentNode?.removeChild(el);
      }
    }
  },

  update(el, binding) {
    // 权限或用户角色变化时重新检查
    this.inserted(el, binding, binding._vnode);
  }
};



export default AuthDirective;