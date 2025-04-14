export function rpxToPx(rpx) {
  const systemInfo = uni.getSystemInfoSync();
  return rpx * systemInfo.windowWidth / 750;
}

export function pxToRpx(px) {
  const systemInfo = uni.getSystemInfoSync();
  return px * 750 / systemInfo.windowWidth;
}