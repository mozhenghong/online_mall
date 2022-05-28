import http from './request';
/**
 *
 * @param params 课程模块
 * @returns
 */

export const getCourseList = (params: any) => {
    return http("get", '/v1/course', params)
}

export const getCourseDetail = (id: number) => {
    return http("get", `/v1/course/${id}`, null)
}

export const addCourse = (params: any) => {
    return http("post", '/v1/course', params)
}

export const updateCourse = (id: number, params: any) => {
    return http("patch", `/v1/course/${id}`, params)
}

export const deleteCourse = (id: number) => {
    return http("delete", `/v1/course/${id}`, null)
}
