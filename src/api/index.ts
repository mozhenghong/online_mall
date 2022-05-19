import http from './request';

export const login = (params:any)=>{
  return  http("get",'/login', params);
}