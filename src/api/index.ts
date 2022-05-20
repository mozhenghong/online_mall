import http from './request';

export const login = (params:any)=>{
  return  http("post",'/prefix/api/v1/session', {username:'admin',password:'123456'})
}