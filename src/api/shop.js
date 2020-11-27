import request from '@/utils/request'
//  获取店铺详情
export function shopInfo(params) {
  return request({
    url: '/shop/info',
    method: 'get',
    params
  })
}
