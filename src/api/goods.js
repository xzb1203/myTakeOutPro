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
// 获取分类
export function goodsCatelist(params) {
  return request({
    url: '/goods/catelist',
    method: 'get',
    params
  })
}
// 修改分类
export function goodsEditcate(data) {
  return request({
    url: '/goods/editcate',
    method: 'post',
    data
  })
}
// 删除分类
export function goodsDelcate(id) {
  return request({
    url: '/goods/delcate',
    method: 'get',
    params: { id }
  })
}
