import { http } from './request';

/**
 * 用户模块
 */

 export interface RoleItem {
    id: string;
    name: '';
}

export interface UserInfo {
    id: string;
    username: '';
    roles: RoleItem[];
}

// student teacher administrator
export const login = (data: any) => http({ method: 'POST', urlPath: '/v1/session', data });

export const getUserInfo = () => http({ method: 'GET', urlPath: '/v1/session' });

export const logout = () => http({ method: 'DELETE', urlPath: '/v1/session' });

export const register = (data: any) => http({ method: 'POST', urlPath: '/v1/user', params: data });

export const getUserList = (params: any) => http({ method: 'GET', urlPath: '/v1/user', params });

export const getUserDetail = (id: number) => http({ method: 'GET', urlPath: `/v1/user/${id}` });

export const updateUser = (data: any) => http({ method: 'PATCH', urlPath: `/v1/user`, data });

export const getRole = () => http({ method: 'GET', urlPath: '/v1/roleEnum'});



