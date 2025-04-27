// 检查用户是否有指定权限
// 单个指定权限可以直接传字符串或者数组
// 多个必须数组

export function hasPermission(requiredPermissionList) {
  if (!requiredPermissionList || requiredPermissionList.length === 0) {
    return true
  }

  let permsissons = uni.getStorageSync('userPermissions') || []

  const requiredList = Array.isArray(requiredPermissionList) ? requiredPermissionList : [requiredPermissionList]
  return requiredList.some(permsisson => permsissons.includes(permsisson))
}