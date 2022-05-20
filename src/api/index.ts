import http from './request';

// student teacher  administrator
export const login = (params:any)=>{
  return  http("post",'/prefix/api/v1/session', {username:'teacher',password:'teacher'})
}