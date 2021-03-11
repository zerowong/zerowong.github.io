import type { INotification } from 'element-plus/lib/el-notification/src/notification.type'

export declare interface Notify extends INotification {
  success: (message: string) => void
  warning: (message: string) => void
  info: (message: string) => void
  error: (message: string) => void
}
