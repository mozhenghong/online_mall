import { Request } from './request';

export const userInfo = (options?: any): Promise<any> =>
  Request.axiosInstance({
    url: '/userInfo',
    method: 'post',
    desc: '获取用户信息',
    isJSON: true,
    ...options
  })


export const login = (options?: any): Promise<any> =>
Request.axiosInstance({
  url: '/login',
  method: 'post',
  desc: '登录',
  isJSON: true,
  ...options
})