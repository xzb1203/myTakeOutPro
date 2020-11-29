import request from '@/utils/request'
//  获取店铺详情
export function shopInfo(params) {
  return request({
    url: '/shop/info',
    method: 'get',
    params
  })
}
// 店铺内容修改
export function shopEdit(data) {
  return request({
    url: '/shop/edit',
    method: 'post',
    data
  })
}
