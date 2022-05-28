/**
 * 网络请求配置
 */
import axios, { AxiosRequestHeaders, Method } from 'axios';
import { message } from 'antd';

axios.defaults.timeout = 100000;

const initHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
};

axios.defaults.headers.post = initHeaders;
axios.defaults.headers.patch = initHeaders;

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const { response } = error;
        if (response) {
            const { data } = response;
            // 非2xx状态码的响应
            if (response.status === 400) {
                void message.error(data.message);
                return data;
            } else if (response.status === 401) {
                // unauthorized
                window.location.href = '/login';
            } else if (response.status === 403) {
                // forbidden
                void message.error(data.message);
            } else if (
                response.status === 301 ||
                response.status === 302 ||
                response.status === 307
            ) {
                // redirect
                const location = response.headers.get('location');
                if (location) {
                    window.location.href = location;
                } else {
                    void message.error('Response header \'location\' is missing!');
                    return data;
                }
            } else if (response.status === 422) {
                // validation error
                void message.error(data.message);
            } else {
                // 500 and other
                void message.error(data.message);
            }
        } else {
            // 请求初始化时出错或者没有响应返回的异常
            void message.error(error.error);
        }
        throw error;
    }
);

//统一接口处理，返回数据
export const http = ({
                         method,
                         urlPath,
                         params,
                         data,
                         headers = {}
                     }: { method: Method, urlPath: string, params?: object, data?: object, headers?: AxiosRequestHeaders }) => {
    return new Promise((resolve, reject) => {

        axios(Object.assign({
            url: `/prefix/api${urlPath}`,
            method,
            headers: Object.assign({}, initHeaders, headers)
        }, data ? { data } : {}, params ? { params } : {})).then(
            (response) => {
                resolve(response.data);
            }, (err) => {
                reject(err);
            }
        );
    });
};
