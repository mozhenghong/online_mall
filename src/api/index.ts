import http from './request';
/**
 *
 * @param params 用户模块
 * @returns
 */

// student teacher administrator
export const login = (params:any)=>{
  return  http("post",'/v1/session', params)
}

export const logout = ()=>{
  return  http("delete",'/v1/session', null)
}

export const register = (params:any)=>{
  return  http("post",'/v1/user', params)
}

export const getUserList = (params:any)=>{
  return  http("get",'/v1/user', params)
}

export const getUserDetail = (id:number)=>{
  return  http("get",`/v1/user/${id}`, null)
}

export const updateUser = (params:any)=>{
  return  http("patch",`/v1/user`, params)
}
