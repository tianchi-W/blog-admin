// 泛型函数，接口，类
export interface ApiResponse<T> {
  code: number
  //基本上响应数据里的message都是string类型
  message: string
  //但是data的类型是变化的，所以我们不能写死，需要传给axios
  data: T
}
