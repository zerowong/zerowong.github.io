import axios from 'axios'

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.apasser.xyz',
  timeout: 2000,
  withCredentials: true,
  validateStatus(status) {
    return status >= 200 && status < 500
  },
})
