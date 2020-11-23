import request from '@/utils/request'
// 获取商品详情
export function goodsList(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}
// 删除商品
export function goodsDel(params) {
  return request({
    url: '/goods/del',
    method: 'get',
    params
  })
}
