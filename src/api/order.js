import request from '@/utils/request'
//  获取订单列表(带查询功能)
export function orderList(params) {
  return request({
    url: '/order/list',
    method: 'get',
    params
  })
}
//  获取订单详情
export function orderDetail(params) {
  return request({
    url: '/order/detail',
    method: 'get',
    params
  })
}
//  修改订单
export function orderEdit(data) {
  return request({
    url: '/order/edit',
    method: 'post',
    data
  })
}
