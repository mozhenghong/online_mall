import { http } from "./request";
import { ListBaseParam } from "@/api/interface";
import { CourseItem } from "./course";

/**
 * 订单模块
 */

export interface OrderListParams extends ListBaseParam {
  search?: string;
}
export interface Common {
  id: number;
  createdOn: string;
}
export interface VideoItem extends Common {
  name: string;
  description: string;
  url: string;
}
export interface OrderItem extends Common  {
  price: string;
  course: CourseItem;
  status: string;
}

export interface placeOrderResult extends Common {
  course: string;
  name: string;
  teacherName: string;
  teacherDescription: string;
  price: string;
  formComponentHtml: string;
}

export const placeOrder = (courseId: number) => http({ method: "POST", urlPath: `/v1/order/${courseId}` });

export const getOrderList = (params?: OrderListParams) => http({ method: "GET", urlPath: "/v1/order", params });

export const deleteOrder = (id: number) => http({ method: "DELETE", urlPath: `/v1/order/${id}` });

export const cancelOrder = (id: number) => http({ method: "PATCH", urlPath: `/v1/order/${id}` });

export const getOrderById = (id: number): Promise<{ data: OrderItem }> => http({ method: "GET", urlPath: `/v1/order/${id}` });
