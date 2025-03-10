import axios from "axios";
import { useAllDataStore } from "@/store/index.js";
const store = useAllDataStore();

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, //设置域名
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    if (store.token) config.headers["Authorization"] = store.token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // console.log("response 响应拦截器 ----->  ", response);
    return response.data;
  },
  function (err) {
    console.log("err 响应拦截器 ----->  ", err);
    return Promise.reject(err);
  }
);

export default instance;
