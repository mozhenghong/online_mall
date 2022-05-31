import { http } from './request';
import { ListBaseParam } from '@/api/interface';

/**
 *
 * @param params 订单模块
 * @returns
 */

export interface OrderListParams extends ListBaseParam {
    search?: string;
}

export const getOrderList = (params?: OrderListParams) => http({ method: 'GET', urlPath: '/v1/order', params });
