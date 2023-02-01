import axios from 'axios'
const BaseUrl = process.env.BASE_URL;
const Provider = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: `${BaseUrl}/api/`,
  timeout: 100000,
})

Provider.interceptors.request.use( (request) => {
  request.headers.common.Authorization =  `Bearer ${window.$nuxt.$store.$cookies.get('token')}`;
  return request;
});

Provider.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response.status === 401) {
      window.$nuxt.$toast.open({
        message: 'Ошибка авторизации',
        type: 'error',
      })
      window.$nuxt.$router.push('/auth/login')
      throw err
    }
    throw err
  }
)
export { Provider, BaseUrl }
