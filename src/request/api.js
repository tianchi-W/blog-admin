import { httpGet, httpPost } from './http'
export const getArticleList = (params = {}) => httpGet({ url: '/article', params })
export const getVerityCode = (params = {}) => httpGet({ url: '/users/getInfo', params })
export const login = (data = {}, params = {}) => httpPost({ url: '/users/login', data })
