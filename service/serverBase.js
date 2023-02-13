import axios from 'axios'
const ServerBaseUrl = process.env.BASE_URL

const ServerProvider = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: `${ServerBaseUrl}/api/`,
})
ServerProvider.interceptors.request.use( (request) => {
  return request;
});

export { ServerProvider, ServerBaseUrl }
