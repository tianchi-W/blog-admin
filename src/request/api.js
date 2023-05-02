import { httpGet, httpPost, httpDelete } from './http'
export const getArticleList = (params = {}) => httpGet({ url: '/article', params })
export const addArticle = (data = {}, params = {}) => httpPost({ url: '/article', data })
export const delArticle = (data = {}) => httpDelete({ url: '/article', data })

export const getVerityCode = (params = {}) => httpGet({ url: '/users/getInfo', params })
export const login = (data = {}, params = {}) => httpPost({ url: '/users/login', data })
