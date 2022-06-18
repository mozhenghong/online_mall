import { http } from "./request";
import { ListBaseParam } from "@/api/interface";
import { VideoItem, Common } from "./order";

/**
 * 课程模块
 */

export interface CourseListParams extends ListBaseParam {
  search?: string;
}
export interface CourseData {
  id: number;
  name: string;
  description: string;
  teacherName: string;
  teacherDescription: string;
  price: string;
  videoIdList: string[];
  videoList: string[]
}

export interface CourseItem extends Common {
  name: string;
  teacherName: string;
  teacherDescription: string;
  description: string;
  price: string;
  videoList: VideoItem[];
  purchased: boolean;
}

export const getCourseList = (params: CourseListParams) => http({ method: "GET", urlPath: "/v1/course", params });

export const getCourseDetail = (id: number) => http({ method: "GET", urlPath: `/v1/course/${id}` });

export const addCourse = (data: CourseData) => http({ method: "POST", urlPath: "/v1/course", data });

export const updateCourse = (id: number, data: CourseData) => http({ method: "PATCH", urlPath: `/v1/course/${id}`, data });

export const deleteCourse = (id: number) => http({ method: "delete", urlPath: `/v1/course/${id}` });
