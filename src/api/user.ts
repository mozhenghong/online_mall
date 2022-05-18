import { Request } from './request';

export const userInfo = (options?: any): Promise<any> =>
  Request.axiosInstance({
    url: '/userInfo',
    method: 'post',
    desc: '获取用户信息',
    isJSON: true,
    ...options
  })