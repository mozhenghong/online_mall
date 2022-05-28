import { http } from './request';

/**
 *
 * @param params 用户模块
 * @returns
 */

// student teacher administrator
export const login = (data: any) => http({ method: 'POST', urlPath: '/v1/session', data });

export const logout = () => http({ method: 'DELETE', urlPath: '/v1/session' });

export const register = (data: any) => http({ method: 'POST', urlPath: '/v1/user', params: data });

export const getUserList = (params: any) => http({ method: 'GET', urlPath: '/v1/user', params });
