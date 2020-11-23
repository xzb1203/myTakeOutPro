import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/checkLogin',
    method: 'post',
    data
  })
}

export function getInfo(params) {
  return request({
    url: '/users/accountinfo',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
// 获取账号列表
export function usersList(params) {
  return request({
    url: '/users/list',
    method: 'get',
    params
  })
}
// 修改账号
export function usersEdit(data) {
  return request({
    url: '/users/edit',
    method: 'post',
    data
  })
}
// 删除账号
export function usersDel(id) {
  return request({
    url: '/users/del',
    method: 'get',
    params: id
  })
}
// 添加账号
export function usersAdd(data) {
  return request({
    url: '/users/add',
    method: 'post',
    data
  })
}
// 修改密码
export function usersEditpwd(data) {
  return request({
    url: '/users/editpwd',
    method: 'post',
    data
  })
}
// 检查旧密码是否正确
export function usersCheckoldpwd(params) {
  return request({
    url: '/users/checkoldpwd',
    method: 'get',
    params
  })
}
// 批量删除
export function usersBatchdel(ids) {
  return request({
    url: '/users/batchdel',
    method: 'get',
    params: ids
  })
}
