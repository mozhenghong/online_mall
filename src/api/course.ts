import {http} from './request';
/**
 *
 * @param params 课程模块
 * @returns
 */

export const getCourseList = (params: any) => {
    return http({ method: 'GET', urlPath:'/v1/course', params})
}

export const getCourseDetail = (id: number) => {
    return http({ method: 'GET', urlPath:`/v1/course/${id}`})
}

export const addCourse = (data: any) => {
    return http({ method: 'POST', urlPath:'/v1/course', data})
}

export const updateCourse = (id: number, params: any) => {
    return http({ method: 'PATCH', urlPath:`/v1/course/${id}`, params})
}

export const deleteCourse = (id: number) => {
    return http({ method: 'delete', urlPath:`/v1/course/${id}`})
}
