import axios from 'axios'
const ServerBaseUrl = process.env.BASE_URL

const ServerProvider = axios.create({
  baseURL: `${ServerBaseUrl}/api/`,
  timeout: 10000,
})

export { ServerProvider, ServerBaseUrl }
