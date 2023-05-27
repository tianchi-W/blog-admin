import type { ApiResponse } from './data'
import { httpGet, httpPost, httpDelete, httpPut } from './http'
export const getArticleList: (params: {}) => Promise<ApiResponse<any>> = (params = {}) =>
  httpGet({ url: '/article', params })
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

//classify
export const getClassifyList = (params = {}) => httpGet({ url: '/Classify', params })
export const getClassifyById = (data = {}) => httpPost({ url: '/Classify/info', data })
export const addClassify = (data = {}) => httpPost({ url: '/Classify', data })
export const delClassify = (data = {}) => httpDelete({ url: '/Classify', data })
export const upDateClassify = (data = {}) => httpPut({ url: '/Classify', data })

//上传
export const handleUpload = (data = {}) => httpPost({ url: '/upload/qiniu_upload', data })

//权限管理
export const addPermission = (data = {}) => httpPost({ url: '/permission/add', data })
export const getPermissionList = (data = {}) => httpPost({ url: '/permission', data })

export const getPidByType = (params = {}) => httpGet({ url: '/permission/getpidbytype', params })

//角色管理
export const addRoles = (data = {}) => httpPost({ url: '/roles/add', data })
export const getRolesList = (data = {}) => httpPost({ url: '/roles', data })

export const getRoleById = (data = {}) => httpPost({ url: '/roles/info', data })
