import { httpGet, httpPost } from './http'
export const getArticleList = (params = {}) => httpGet({ url: '/article', params })
