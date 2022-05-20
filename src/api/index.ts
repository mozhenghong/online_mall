import http from './request';

// student teacher  administrator
export const login = (params:any)=>{
  return  http("post",'/prefix/api/v1/session', params)
}

export const logout = ()=>{
  return  http("delete",'/prefix/api/v1/session', null)
}
