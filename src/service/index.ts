import { BASE_URL, TIME_OUT } from './config'
import AniRequest from './request'

const aniRequest = new AniRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default aniRequest
