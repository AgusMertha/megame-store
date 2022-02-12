import axios, { AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean
}

export const callAPI = async ({url, method, data, token}: CallAPIProps) => {
  let headers = {}
  if(token){
    const tokenCookie = Cookies.get('tkn__')
    if(tokenCookie){
      const jwtToken = atob(tokenCookie)
      headers = {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  }
  const response = await axios({
    url: url,
    method:method,
    data: data,
    headers: headers
  }).catch(err => err.response)

  if(response.status > 300){
    const res = {
      error: true,
      message: response.data.message,
      data: null
    }

    return res
  }

  const res = {
    error: false,
    message: 'success',
    data: response.data.count ? response.data : response.data.data
  }
  return res
}