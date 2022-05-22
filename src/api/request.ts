/**
 * 网络请求配置
 */
import axios from "axios";
import { message } from "antd";

axios.defaults.timeout = 100000;
// axios.defaults.baseURL = "http://101.35.43.9:10520/";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
        message.error(data.message);
        return data;
      } else if (response.status === 401) {
        // unauthorized
        window.location.href = "/login";
      } else if (response.status === 403) {
        // forbidden
        message.error(data.message);
      } else if (
        response.status === 301 ||
        response.status === 302 ||
        response.status === 307
      ) {
        // redirect
        var location = response.headers.get("location");
        if (location) {
          window.location.href = location;
        } else {
          message.error("Response header 'location' is missing!");
          return data;
        }
      } else if (response.status === 422) {
        // validation error
        message.error(data.message);
      } else {
        // 500 and other
        message.error(data.message);
      }
    } else {
      // 请求初始化时出错或者没有响应返回的异常
      message.error(error.error);
    }
    throw error;
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url: string, data: any) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url: string, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
/**
 * 封装delete方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function Delete(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((response) => {
        landing(url, params, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//统一接口处理，返回数据
export default function (fecth: any, url: any, param: any) {
  let _data = "";
  return new Promise((resolve, reject) => {
    switch (fecth) {
      case "get":
        get(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "post":
        post(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "put":
        put(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      case "delete":
        Delete(url, param)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
        break;
      default:
        break;
    }
  });
}

/**
 * 查看返回的数据
 * @param url
 * @param params
 * @param data
 */
function landing(url: string, params: any, data: any) {
  if (data.code === -1) {
  }
}
