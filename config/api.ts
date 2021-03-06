import axios, { AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean,
  serverToken?: string
}

export const callAPI = async ({url, method, data, token, serverToken}: CallAPIProps) => {
  let headers = {}

  if(serverToken){
    headers = {
      Authorization: `Bearer ${serverToken}`
    }
  }else if(token){
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

  const length = Object.keys(response.data).length
  const res = {
    error: false,
    message: 'success',
    data: length > 1 ? response.data : response.data.data
  }
  return res
}