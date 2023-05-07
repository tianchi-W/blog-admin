import { httpGet, httpPost, httpDelete, httpPut } from './http'
export const getArticleList = (params = {}) => httpGet({ url: '/article', params })
export const getArticleById = (data = {}, params = {}) => httpPost({ url: '/article/info', data })
export const addArticle = (data = {}, params = {}) => httpPost({ url: '/article', data })
export const delArticle = (data = {}) => httpDelete({ url: '/article', data })
export const upDateArticle = (data = {}, params = {}) => httpPut({ url: '/article', data })

//登录注册
export const getVerityCode = (params = {}) => httpGet({ url: '/users/getInfo', params })
export const login = (data = {}, params = {}) => httpPost({ url: '/users/login', data })
