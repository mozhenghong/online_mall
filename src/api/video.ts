import { http } from './request';
import { ListBaseParam } from '@/api/interface';

/**
 * 视频模块
 */

export interface VideoListParams extends ListBaseParam {
    search?: string;
}

export interface VideoItem {
    id: number;
    name: string;
    description: string;
    createdOn: string;
    url: string;
}

interface GetVideoListRes {
    data: VideoItem[],
    total: number
}

export const getVideoList = (params?: VideoListParams): Promise<GetVideoListRes> => http({
    method: 'GET',
    urlPath: '/v1/video',
    params
});

export const uploadVideo = (data: FormData): Promise<{ data: string }> => http({
    method: 'POST',
    urlPath: '/v1/video/upload',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
});


export const createVideo = (data: { name: string, description?: string, url: string }) => http({
    method: 'POST',
    urlPath: '/v1/video',
    data
});

export const updateVideo = (id: number, data: { name: string, description?: string, url: string }) => http({
    method: 'PATCH',
    urlPath: `/v1/video/${id}`,
    data
});

export const getVideoById = (courseId: number, videoId: number): Promise<{ data: VideoItem }> => http({
    method: 'GET',
    urlPath: `/v1/video/${courseId}/${videoId}`
});

export const deleteVideoById = (id: number) => http({
    method: 'DELETE',
    urlPath: `/v1/video/${id}`
});
