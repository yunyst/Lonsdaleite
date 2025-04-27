// 云数据库时间戳转日期
// export const cloudDate = (timestamp, format = 'YYYY-MM-DD') => {
//   if (!timestamp) return '';

// 处理UniCloud的Date类型
// <view>创建时间：{{ new Date() | cloudDate('YYYY-MM-DD HH:mm:ss') }}</view>
export const cloudDate = (timestamp, format = 'YYYY-MM-DD') => {
  if (!timestamp) return ''
  let date = timestamp instanceof Date ? timestamp : new Date(timestamp)

  const padZero = num => num.toString().padStart(2, '0')
  const maps = {
    YYYY: date.getFullYear(),
    MM: padZero(date.getMonth() + 1),
    DD: padZero(date.getDay()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds()),
  }
  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, match => maps[match])
}

/**
 * 地理位置解析（支持腾讯/高德地图坐标）
 * @param {Object|String} location - 位置对象或JSON字符串
 * @param {String} format - 输出格式（short|full）
 * @returns {String} 格式化后的地址
 */
export const locationText = (location, format = 'full') => {
  if (!location) return '未知位置'

  try {
    const loc = typeof location === 'string' ? JSON.parse(location) : location

    if (format === 'short') {
      return loc.addressComponents?.street ||
        loc.addressComponents?.district ||
        loc.address ||
        '未知位置'
    }
    // 完整格式
    return [
      loc.addressComponents?.province,
      loc.addressComponents?.city,
      loc.addressComponents?.district,
      loc.addressComponents?.street,
      loc.addressComponents?.streetNumber
    ].filter(Boolean).join('') || loc.address || '未知位置'
  } catch (e) {
    return '位置解析错误'
  }
}
// tencenAddress: {
//   "address": "广东省深圳市南山区科技南一路腾讯大厦",
//   "addressComponents": {
//     "province": "广东省",
//     "city": "深圳市",
//     "district": "南山区",
//     "street": "科技南一路",
//     "streetNumber": "腾讯大厦"
//   }
// },