export interface User {
  _id: string
  name: string
  avatar: string
  lastActiveAt: string
}

interface Reply {
  _id: string
  user: User
  content: string
  createdAt: string
  to?: User
}

export interface Message {
  _id: string
  thumbsUpUsers: string[]
  replies: Reply[][]
  user: User
  content: string
  createdAt: string
  repliesLength: number
}
