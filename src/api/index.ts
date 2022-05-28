import { http } from './request';

/**
 * 用户模块
 */

// student teacher administrator
export const login = (data: any) => http({ method: 'POST', urlPath: '/v1/session', data });

export const logout = () => http({ method: 'DELETE', urlPath: '/v1/session' });

export const register = (data: any) => http({ method: 'POST', urlPath: '/v1/user', params: data });

export const getUserList = (params: any) => http({ method: 'GET', urlPath: '/v1/user', params });

export const getUserDetail = (id: number) => {
    return http({ method: 'GET', urlPath: `/v1/user/${id}` });
};

export const updateUser = (data: any) => {
    return http({ method: 'PATCH', urlPath: `/v1/user`, data });
};
