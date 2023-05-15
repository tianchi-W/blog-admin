import { httpGet, httpPost, httpDelete, httpPut } from './http'
export const getArticleList = (params = {}) => httpGet({ url: '/article', params })
export const getArticleById = (data = {}) => httpPost({ url: '/article/info', data })
export const addArticle = (data = {}) => httpPost({ url: '/article', data })
export const delArticle = (data = {}) => httpDelete({ url: '/article', data })
export const upDateArticle = (data = {}) => httpPut({ url: '/article', data })

//登录注册
export const getVerityCode = (params = {}) => httpGet({ url: '/users/getInfo', params })
export const login = (data = {}) => httpPost({ url: '/users/login', data })

//用户信息展示
export const getUserInfoList = (params = {}) => httpGet({ url: '/users/list', params })

//tag
export const getTagList = (params = {}) => httpGet({ url: '/tag', params })
export const getTagById = (data = {}) => httpPost({ url: '/tag/info', data })
export const addTag = (data = {}) => httpPost({ url: '/tag', data })
export const delTag = (data = {}) => httpDelete({ url: '/tag', data })
export const upDateTag = (data = {}) => httpPut({ url: '/tag', data })
