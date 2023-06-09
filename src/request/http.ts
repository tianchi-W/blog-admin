import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { ApiResponse } from './data'
import router from '@/router/index'
import { storeToRefs } from 'pinia'
import { useCommonStore } from '@/stores/common'
import { Buffer } from 'buffer'
const service: AxiosInstance = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000 // 请求 30s 超时
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { token } = storeToRefs(useCommonStore())
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    // 每次发送请求之前判断是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况，此处token一般是用户完成登录后储存到localstorage里的
    token.value && (config.headers.Authorization = 'bearer ' + token.value)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//   响应拦截器
service.interceptors.response.use(
  // @ts-ignore
  (response) => {
    console.log(response, 'response')
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data.code !== 200) {
        // console.log(response)
        router.push({ name: 'login' })
      }
      if (response.data.code === 511) {
        // 未授权调取授权接口
      } else if (response.data.code === 510) {
        // 未登录跳转登录页
      } else {
        return Promise.resolve(response)
      }
    } else {
      return Promise.reject(response)
    }
  },
  (error) => {
    // 我们可以在这里对异常状态作统一处理
    console.log(error)
    if (error.response.status) {
      // 处理请求失败的情况
      // 对不同返回码对相应处理
      return Promise.reject(error.response)
    }
  }
)
// get 请求
export function httpGet({ url, params = {} }: { url: string; params: any }) {
  return new Promise<ApiResponse<any>>((resolve, reject) => {
    service
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// post请求
export function httpPost({ url, data = {}, params = {} }: any) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'post',

      transformRequest: [
        function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      // 发送的数据
      data,
      // url参数
      params
    }).then((res) => {
      resolve(res.data)
    })
  })
}

//删除请求
export function httpDelete({ url, data }) {
  return new Promise((resolve, reject) => {
    service({
      method: 'DELETE',
      url,
      data
    })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

//put请求

export function httpPut({ url, data = {}, params = {} }) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method: 'PUT',
      transformRequest: [
        function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }
      ],
      // 发送的数据
      data,
      // url参数
      params
    }).then((res) => {
      console.log(res.data, 'data')
      resolve(res.data)
    })
  })
}

/**
 * 上传图片
 */
export function handleUpload(data) {
  return new Promise(function (resolve, reject) {
    console.log(data)
    service({
      url: '/upload/qiniu_upload',
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res, 'res')
        resolve(res.data)
      })
      .then((err) => {
        console.log(err, 'err')
      })
  })
}
