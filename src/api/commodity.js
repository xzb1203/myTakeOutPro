import request from '@/utils/request'
// 添加分类
export function goodsAddcate(data) {
  return request({
    url: '/goods/addcate',
    method: 'post',
    data
  })
}
// 获取分类
export function goodsCateList(params) {
  return request({
    url: '/goods/catelist',
    method: 'get',
    params
  })
}
