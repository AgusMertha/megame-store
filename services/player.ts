import axios from "axios"
const ROOT_API = process.env.NEXT_PUBLIC_API
  const API_VERSION = "api/v1"
export const getFeaturedGame = async () => {
  const URL = "players/landing-page"

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
  const axiosResponse = response.data

  return axiosResponse.data
}

export const getVoucherDetail = async (id: string) => {
  const URL = `players/detail/${id}`

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
  const axiosResponse = response.data

  return axiosResponse.data
}

export const getGameCategories = async () => {
  const URL = `players/category`

  const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`)
  const axiosResponse = response.data

  return axiosResponse.data
}