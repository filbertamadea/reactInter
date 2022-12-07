import axios from 'axios'
const url = process.env.REACT_APP_TESTING

export const axiosGet = async (path, params) => {
  try {
    const { data } = await axios.get(`${url}/${path}`, { params: params })
    return data
  }
  catch (e) {
    throw e
  }
}

export const axiosPost = async (path, body, params) => {
  try {
    const { data } = await axios.post(`${url}/${path}`, body, { params: params })
    return data
  }
  catch (e) {
    throw e
  }
}


export const axiosPut = async (path, body, params) => {
  try {
    const { data } = await axios.put(`${url}/${path}`, body, { params: params })
    return data
  }
  catch (e) {
    throw e
  }
}

export const axiosDelete = async (path, params, body) => {
  try {
    const { data } = await axios.delete(`${url}/${path}`, { params: params, data: body })
    return data
  }
  catch (e) {
    throw e
  }
}
