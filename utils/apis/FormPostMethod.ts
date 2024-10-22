import axios from 'axios'
import type { FormModel } from '../models/FormModel'

const apiAccessToken = import.meta.env.VITE_API

const api = 'localhost:3000'

export const formPost = (data: FormModel) => {
  return axios
    .post(`${api}/drpuerta/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiAccessToken}`
      }
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
