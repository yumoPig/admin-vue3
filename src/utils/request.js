import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API || import.meta.env.VITE_MOCK_API, //设置域名
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // if (config?.token) config.headers["Authorization"] = config.token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;
