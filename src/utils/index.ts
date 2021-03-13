import axiosStatic, { AxiosError } from 'axios'
import ElNotification from 'element-plus/lib/el-notification'

type NotifyMethods = 'success' | 'warning' | 'info' | 'error'
type Notify = typeof ElNotification &
  {
    [method in NotifyMethods]: (message: string) => void
  }

export const axios = axiosStatic.create({
  baseURL: import.meta.env.DEV ? 'https://localhost:3000' : 'https://api.apasser.xyz',
  withCredentials: true,
})

export const notify = ElNotification as Notify
const methods: NotifyMethods[] = ['success', 'warning', 'info', 'error']
methods.forEach((type) => {
  notify[type] = (message: string) => {
    ElNotification({
      type,
      message,
      position: 'bottom-right',
      duration: 1000,
    })
  }
})

export function error(err: AxiosError): void {
  if (err.isAxiosError) {
    if (err.response) {
      notify.error(err.response.data)
    } else if (err.code === 'ECONNABORTED') {
      notify.error('连接超时')
    } else if (err.message === 'Network Error') {
      notify.error('网络错误')
    } else {
      console.error(err)
    }
  } else {
    console.error(err)
  }
}
