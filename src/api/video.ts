import { http } from './request';
import { ListBaseParam } from '@/api/interface';

/**
 * 视频模块
 */

export interface VideoListParams extends ListBaseParam {
    search?: string;
}

export const getVideoList = (params?: VideoListParams) => http({ method: 'GET', urlPath: '/v1/video', params });

export const uploadVideo = (data: FormData) => http({
    method: 'POST',
    urlPath: '/v1/video/upload',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
});
