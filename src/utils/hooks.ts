import { ref } from 'vue'

export const UseGetList = ({ api, params = {} }) => {
  const list = ref()

  const getData = async () => {
    const res = await api(params)
    if (res.code === 200) {
      list.value = res.data
      ElMessage({
        message: '数据获取成功'
      })
    } else {
      ElMessage({
        message: '数据获取失败'
      })
    }
  }
  return { list, getData }
}
export const usePostForm = ({ api, form }) => {}
