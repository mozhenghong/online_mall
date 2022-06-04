import { http } from './request';
import { ListBaseParam } from '@/api/interface';

/**
 * 订单模块
 */

export interface OrderListParams extends ListBaseParam {
    search?: string;
}

export const placeOrder = (courseId: number) => http({ method: 'POST', urlPath: `/v1/order/${courseId}` });

export const getOrderList = (params?: OrderListParams) => http({ method: 'GET', urlPath: '/v1/order', params });
